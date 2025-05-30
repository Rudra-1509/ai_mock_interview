import { generateText } from "ai";
import { google } from "@ai-sdk/google";
import { getCurrentUser } from "@/lib/actions/auth.action";
import { db } from "@/firebase/admin";
import { getRandomInterviewCover } from "@/lib/utils";
import { NextResponse } from "next/server";


export async function POST(request: Request) {
  const { type, role, level, techstack, amount } = await request.json();
  const user = await getCurrentUser();

  if (!user) {
    return NextResponse.json(
      { success: false, error: "Unauthorized: User not found" },
      { status: 401 }
    );
  }
  try {
    const { text: questions } = await generateText({
      model: google("gemini-2.0-flash-001"),
      prompt: `Prepare questions for a job interview.
        The job role is ${role}.
        The job experience level is ${level}.
        The tech stack used in the job is: ${techstack}.
        The focus between behavioural and technical questions should lean towards: ${type}.
        The amount of questions required is: ${amount}.
        Please return only the questions, without any additional text.
        The questions are going to be read by a voice assistant so do not use "/" or "*" or any other special characters which might break the voice assistant.
        Return the questions formatted like this:
        ["Question 1", "Question 2", "Question 3"]
        
        Thank you! <3
    `,
    });
    let parsedQuestions;

    try {
      parsedQuestions = JSON.parse(questions);
      if (!Array.isArray(parsedQuestions)) {
        throw new Error("Questions is not a valid array");
      }
    } catch (error) {
      console.error("Failed to parse questions from LLM:", questions);
      return NextResponse.json(
        {
          success: false,
          error: "Failed to parse questions. Please try again.",
        },
        { status: 500 }
      );
    }

    const interview = {
      role: role,
      type: type,
      level: level,
      techstack,
      questions: parsedQuestions,
      userId: user.id,
      finalized: true,
      coverImage: getRandomInterviewCover(),
      createdAt: new Date().toISOString(),
    };

    await db.collection("interviews").add(interview);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ success: true, data: "Thank you!" }, { status: 200 });
}
