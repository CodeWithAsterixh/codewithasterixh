import { Metadata } from "next";
import { Text } from "@/components/ui/atoms/Text/Text";
import { JsonLd } from "@/components/seo/JsonLd";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Asterixh | Expert Software Engineer & Fullstack Developer",
  description: "Official portfolio portal for Asterixh (Paul Peter). Software engineering projects, architectural deep-dives, and technical web solutions.",
  keywords: ["Asterixh", "Paul Peter", "Software Engineering Expert", "Fullstack Developer Portfolio", "Next.js Architecture"],
};

export default function AsterixhPage() {
  const breadcrumbs = [{ name: "Home", item: "/" }, { name: "Asterixh", item: "/asterixh" }];

  return (
    <div className="container mx-auto px-4 py-24 min-h-[60vh] flex flex-col justify-center items-center text-center">
      <JsonLd breadcrumbs={breadcrumbs} />
      <Text variant="h1" className="text-4xl md:text-6xl font-bold mb-6">
        Asterixh
      </Text>
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
