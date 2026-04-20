"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card } from "@/components/ui/atoms/Card/Card";
import { Text } from "@/components/ui/atoms/Text/Text";
import { Button } from "@/components/ui/atoms/Button/Button";
import { StarFourIcon, SpinnerIcon } from "@phosphor-icons/react/dist/ssr";
import uiData from "@/data/ui.json";
import { contactFormSchema, ContactFormData } from "@/features/contact/schema/contact";
import { toast } from "sonner";
import clsx from "clsx";

interface ContactFormProps {
  titleAs?: "h1" | "h2";
}

export const ContactForm: React.FC<ContactFormProps> = ({ titleAs = "h2" }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    const loadingToast = toast.loading("Sending your message...");

    try {
      const response = await fetch("/api/mail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to send message");
      }

      toast.success(result.message || "Message sent successfully!", {
        id: loadingToast,
      });
      reset();
    } catch (error) {
      console.error("Submission error:", error);
      toast.error(
        error instanceof Error ? error.message : "Something went wrong. Please try again.",
        { id: loadingToast }
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClasses = (hasError: boolean) => clsx(
    "w-full bg-white/5 rounded-lg px-6 py-4 text-white placeholder-white/40 focus:outline-none focus:ring-1 border transition-all",
    hasError 
      ? "border-red-500/50 focus:ring-red-500/50" 
      : "border-white/10 focus:ring-white/20"
  );

  return (
    <Card className="p-8 md:p-12 relative overflow-hidden">
        <div className="absolute top-8 right-8 text-white/20">
            <StarFourIcon size={48} weight="light" />
        </div>

        <div className="mb-8 flex flex-col gap-4">
            <Text variant="h2" as={titleAs} weight="medium" className="leading-tight text-4xl md:text-5xl">
                Let&apos;s collaborate and <span className="text-primary-blue">build something real.</span>
            </Text>
            <Text variant="body" className="text-white/60 text-base md:text-lg max-w-sm mb-4 leading-relaxed font-light">
                Send me a message. Whether you&apos;re struggling with performance, facing an architectural challenge, or need a scalable solution built right from the start, I&apos;m here to listen and collaborate on practical, production-ready solutions.
            </Text>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
                <input 
                    {...register("fullName")}
                    type="text" 
                    placeholder={uiData.contact.form.placeholders.name} 
                    className={inputClasses(!!errors.fullName)}
                    disabled={isSubmitting}
                />
                {errors.fullName && (
                    <span className="text-xs text-red-400 pl-2">{errors.fullName.message}</span>
                )}
            </div>

            <div className="flex flex-col gap-1">
                <input 
                    {...register("email")}
                    type="email" 
                    placeholder={uiData.contact.form.placeholders.email} 
                    className={inputClasses(!!errors.email)}
                    disabled={isSubmitting}
                />
                {errors.email && (
                    <span className="text-xs text-red-400 pl-2">{errors.email.message}</span>
                )}
            </div>

            <div className="flex flex-col gap-1">
                <input 
                    {...register("subject")}
                    type="text" 
                    placeholder={uiData.contact.form.placeholders.subject} 
                    className={inputClasses(!!errors.subject)}
                    disabled={isSubmitting}
                />
                {errors.subject && (
                    <span className="text-xs text-red-400 pl-2">{errors.subject.message}</span>
                )}
            </div>

            <div className="flex flex-col gap-1">
                <textarea 
                    {...register("message")}
                    placeholder={uiData.contact.form.placeholders.message} 
                    rows={6}
                    className={`${inputClasses(!!errors.message)} resize-none`}
                    disabled={isSubmitting}
                />
                {errors.message && (
                    <span className="text-xs text-red-400 pl-2">{errors.message.message}</span>
                )}
            </div>
            
            <div className="mt-4">
                <Button 
                    variant="primary" 
                    size="lg" 
                    className="w-full py-4 text-sm uppercase tracking-wider bg-accent hover:bg-white hover:text-black disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? (
                        <>
                            <SpinnerIcon className="animate-spin" size={20} />
                            Sending...
                        </>
                    ) : (
                        uiData.contact.form.button
                    )}
                </Button>
            </div>
        </form>
    </Card>
  );
};
