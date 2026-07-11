"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { signOut } from "@/lib/actions/auth.action";
import { toast } from "sonner";

const LogoutButton = () => {
  const router = useRouter();

  const handleLogOut = async () => {
    try {
      await signOut();
      toast.success("Logged out successfully");
      router.push("/sign-in");
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message);
        toast.error(error.message || "Something went wrong");
      } else {
        console.error(error);
        toast.error("Something went wrong");
      }
    }
  };

  return (
    <Button
      variant="destructive"
      className="bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-md transition-colors duration-300 cursor-pointer"
      onClick={handleLogOut}
    >
      Log Out
    </Button>
  );
};

export default LogoutButton;
