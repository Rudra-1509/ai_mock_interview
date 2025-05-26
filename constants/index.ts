import { CreateAssistantDTO,  CreateWorkflowDTO  } from "@vapi-ai/web/dist/api";
import { z } from "zod";

export const mappings = {
  "react.js": "react",
  reactjs: "react",
  react: "react",
  "next.js": "nextjs",
  nextjs: "nextjs",
  next: "nextjs",
  "vue.js": "vuejs",
  vuejs: "vuejs",
  vue: "vuejs",
  "express.js": "express",
  expressjs: "express",
  express: "express",
  "node.js": "nodejs",
  nodejs: "nodejs",
  node: "nodejs",
  mongodb: "mongodb",
  mongo: "mongodb",
  mongoose: "mongoose",
  mysql: "mysql",
  postgresql: "postgresql",
  sqlite: "sqlite",
  firebase: "firebase",
  docker: "docker",
  kubernetes: "kubernetes",
  aws: "aws",
  azure: "azure",
  gcp: "gcp",
  digitalocean: "digitalocean",
  heroku: "heroku",
  photoshop: "photoshop",
  "adobe photoshop": "photoshop",
  html5: "html5",
  html: "html5",
  css3: "css3",
  css: "css3",
  sass: "sass",
  scss: "sass",
  less: "less",
  tailwindcss: "tailwindcss",
  tailwind: "tailwindcss",
  bootstrap: "bootstrap",
  jquery: "jquery",
  typescript: "typescript",
  ts: "typescript",
  javascript: "javascript",
  js: "javascript",
  "angular.js": "angular",
  angularjs: "angular",
  angular: "angular",
  "ember.js": "ember",
  emberjs: "ember",
  ember: "ember",
  "backbone.js": "backbone",
  backbonejs: "backbone",
  backbone: "backbone",
  nestjs: "nestjs",
  graphql: "graphql",
  "graph ql": "graphql",
  apollo: "apollo",
  webpack: "webpack",
  babel: "babel",
  "rollup.js": "rollup",
  rollupjs: "rollup",
  rollup: "rollup",
  "parcel.js": "parcel",
  parceljs: "parcel",
  npm: "npm",
  yarn: "yarn",
  git: "git",
  github: "github",
  gitlab: "gitlab",
  bitbucket: "bitbucket",
  figma: "figma",
  prisma: "prisma",
  redux: "redux",
  flux: "flux",
  redis: "redis",
  selenium: "selenium",
  cypress: "cypress",
  jest: "jest",
  mocha: "mocha",
  chai: "chai",
  karma: "karma",
  vuex: "vuex",
  "nuxt.js": "nuxt",
  nuxtjs: "nuxt",
  nuxt: "nuxt",
  strapi: "strapi",
  wordpress: "wordpress",
  contentful: "contentful",
  netlify: "netlify",
  vercel: "vercel",
  "aws amplify": "amplify",
};

export const interviewer: CreateAssistantDTO = {
  name: "Interviewer",
  firstMessage:
    "Hello! Thank you for taking the time to speak with me today. I'm excited to learn more about you and your experience.",
  transcriber: {
    provider: "deepgram",
    model: "nova-2",
    language: "en",
  },
  voice: {
    provider: "11labs",
    voiceId: "sarah",
    stability: 0.4,
    similarityBoost: 0.8,
    speed: 0.9,
    style: 0.5,
    useSpeakerBoost: true,
  },
  model: {
    provider: "openai",
    model: "gpt-4",
    messages: [
      {
        role: "system",
        content: `You are a professional job interviewer conducting a real-time voice interview with a candidate. Your goal is to assess their qualifications, motivation, and fit for the role.

Interview Guidelines:
Follow the structured question flow:
{{questions}}

Engage naturally & react appropriately:
Listen actively to responses and acknowledge them before moving forward.
Ask brief follow-up questions if a response is vague or requires more detail.
Keep the conversation flowing smoothly while maintaining control.
Be professional, yet warm and welcoming:

Use official yet friendly language.
Keep responses concise and to the point (like in a real voice interview).
Avoid robotic phrasing—sound natural and conversational.
Answer the candidate’s questions professionally:

If asked about the role, company, or expectations, provide a clear and relevant answer.
If unsure, redirect the candidate to HR for more details.

Conclude the interview properly:
Thank the candidate for their time.
Inform them that the company will reach out soon with feedback.
End the conversation on a polite and positive note.


- Be sure to be professional and polite.
- Keep all your responses short and simple. Use official language, but be kind and welcoming.
- This is a voice conversation, so keep your responses short, like in a real conversation. Don't ramble for too long.`,
      },
    ],
  },
};

export const feedbackSchema = z.object({
  totalScore: z.number(),
  categoryScores: z.tuple([
    z.object({
      name: z.literal("Communication Skills"),
      score: z.number(),
      comment: z.string(),
    }),
    z.object({
      name: z.literal("Technical Knowledge"),
      score: z.number(),
      comment: z.string(),
    }),
    z.object({
      name: z.literal("Problem Solving"),
      score: z.number(),
      comment: z.string(),
    }),
    z.object({
      name: z.literal("Cultural Fit"),
      score: z.number(),
      comment: z.string(),
    }),
    z.object({
      name: z.literal("Confidence and Clarity"),
      score: z.number(),
      comment: z.string(),
    }),
  ]),
  strengths: z.array(z.string()),
  areasForImprovement: z.array(z.string()),
  finalAssessment: z.string(),
});

