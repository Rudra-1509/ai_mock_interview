import Agent from "@/components/Agent";
import InterviewForm from "@/components/InterviewForm";
import { getCurrentUser } from "@/lib/actions/auth.action";

const Page = async () => {
  const user = await getCurrentUser();

  return (
    <>
      {/* <Agent
        userName={user?.name ?? ""}
        userId={user?.id}
        //profileImage={user?.profileURL}
        type="generate"
      /> */}

      <InterviewForm />
    </>
  );
};

export default Page;