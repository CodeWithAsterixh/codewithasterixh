"use client";
import { useState } from "react";

export function useMail() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );

  const sendMail = async (data: { name: string; email: string; message: string }) => {
    try {
      setStatus("loading");
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      if (result.ok) {
        setStatus("success");
        return { ok: true };
      }
      setStatus("error");
      return { ok: false };
    } catch {
      setStatus("error");
      return { ok: false };
    }
  };

  return { sendMail, status };
}
