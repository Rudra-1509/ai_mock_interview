"use server";

import { generateObject } from "ai";
import { groq } from "@ai-sdk/groq";

import { db } from "@/firebase/admin";
import { feedbackSchema } from "@/constants";

export async function createFeedback(params: CreateFeedbackParams) {
  const { interviewId, userId, transcript, feedbackId } = params;
  if(!userId) return null;
  try {
    const formattedTranscript = transcript
      .map(
        (sentence: { role: string; content: string }) =>
          `- ${sentence.role}: ${sentence.content}\n`
      )
      .join("");

    const { object } = await generateObject({
  model: groq("openai/gpt-oss-20b"),
  schema: feedbackSchema,
prompt: `
You are an experienced software engineering interviewer evaluating a candidate based on the interview transcript below.

Transcript:
${formattedTranscript}

Evaluate the candidate fairly, objectively, and constructively using the standards of a typical software engineering interview.

Focus on the candidate's overall performance rather than isolated mistakes. Reward demonstrated understanding, logical reasoning, and clear communication. Do not excessively penalize minor mistakes, hesitation, imperfect wording, or small gaps in knowledge.

If the transcript appears to contain speech recognition or transcription errors, evaluate the candidate's intended meaning rather than the exact words.

Use the following scoring guidelines:

- 90-100: Exceptional performance. Demonstrates excellent technical knowledge, communication, and reasoning. Strong hire.
- 80-89: Strong performance with only minor weaknesses. Would likely pass most technical interviews.
- 70-79: Good performance with some noticeable gaps but demonstrates solid understanding and problem-solving ability.
- 60-69: Average performance. Shows potential but has several areas requiring improvement.
- 40-59: Weak performance with significant knowledge or communication gaps.
- 0-39: Poor performance with fundamental misunderstandings or inability to demonstrate required skills.

When scoring:
- Consider the interview as a whole.
- Balance strengths and weaknesses.
- Deduct points only for meaningful mistakes or missing understanding.
- Reward correct reasoning even if the final answer is not perfect.
- Explain every deduction clearly.
- Keep feedback professional, specific, and actionable.

Return feedback ONLY for the following five categories, in this EXACT order and with these EXACT names:

1. Communication Skills
2. Technical Knowledge
3. Problem Solving
4. Cultural Fit
5. Confidence and Clarity

For each category:
- Give a score from 0 to 100.
- Write a detailed comment explaining the score.

Also provide:
- An overall totalScore (0-100).
- 3-5 strengths.
- 3-5 areasForImprovement.
- A finalAssessment summarizing the candidate's overall interview performance, including whether they would likely pass a typical software engineering interview.

IMPORTANT:
- Do NOT rename any category.
- Do NOT use "&".
- Do NOT use "Problem-Solving".
- Do NOT use "Cultural & Role Fit".
- Do NOT use "Confidence & Clarity".
- Use the category names exactly as listed above because the response must match the required JSON schema.
`,
system: `
You are a professional AI software engineering interviewer.

Your task is to produce fair, balanced, and constructive interview feedback that closely resembles how experienced human interviewers evaluate candidates.

Reward demonstrated understanding, logical reasoning, and correct explanations. Do not be excessively harsh for minor mistakes, hesitation, or imperfect wording. If the candidate answers most questions correctly, the scores should reflect a strong overall performance.

The generated object MUST strictly follow the provided JSON schema. Every category name must exactly match the schema.
`
});
    if (!object) {
  console.error("LLM output is null or malformed.");
  return { success: false };
}


    const feedback = {
      interviewId: interviewId,
      userId: userId,
      totalScore: object.totalScore,
      categoryScores: object.categoryScores,
      strengths: object.strengths,
      areasForImprovement: object.areasForImprovement,
      finalAssessment: object.finalAssessment,
      createdAt: new Date().toISOString(),
    };

    let feedbackRef;

    if (feedbackId) {
      feedbackRef = db.collection("feedback").doc(feedbackId);
    } else {
      feedbackRef = db.collection("feedback").doc();
    }

    await feedbackRef.set(feedback);

    return { success: true, feedbackId: feedbackRef.id };
  } catch (error) {
    console.error("Error saving feedback:", error);
    return { success: false };
  }
}

export async function getInterviewById(id: string): Promise<Interview | null> {
  if(!id) return null;
  const interview = await db.collection("interviews").doc(id).get();

  return interview.data() as Interview | null;
}

export async function getFeedbackByInterviewId(
  params: GetFeedbackByInterviewIdParams
): Promise<Feedback | null> {
  const { interviewId, userId } = params;
  if(!userId) return null;

  const querySnapshot = await db
    .collection("feedback")
    .where("interviewId", "==", interviewId)
    .where("userId", "==", userId)
    .limit(1)
    .get();

  if (querySnapshot.empty) return null;

  const feedbackDoc = querySnapshot.docs[0];
  return { id: feedbackDoc.id, ...feedbackDoc.data() } as Feedback;
}

export async function getLatestInterviews(
  params: GetLatestInterviewsParams
): Promise<Interview[] | null> {
  const { userId, limit = 20 } = params;
  const interviews = await db
    .collection("interviews")
    .where("finalized", "==", true)
    .where("userId", "!=", userId)
    .orderBy("userId") // Required for Firestore to support `!=`
    .orderBy("createdAt", "desc")
    .limit(limit)
    .get();

  return interviews.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Interview[];
}


export async function getInterviewsByUserId(
  userId: string
): Promise<Interview[] | null> {
  if(!userId) return null;
  const interviews = await db
    .collection("interviews")
    .where("userId", "==", userId)
    .orderBy("createdAt", "desc")
    .get();

  return interviews.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Interview[];
}