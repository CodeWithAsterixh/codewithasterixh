"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Checkbox, FormControlLabel, TextField } from "@mui/material";
import React, { useRef } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { MdSend } from "react-icons/md";
import { z } from "zod";

type Props = object;

const responseFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  textContent: z.string().min(10, "Message must be at least 10 words"),
  permission: z.boolean().refine((val) => val === true, {
    message: "Permission must be accepted",
  }),
});
type responseFormData = z.infer<typeof responseFormSchema>;

function MailForm({}: Props) {
  const responseForm = useRef<HTMLElement | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<responseFormData>({
    resolver: zodResolver(responseFormSchema),
  });
  const onSubmit: SubmitHandler<responseFormData> = (data) => {
    const { email, name, textContent } = data;

    const subject = `Message from ${name}`;
    const body = `
  Name: ${name}
  Email: ${email}

  Message:
  ${textContent}

  ---
  Sent from the portfolio of Paul Peter - Web Developer
`;
    const mailtoLink = `mailto:peterpaultolulope@gmail.com?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    window.location.href = mailtoLink;
  };
  return (
    <section
      ref={responseForm}
      className="w-full h-full min-h-fit p-4 flex flex-col items-center justify-center gap-4 bg-black/10 text-center"
    >
      <div
        className={
          "w-full h-fit text-base-black dark:text-base-white p-2 text-center relative flex items-center justify-center pb-[-10px] gap-2 flex-col *:font-medium " +
          "after:content-[''] after:relative after:w-10 after:h-0.5 after:bg-red-500 after:rounded-full"
        }
      >
        <h2 className="text-xl min-[498px]:text-2xl sm:text-3xl">
          Have a request
        </h2>
        <h2 className="text-lg min-[498px]:text-xl sm:text-2xl">
          Mail me now!
        </h2>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-screen-sm flex flex-wrap items-center justify-center gap-2"
      >
        <TextField
          className="w-full min-[498px]:w-[calc(50%-0.25rem)] focus:!border-black/80 !outline-none"
          label="Name"
          error={!!errors.name}
          helperText={errors.name ? errors.name.message : " "}
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: errors.name ? "red" : "rgba(0, 0, 0, 0.3)",
              },
              "&.Mui-focused fieldset": {
                borderColor: errors.name ? "red" : "rgba(0, 0, 0, 0.8)",
                borderWidth: 1,
              },
            },
            "& .MuiOutlinedInput-input": {
              backgroundColor: "rgba(0, 0, 0, 0.05)",
            },
            "& .MuiInputLabel-root": {
              color: errors.name ? "red" : "gray",
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: errors.name ? "red" : "black",
            },
          }}
          {...register("name")}
        />

        <TextField
          className="w-full min-[498px]:w-[calc(50%-0.25rem)] focus:!border-black/80 !outline-none"
          label="Response Email"
          type="email"
          error={!!errors.email}
          helperText={errors.email ? errors.email.message : " "}
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: errors.email ? "red" : "rgba(0, 0, 0, 0.3)",
              },
              "&.Mui-focused fieldset": {
                borderColor: errors.email ? "red" : "rgba(0, 0, 0, 0.8)",
                borderWidth: 1,
              },
            },
            "& .MuiOutlinedInput-input": {
              backgroundColor: "rgba(0, 0, 0, 0.05)",
            },
            "& .MuiInputLabel-root": {
              color: errors.email ? "red" : "gray",
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: errors.email ? "red" : "black",
            },
          }}
          {...register("email")}
        />

        <textarea
          className={`w-full h-36 p-2 rounded-md border-[1px] bg-black/5 
    ${
      errors.textContent
        ? "border-red-500 hover:border-red-500"
        : "border-black/30 hover:border-black/80"
    } 
  focus:border-black/80 
    outline-none resize-none placeholder:text-black/50`}
          placeholder="How can we help you?"
          {...register("textContent")}
        />

        <div className="w-full flex flex-col items-start justify-start">
          <FormControlLabel
            control={
              <Checkbox
                sx={{
                  color: "black",
                  "&.Mui-checked": {
                    color: "black",
                  },
                }}
                {...register("permission", {
                  required: "You must give permission",
                })}
              />
            }
            label={`You give me permission to respond to you by email provided`}
            sx={{
              "& .MuiFormControlLabel-label": {
                color: errors.permission ? "red" : "black",
                textAlign: "left",
              },
            }}
          />
          {errors.permission && (
            <p
              style={{
                color: "red",
                fontSize: "0.875rem",
                marginTop: "0.25rem",
              }}
            >
              {errors.permission.message}
            </p>
          )}
        </div>

        <div className="w-full flex items-start justify-start">
          <Button
            variant="contained"
            className="w-full min-[498px]:w-fit !p-2 !px-4 !text-xs min-[498px]:!text-sm sm:!text-base !bg-black/90 hover:!bg-black/70 !text-white capitalize"
            startIcon={<MdSend />}
            disableElevation
            type="submit"
          >
            Submit
          </Button>
        </div>
      </form>
    </section>
  );
}

export default MailForm;
