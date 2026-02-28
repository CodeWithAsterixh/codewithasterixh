import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Asterixh | Software Engineer & Web Developer",
  description: "This is the official portfolio of Asterixh. Explore software engineering projects and web development services by Paul Peter.",
  keywords: ["Asterixh", "Paul Peter", "Software Engineer", "Web Developer", "Portfolio"],
};

export default function AsterixhPage() {
  return (
    <div className="container mx-auto px-4 py-24 min-h-[60vh] flex flex-col justify-center items-center text-center">
      <h1 className="text-4xl md:text-6xl font-bold mb-6">
        Asterixh
      </h1>
      <div className="max-w-2xl mx-auto space-y-6 text-lg text-gray-300">
        <p>
          You have found the official portfolio of <strong>Asterixh</strong> (Paul Peter).
        </p>
        <p>
          I am a Software Engineer and Web Developer. I build functional software and responsive websites.
        </p>
        <p>
          Feel free to explore my <Link href="/works" className="text-primary hover:underline">projects</Link>, 
          read my <Link href="/blog" className="text-primary hover:underline">articles</Link>, 
          or <Link href="/contact" className="text-primary hover:underline">get in touch</Link>.
        </p>
      </div>
    </div>
  );
}
