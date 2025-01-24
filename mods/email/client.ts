import emailjs from "@emailjs/browser";

interface template {
  "Request email for evolve": string;
  "Evolve Quick Response email": string;
}
const templates: template = {
  "Evolve Quick Response email": "template_m4q64v5",
  "Request email for evolve": "template_vi5oa2q",
};

/**
 * emailClient - EmailJS client utility to send a request and response mail
 * 
 * @service {emailjs} - emailjs
 * 
 * @example - 
 * // example usage
 * await emailClient({
        from_name: "john doe";
        from_email: "john@gmail.com";
        service: "Web services";
        project_name: "john doe lib";
        message: "please create a library that i can read with";
        to_email: "nelson@gmail.com";
      });
 */
export async function emailClient(emailContent: {
  from_name: string;
  from_email: string;
  service: string;
  project_name: string;
  message: string;
  to_email: string;
}) {
  const __PID__ = import.meta.env.VITE_EMAIL_JS_PUBLIC_API;
  const __SID__ = import.meta.env.VITE_EMAIL_JS_SERVICE_ID;
  emailjs
    .send(__SID__, templates["Request email for evolve"], emailContent, {
      publicKey: __PID__,
    })
    .then(() => {
      quickResponse({
        from_name: "Evolve Team",
        to_name: emailContent.from_name,
        reply_to: emailContent.from_email,
        from_email: emailContent.to_email,
      });
    })
    .then(() => {
      return {
        status: "ok",
        message: "mail sent successfully",
      };
    })
    .catch(() => {
      throw new Error("bad request");
    });
}

export async function quickResponse(res: {
  reply_to: string;
  from_name: string;
  to_name: string;
  from_email: string;
}) {
  const __PID__ = import.meta.env.VITE_EMAIL_JS_PUBLIC_API;
  const __SID__ = import.meta.env.VITE_EMAIL_JS_SERVICE_ID;
  emailjs
    .send(__SID__, templates["Evolve Quick Response email"], res, {
      publicKey: __PID__,
    })
    .then(() => {
      return {
        status: "ok",
      };
    })
    .catch(() => {
      throw new Error("bad request");
    });
}
