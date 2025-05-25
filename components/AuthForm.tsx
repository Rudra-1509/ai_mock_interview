"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import FormField from "./FormField";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const authFormSchema = (type: FormType) => {
  return z.object({
    name: type === "sign-up" ? z.string().min(5) : z.string().optional(),
    email: z.string().email(),
    password: z.string().min(5),
  });
};

const AuthForm = ({ type }: { type: FormType }) => {
  const [show, setShow] = useState(false);
  const router = useRouter();
  const formSchema = authFormSchema(type);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      if (type === "sign-up") {
        toast.success("Account Created Successfully. Plaese Sign-in.");
        router.push("/sign-in");
      } else {
        toast.success("Account Created Successfully. Plaese Sign-in.");
        router.push("/");
      }
    } catch (error) {
      console.log(error);
      toast.error(`There was an error: ${error}`);
    }
  }

  const isSignIn = type === "sign-in";
  return (
    <div className="card-border lg:min-w-[566px]">
      <div className="flex flex-col gap-6 card py-14 px-10">
        <div className="felx flex-row gap-2 justify-center">
          <Image src="/logo.svg" alt="logo" height={32} width={38} />
          <h2 className="text-primary-100">PrepWise</h2>
        </div>
        <h3>Practice job interview with AI</h3>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-6 mt-4 form"
          >
            {!isSignIn && (
              <FormField
                control={form.control}
                label="name"
                name="name"
                placeholder="Your Name"
              />
            )}
            <FormField
              control={form.control}
              label="Email"
              name="email"
              placeholder="Your Email Address"
              type="email"
            />
            <div className="relative">
              <FormField
                control={form.control}
                label="Password"
                name="password"
                placeholder="Enter Your Password"
                type={show ? "text" : "password"}
              />
              <Button
                type="button"
                onClick={() => setShow(!show)}
                variant="ghost"
                size="icon"
                className="absolute right-1 top-1/2 -translate-y-1/6 -translate-x-1/5"
              >
                {show ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </Button>
            </div>
            <Button className="btn" type="submit">
              {isSignIn ? "Sign in" : "Create an account"}
            </Button>
          </form>
        </Form>

        <p className="text-center">
          {isSignIn ? "No Account yet?" : "Have an Account already?"}
          <Link
            href={!isSignIn ? "/sign-in" : "sign-up"}
            className="font-bold text-user-rimary ml-1"
          >
            {!isSignIn ? "Sign-in" : "Sign-up"}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AuthForm;
