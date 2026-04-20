"use client";

import { Modal } from "@/components/ui/atoms/Modal/Modal";
import { Text } from "@/components/ui/atoms/Text/Text";
import {
  livePreviewRequestSchema,
  type LivePreviewRequestData,
} from "@/features/works/schema/livePreviewRequest";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowUpRightIcon, SpinnerIcon } from "@phosphor-icons/react/dist/ssr";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface RequestLivePreviewButtonProps {
  projectSlug: string;
  projectTitle: string;
}

export function RequestLivePreviewButton({
  projectSlug,
  projectTitle,
}: RequestLivePreviewButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LivePreviewRequestData>({
    resolver: zodResolver(livePreviewRequestSchema),
    defaultValues: {
      email: "",
      projectSlug,
    },
  });

  const closeModal = () => {
    setIsOpen(false);
    setApiError(null);
    setSuccessMessage(null);
    reset({
      email: "",
      projectSlug,
    });
  };

  const onSubmit = async (data: LivePreviewRequestData) => {
    setIsSubmitting(true);
    setApiError(null);
    setSuccessMessage(null);

    try {
      const response = await fetch("/api/live-preview-request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to submit request.");
      }

      setSuccessMessage(result.message);
      reset({
        email: "",
        projectSlug,
      });
    } catch (error) {
      setApiError(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center justify-center rounded-full font-medium transition-all duration-300 cursor-pointer bg-accent text-white hover:bg-white hover:text-black px-6 py-3 text-base"
      >
        Request Live Preview
        <ArrowUpRightIcon className="ml-2" size={20} weight="bold" />
      </button>

      <Modal
        isOpen={isOpen}
        onClose={closeModal}
        title={`Request Live Preview - ${projectTitle.split("–")[0].trim()}`}
      >
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <Text variant="body" className="text-white/75 leading-relaxed">
              Enter your email to request access to this project&apos;s live preview.
              I&apos;ll review the request and send the live link within 2 days.
            </Text>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <Text variant="body" className="text-sm text-white/70 leading-relaxed">
                Your email will only be contacted once to send the live preview.
                This is not a newsletter, and no recurring emails will be sent after that.
              </Text>
            </div>
          </div>

          {successMessage ? (
            <div className="flex flex-col gap-4 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-5">
              <Text variant="h4" className="text-white">
                Request Sent
              </Text>
              <Text variant="body" className="text-sm text-white/75 leading-relaxed">
                {successMessage}
              </Text>
              <button
                onClick={closeModal}
                className="inline-flex w-fit items-center justify-center rounded-full border border-white/15 px-5 py-2 text-sm text-white hover:bg-white/5 transition-colors"
              >
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
              <input type="hidden" {...register("projectSlug")} value={projectSlug} />

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="live-preview-email"
                  className="text-xs uppercase tracking-widest text-white/45 font-semibold"
                >
                  Email Address
                </label>
                <input
                  id="live-preview-email"
                  type="email"
                  placeholder="you@example.com"
                  disabled={isSubmitting}
                  {...register("email")}
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-white placeholder:text-white/35 outline-none transition focus:border-white/25"
                />
                {errors.email && (
                  <span className="text-xs text-red-400">{errors.email.message}</span>
                )}
              </div>

              {apiError && (
                <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-4">
                  <Text variant="body" className="text-sm text-red-200">
                    {apiError}
                  </Text>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center justify-center rounded-full bg-accent px-6 py-3 text-base font-medium text-white transition-all duration-300 hover:bg-white hover:text-black disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? (
                  <>
                    <SpinnerIcon className="mr-2 animate-spin" size={18} />
                    Sending Request...
                  </>
                ) : (
                  "Send Request"
                )}
              </button>
            </form>
          )}
        </div>
      </Modal>
    </>
  );
}
