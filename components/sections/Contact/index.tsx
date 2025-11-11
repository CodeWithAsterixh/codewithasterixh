"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "d/components/ui/input";
import { Textarea } from "d/components/ui/textarea";
import { Button } from "d/components/ui/button";
import { Toaster, toast } from "sonner";
import { useMail } from "d/lib/hooks/useMail";

const schema = z.object({
  name: z.string().min(2, "Enter your name"),
  email: z.string().email("Enter a valid email"),
  message: z.string().min(10, "Enter at least 10 characters"),
});

export default function Contact() {
  const { sendMail, status } = useMail();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = async (data: any) => {
    const res = await sendMail(data);
    if (res.ok) {
      toast.success("Message sent successfully");
      reset();
    } else {
      toast.error("Failed to send message");
    }
  };

  return (
    <section id="contact" className="relative w-full bg-base-100 py-20 overflow-hidden">

      <Toaster />
      <main className="section_container px-4 flex flex-col gap-12 items-center">
        <div className="text-center">
          <p className="text-primary text-sm font-medium">Let’s Talk</p>
          <h2 className="text-3xl font-bold text-base-content">Contact Me</h2>
          <p className="text-accent-content text-sm mt-2 max-w-lg mx-auto">
            Send me a message, and I’ll respond within 24 hours.
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-lg flex flex-col gap-5 bg-base-200 border border-base-300 rounded-2xl p-6 shadow-xl backdrop-blur-sm"
        >
          <div>
            <Input
              placeholder="Your Name"
              {...register("name")}
              disabled={status === "loading"}
            />
            {errors.name && (
              <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <Input
              placeholder="Your Email"
              {...register("email")}
              disabled={status === "loading"}
            />
            {errors.email && (
              <p className="text-xs text-red-500 mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <Textarea
              rows={5}
              placeholder="Your Message"
              {...register("message")}
              disabled={status === "loading"}
            />
            {errors.message && (
              <p className="text-xs text-red-500 mt-1">
                {errors.message.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            disabled={status === "loading"}
            className="w-full bg-primary text-base-300 hover:bg-primary/90 transition-all"
          >
            {status === "loading" ? "Sending..." : "Send Message"}
          </Button>
        </form>
      </main>
    </section>
  );
}
