"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { toast } from "sonner";
import FormField from "./FormField";
import { useRouter } from "next/navigation";

const interviewFormSchema = () => {
  return z.object({
    type: z.enum(["Technical", "Behaviourial", "Mixed"]),
    role: z.string(),
    level: z.enum(["Entry", "Mid", "Senior"]),
    techstack: z.string(),
    amount: z.coerce.number().min(1, {
      message: "Number of questions must be at least 1",
    }),
  });
};

const InterviewForm = () => {
  const router = useRouter();
  const formSchema = interviewFormSchema();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: "Technical",
      role: "",
      level: "Entry",
      techstack: "",
      amount: 1,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const { type, role, level, techstack, amount } = values;
      const techstackArray = techstack
        .split(",")
        .map((tech) => tech.trim())
        .filter(Boolean);

      const response = await fetch("/api/vapi/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type,
          role,
          level,
          techstack: techstackArray,
          amount,
        }),
      });

      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.error || "Failed to generate interview");
      }

      toast.success("Interview started successfully!");
      router.push("/");
    } catch (error) {
      console.error(error);
      toast.error(
        `There was an error: ${
          error instanceof Error ? error.message : JSON.stringify(error)
        }`
      );
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <h3>Interview generation</h3>
      <div className="card-border lg:min-w-[566px]">
        <div className="flex flex-col gap-6 card py-14 px-10">
          <div className="flex flex-col items-center text-center gap-1">
            <h3>Starting Your Interview</h3>
            <h5 className="text-primary-100">
              Customize your mock interview to suit your needs.
            </h5>
          </div>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full space-y-6 mt-4 form"
            >
              <FormField
                control={form.control}
                label="What type of interview would you like to practice?"
                name="type"
                type="select"
                options={["Technical", "Behaviourial", "Mixed"]}
              />

              <FormField
                control={form.control}
                label="What role are you focusing on? Eg. Front End, Full Stack"
                name="role"
                placeholder="Select your role"
                type="text"
              />

              <FormField
                control={form.control}
                label="What is your experience level?"
                name="level"
                type="select"
                options={["Entry", "Mid", "Senior"]}
              />

              <FormField
                control={form.control}
                label="Which tech stack would you like to focus on?"
                name="techstack"
                placeholder="Select your preferred tech stack"
                type="text"
              />

              <FormField
                control={form.control}
                label="How many questions would you want to have for the interview?"
                name="amount"
                type="number"
                min={1}
              />

              <Button
                className="btn"
                type="submit"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting
                  ? "Generating..."
                  : "Generate Interview"}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default InterviewForm;