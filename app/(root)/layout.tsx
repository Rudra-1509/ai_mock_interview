import LogoutButton from "@/components/LogOutButton";
import { isAuthenticated } from "@/lib/actions/auth.action";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

const RootLayout = async ({ children }: { children: ReactNode }) => {
  const isUserAuthenticated = await isAuthenticated();
  if (!isUserAuthenticated) redirect("/sign-in");

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <nav className="flex justify-between items-center px-6 py-4 border-b border-gray-200 shadow-sm">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.svg" alt="Logo" height={32} width={38} />
          <h2 className="text-primary-100 font-semibold text-xl">PrepWise</h2>
        </Link>
        <LogoutButton />
      </nav>

      {/* Main content */}
      <main className="flex-1 flex items-center justify-center px-4">
        {children}
      </main>
    </div>
  );
};

export default RootLayout;
