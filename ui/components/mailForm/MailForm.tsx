"use client";

import { RootState } from "@/store/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Checkbox, FormControlLabel, TextField } from "@mui/material";
import React, { useRef } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { MdSend } from "react-icons/md";
import { useSelector } from "react-redux";
import { z } from "zod";
import { __MAILER__ } from "./mailvar";

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
  const { mode } = useSelector((s: RootState) => s.ThemePreference);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<responseFormData>({
    resolver: zodResolver(responseFormSchema),
  });
  const onSubmit: SubmitHandler<responseFormData> = (data) => {
    __MAILER__(data);
  };

  const c = {
    ".3": "0.3",
    ".8": "0.8",
    ".5": "0.05",
  };
  const c_op3 =
    mode === "light"
      ? `rgba(0, 0, 0, ${c[".3"]} )`
      : `rgba(255, 255, 255, ${c[".3"]} )`;
  const c_op8 =
    mode === "light"
      ? `rgba(0, 0, 0, ${c[".8"]} )`
      : `rgba(255, 255, 255, ${c[".8"]} )`;
  const c_op5 =
    mode === "light"
      ? `rgba(0, 0, 0, ${c[".5"]} )`
      : `rgba(255, 255, 255, ${c[".5"]} )`;
  const t_C = mode === "light" ? "grey" : "grey";
  const t_CF = mode === "light" ? "black" : "white";

  return (
    <section
      ref={responseForm}
      className="w-full h-full min-h-fit p-4 flex flex-col items-center justify-center gap-4 rounded-md bg-black/10 dark:bg-white/10 text-center"
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
          className="w-full min-[498px]:w-[calc(50%-0.25rem)] !outline-none"
          label="Name"
          error={!!errors.name}
          helperText={errors.name ? errors.name.message : " "}
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: errors.name ? "red" : c_op3,
              },
              "&.Mui-focused fieldset": {
                borderColor: errors.name ? "red" : c_op8,
                borderWidth: 1,
              },
            },
            "& .MuiOutlinedInput-root.Mui-hovered": {
              "& fieldset": {
                borderColor: errors.name ? "red" : c_op3,
              },
              "&.Mui-focused fieldset": {
                borderColor: errors.name ? "red" : c_op8,
                borderWidth: 1,
              },
            },
            "& .MuiOutlinedInput-input": {
              backgroundColor: c_op5,
            },
            "& .MuiInputLabel-root": {
              color: errors.name ? "red" : t_C,
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: errors.name ? "red" : t_CF,
            },
          }}
          {...register("name")}
        />

        <TextField
          className="w-full min-[498px]:w-[calc(50%-0.25rem)] !outline-none"
          label="Response Email"
          type="email"
          error={!!errors.email}
          helperText={errors.email ? errors.email.message : " "}
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: errors.email ? "red" : c_op3,
              },
              "&.Mui-focused fieldset": {
                borderColor: errors.email ? "red" : c_op8,
                borderWidth: 1,
              },
            },
            "& .MuiOutlinedInput-input": {
              backgroundColor: c_op5,
            },
            "& .MuiInputLabel-root": {
              color: errors.email ? "red" : t_C,
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: errors.email ? "red" : t_CF,
            },
          }}
          {...register("email")}
        />

        <textarea
          className={`w-full h-36 p-2 rounded-md border-[1px] bg-black/5 dark:bg-white/5
    ${
      errors.textContent
        ? "border-red-500 hover:border-red-500"
        : "border-black/30 hover:border-black/80 dark:border-white/30 dark:hover:border-white/80"
    } 
  focus:border-black/80 dark:focus:border-white/80 
    outline-none resize-none placeholder:text-black/50 dark:placeholder:text-white/50`}
          placeholder="How can we help you?"
          {...register("textContent")}
        />

        <div className="w-full flex flex-col items-start justify-start">
          <FormControlLabel
            control={
              <Checkbox
                sx={{
                  color: t_CF,
                  "&.Mui-checked": {
                    color: t_CF,
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
                color: errors.permission ? "red" : t_CF,
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
            className="w-full min-[498px]:w-fit !p-2 !px-4 !text-xs min-[498px]:!text-sm sm:!text-base !bg-black/70 dark:!bg-white/70 !text-white dark:!text-black !backdrop-blur-md capitalize"
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
