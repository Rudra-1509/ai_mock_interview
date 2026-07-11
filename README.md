# 🎤 AI Mock Interviewer

An AI-powered, voice-based mock interview platform that helps users practice interviews in a realistic browser-based environment.

🌐 Live app: [ai-mock-interview.vercel.app](https://ai-mock-interview-orcin.vercel.app/)

---

## 🚀 What this project does

This app lets a user:
- sign in or create an account with Firebase
- generate a customized mock interview
- start a voice-based interview experience with Vapi
- store interview data in Firestore
- review interview sessions and related information through the app UI

It is built with Next.js and uses AI services to generate interview questions and assist the interview flow.

---

## 🧰 Tech stack

### Frontend
- Next.js 15 with the App Router
- React 19
- Tailwind CSS
- React Hook Form + Zod for forms
- Sonner for toast notifications

### Backend / services
- Firebase Authentication
- Firebase Admin SDK + Firestore
- Vapi for voice/interview orchestration
- Google Gemini via the AI SDK for interview content generation

### Deployment
- Vercel

---

## 🏗️ Architecture overview

The app follows a simple Next.js full-stack structure:

- App routes live in the [app](app) folder
  - public pages such as sign-in, sign-up, interview list, and interview detail views
  - API routes such as [app/api/vapi/generate/route.ts](app/api/vapi/generate/route.ts)
- Reusable UI lives in [components](components)
- Server-side auth and Firestore logic lives in [lib/actions](lib/actions)
- Firebase setup is split between [firebase/client.ts](firebase/client.ts) and [firebase/admin.ts](firebase/admin.ts)
- Shared utilities and helpers live in [lib](lib)

The main flow is:
1. User authenticates through Firebase.
2. The interview form collects preferences such as role, level, tech stack, and question count.
3. The app calls the generation endpoint, which uses the AI service to create interview questions.
4. Those questions are stored and then used in the interview experience.

---

## ⚙️ Prerequisites

Make sure you have:
- Node.js 18+ or 20+
- npm or pnpm
- a Firebase project
- a Vapi account/token
- a Google AI API key

---

## 🛠️ Local setup

1. Clone the repository
   ```bash
   git clone <your-repo-url>
   cd interviewprep
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Create a local environment file
   ```bash
   cp .env.example .env.local
   ```
   If you do not have an example file yet, create [.env.local](.env.local) manually.

4. Add the required environment variables
   ```env
   NEXT_PUBLIC_VAPI_WEB_TOKEN=your_vapi_web_token
   GROQ_GENERATIVE_AI_API_KEY=your_google_ai_key
   NEXT_PUBLIC_BASE_URL=http://localhost:3000
   SERVER_URL=http://localhost:3000

   FIREBASE_PROJECT_ID=your_project_id
   FIREBASE_PRIVATE_KEY="your_private_key"
   FIREBASE_CLIENT_EMAIL=your_service_account_email

   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id
   ```

5. Run the development server
   ```bash
   npm run dev
   ```

6. Open the app in your browser
   ```text
   http://localhost:3000
   ```

---

## 📁 Project structure

```text
app/               # App Router pages and API routes
components/       # Reusable React components
constants/        # Shared constants
firebase/         # Firebase client/admin initialization
lib/              # Utilities, auth actions, API helpers
public/           # Static assets
styles/           # Global styles (if added later)
```

---

## ▶️ Available scripts

```bash
npm run dev     # start local development server
npm run build   # create a production build
npm run start   # run the production build locally
```

---

## 🔐 Authentication and data flow

- Users sign in through Firebase Authentication.
- Session cookies are created server-side in the auth action layer.
- Interview generation is protected by server-side checks before data is saved.
- Firestore is used to persist interview-related records.

---

## 🧪 Troubleshooting

If something does not work locally, check the following:
- your environment variables are present in [.env.local](.env.local)
- your Firebase project has Authentication and Firestore enabled
- your Vapi token is valid
- your Google AI key is valid and has permission to use the selected model
- the app is running from the correct port and the base URL matches your local setup

---

## 🤝 Contributing

If you want to improve the project:
1. create a feature branch
2. make your changes
3. test locally
4. open a pull request with a clear summary

---

## ✨ Future ideas

- richer interview analytics and score history
- improved feedback summaries
- exportable reports
- better voice session controls
- multi-user interview dashboards