export const interviewCovers = [
  "/adobe.png",
  "/amazon.png",
  "/facebook.png",
  "/hostinger.png",
  "/pinterest.png",
  "/quora.png",
  "/reddit.png",
  "/skype.png",
  "/spotify.png",
  "/telegram.png",
  "/tiktok.png",
  "/yahoo.png",
];

export const dummyInterviews: Interview[] = [
  {
    id: "1",
    userId: "user1",
    role: "Frontend Developer",
    type: "Technical",
    techstack: ["React", "TypeScript", "Next.js", "Tailwind CSS"],
    level: "Junior",
    questions: ["What is React?"],
    finalized: false,
    createdAt: "2024-03-15T10:00:00Z",
  },
  {
    id: "2",
    userId: "user1",
    role: "Full Stack Developer",
    type: "Mixed",
    techstack: ["Node.js", "Express", "MongoDB", "React"],
    level: "Senior",
    questions: ["What is Node.js?"],
    finalized: false,
    createdAt: "2024-03-14T15:30:00Z",
  },
];


export const generator: CreateWorkflowDTO = {
  "name": "ivprep",
  "nodes": [
    {
      "name": "start",
      "type": "conversation",
      "isStart": true,
      "metadata": {
        "position": { "x": 215.39484010877993, "y": -109.41830203855014 }
      },
      "prompt": "Greet the user and help them create a new AI Interviewer.",
      "model": {
        "model": "gpt-4o",
        "provider": "openai",
        "maxTokens": 1000,
        "temperature": 0.7
      },
      "voice": {
        "model": "aura-2",
        "voiceId": "thalia",
        "provider": "deepgram"
      },
      "variableExtractionPlan": {
        "output": [
          {
            "enum": [],
            "type": "string",
            "title": "role",
            "description": "What role would you like to train for?"
          },
          {
            "enum": ["technical", "behavioral", "mixed"],
            "type": "string",
            "title": "type",
            "description": "Aiming for a technical or a behavioral interview?"
          },
          {
            "enum": ["fresher", "mid", "senior"],
            "type": "string",
            "title": "level",
            "description": "The job experience level"
          },
          {
            "enum": [],
            "type": "string",
            "title": "techstack",
            "description": "a list of technologies to cover during the job interview"
          },
          {
            "enum": [],
            "type": "integer",
            "title": "amount",
            "description": "How many questions would you like me to prepare for you?"
          }
        ]
      },

    },
    {
      "name": "conversation_1748286483210",
      "type": "conversation",
      "metadata": {
        "position": { "x": 395.488002967665, "y": 794.7800424907334 }
      },
      "prompt": "Tell the user that the interview has been generated, and thank the user for the call.",
      "model": {
        "model": "gpt-4o",
        "provider": "openai",
        "maxTokens": 1000,
        "temperature": 0.7
      },
    },
    {
      "name": "hangup_1748286559915",
      "type": "conversation",
      "metadata": {
        "position": { "x": 490.8940669453756, "y": 1026.0466906133247 }
      },
    },
    {
      "name": "node_1748288031493",
      "type": "conversation",
      "metadata": {
        "position": { "x": 257.8728904168921, "y": 285.6448564565645 }
      },
      "prompt": "Say that the Interview will be generated shortly.",
      "model": {
        "model": "gpt-4o",
        "provider": "openai",
        "maxTokens": 1000,
        "temperature": 0.7
      },
    },
    {
      "name": "node_1748288087132",
      "type": "tool",
      "metadata": {
        "position": { "x": 437.1405198759046, "y": 512.2605212898214 }
      },
      "tool": {
        "url": "{{baseUrl}}/api/vapi/generate",
        "body": {
          "type": "object",
          "required": ["level", "role", "type", "techstack", "amount", "userid"],
          "properties": {
            "role": { "type": "string", "value": "{{role}}" },
            "type": { "type": "string", "value": "{{type}}" },
            "level": { "type": "string", "value": "{{level}}" },
            "amount": { "type": "integer", "value": "{{amount}}" },
            "userid": { "type": "string", "value": "{{userid}}" },
            "techstack": { "type": "string", "value": "{{techstack}}" }
          }
        },
        "type": "apiRequest",
        "method": "POST",
        "function": {
          "name": "untitled_tool",
          "parameters": {
            "type": "object",
            "required": [],
            "properties": {}
          }
        }
      },
    }
  ],
  "edges": [
    {
      "from": "conversation_1748286483210",
      "to": "hangup_1748286559915",
      "condition": {
        "type": "ai",
        "prompt": ""
      }
    },
    {
      "from": "start",
      "to": "node_1748288031493",
      "condition": {
        "type": "ai",
        "prompt": "If user provided all the required variables"
      }
    },
    {
      "from": "node_1748288031493",
      "to": "node_1748288087132",
      "condition": {
        "type": "ai",
        "prompt": ""
      }
    },
    {
      "from": "node_1748288087132",
      "to": "conversation_1748286483210",
      "condition": {
        "type": "ai",
        "prompt": ""
      }
    }
  ],
 "model": {
  "model": "gpt-4o",
  "provider": "openai",
  "temperature": 0.7,
  "maxTokens": 1000
},
};
