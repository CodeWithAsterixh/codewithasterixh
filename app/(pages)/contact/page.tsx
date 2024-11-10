import MailForm from "@/ui/components/mailForm/MailForm";

type Props = object;

function ContactPage({}: Props) {
  return (
    <section className="w-full h-fit flex flex-col items-start justify-start gap-5 p-4 bg-base-white dark:bg-base-black">
      <div className="w-full min-h-screen">
        <MailForm />
      </div>
    </section>
  );
}

export default ContactPage;
