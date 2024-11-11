import MailForm from "@/ui/components/mailForm/MailForm";
import SocialsTimeline from "@/ui/components/TimeLineCentered/SocialsTimeline";

type Props = object;

function ContactPage({}: Props) {
  return (
    <section className="w-full h-fit flex flex-col items-start justify-start gap-5 p-4 bg-base-white dark:bg-base-black">
      <section className="w-full p-4 flex flex-col items-center justify-center gap-4 bg-black/10 text-center">
        <div
          className={
            "w-full h-fit text-base-black dark:text-base-white p-2 text-center relative flex items-center justify-center pb-[-10px] gap-2 flex-col *:font-medium " +
            "after:content-[''] after:relative after:w-10 after:h-0.5 after:bg-red-500 after:rounded-full"
          }
        >
          <h2 className="text-xl min-[498px]:text-2xl sm:text-3xl">
            Get through my socials
          </h2>
        </div>
        <SocialsTimeline />
      </section>

      <div
        id="contact-form"
        className="w-full h-screen flex items-center justify-center flex-col"
      >
        <MailForm />
      </div>
    </section>
  );
}

export default ContactPage;
