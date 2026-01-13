/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "d/components/ui/input";
import { Textarea } from "d/components/ui/textarea";
import { Button } from "d/components/ui/button";
import { Toaster, toast } from "sonner";
import { useMail } from "d/lib/hooks/useMail";
import { Contact as ContactSection } from "d/cms-studio/types";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";

const pricingValues = ["basic", "standard", "advanced", "none"] as const;

const schema = z.object({
  name: z.string().min(2, "Enter your name"),
  email: z.email("Enter a valid email"),
  message: z.string().min(10, "Enter at least 10 characters"),
  pricingType: z.enum(pricingValues),
});

export default function Contact({ data }: Readonly<{ data: ContactSection }>) {
  const { sendMail, status } = useMail();
  const searchParams = useSearchParams();
  const router = useRouter();

  const pricingTypeFromQuery = searchParams.get("pricingType");

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      pricingType: "none",
    },
  });

  const pricingType = watch("pricingType");

  useEffect(() => {
    if (
      pricingTypeFromQuery &&
      pricingValues.includes(pricingTypeFromQuery as any)
    ) {
      setValue("pricingType", pricingTypeFromQuery as any);
    }
  }, [pricingTypeFromQuery, setValue]);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    if (pricingType === "none") {
      params.delete("pricingType");
    } else {
      params.set("pricingType", pricingType);
    }

    router.replace(`?${params.toString()}`, { scroll: false });
  }, [pricingType, router, searchParams]);

  const onSubmit = async (formData: any) => {
    const payload = {
      ...formData,
      pricingType:
        formData.pricingType === "none" ? undefined : formData.pricingType,
    };

    const res = await sendMail(payload);

    if (res.ok) {
      toast.success("Message sent successfully");
      reset({ pricingType });
    } else {
      toast.error("Failed to send message");
    }
  };

  return (
    <section id="contact" className="relative w-full bg-base-100 py-20 overflow-hidden">
      <Toaster />

      <main className="section_container px-4 flex flex-col gap-12 items-center">
        <div className="text-center">
          <p className="text-primary text-sm font-medium">{data.tagline}</p>
          <h2 className="text-3xl font-bold text-base-content">{data.title}</h2>
          <p className="text-accent-content text-sm mt-2 max-w-lg mx-auto">
            {data.subtitle}
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-lg flex flex-col gap-5 bg-base-200 border border-base-300 rounded-2xl p-6 shadow-xl backdrop-blur-sm"
        >
          <div>
            <Input
              placeholder={data.namePlaceholder}
              {...register("name")}
              disabled={status === "loading"}
            />
            {errors.name && (
              <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <Input
              placeholder={data.emailPlaceholder}
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
            <select
              {...register("pricingType")}
              disabled={status === "loading"}
              className="w-full rounded-md border border-base-300 bg-base-100 p-2"
            >
              <option value="none">Select pricing plan</option>
              <option value="basic">Basic</option>
              <option value="standard">Standard</option>
              <option value="advanced">Advanced</option>
            </select>
            {errors.pricingType && (
              <p className="text-xs text-red-500 mt-1">
                {errors.pricingType.message}
              </p>
            )}
          </div>

          <div>
            <Textarea
              rows={5}
              placeholder={data.messagePlaceholder}
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
            className="w-full bg-primary !text-base-300 hover:bg-primary/90 transition-all"
          >
            {status === "loading" ? "Sending..." : data.submitLabel}
          </Button>
        </form>
      </main>
    </section>
  );
}
