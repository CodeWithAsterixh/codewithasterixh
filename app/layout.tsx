import type { Metadata } from "next";
import { getSanityQuery } from "../cms-studio/lib/getSanityQuery";
import { portfolioQuery } from "../cms-studio/queries";
import { Portfolio as PortfolioDataType } from "../cms-studio/types";
import HashScrollHandler from "../components/HashScrollHandler";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const portfolioData: PortfolioDataType = (await getSanityQuery(portfolioQuery))[0];

  const about = portfolioData?.about;

  // Use about content for description, fallback to default
  const description = about?.content
    ? about.content.slice(0, 160) // Limit to ~160 chars for SEO
    : "Asterixh builds fast and structured web applications with Next.js, React and TypeScript. View projects, skills and results.";

  // Comprehensive keywords for top SEO ranking
  const baseKeywords = [
    "Asterixh",
    "Paul Peter",
    "Paul",
    "Peter",
    "Full Stack Developer",
    "Next.js Developer",
    "React Developer",
    "TypeScript Developer",
    "Web Developer",
    "Developer Nigeria",
    "Nigeria Developer",
    "Web Developer Nigeria",
    "Frontend Developer",
    "Backend Developer",
    "Portfolio Developer",
    "JavaScript Developer",
    "Node.js Developer",
    "MERN Stack Developer",
    "Software Engineer",
    "Web Applications",
    "Modern Web Solutions",
    "High Performance Web Apps",
    "Code With Asterixh",
    "Asterixh Portfolio",
    "Paul Peter Portfolio",
    "Nigerian Developer",
    "African Developer",
    "Tech Portfolio",
    "Web Development Services",
    "Custom Web Apps",
    "E-commerce Developer",
    "SaaS Developer",
    "API Development",
    "Database Design",
    "UI/UX Developer",
    "Responsive Design",
    "Mobile First Development",
    "SEO Optimized Websites",
    "Fast Loading Websites",
    "Scalable Web Applications",
  ];

  // Add keywords from about content if available
  const aboutKeywords = about?.content
    ? about.content.toLowerCase().split(/\s+/).filter(word => word.length > 3 && !['with', 'from', 'that', 'this', 'have', 'been', 'will', 'they', 'their', 'what', 'when', 'where', 'which', 'also', 'like', 'just', 'over', 'some', 'them', 'then', 'than', 'into', 'such', 'each', 'most', 'much', 'many', 'made', 'make', 'come', 'came', 'take', 'took', 'give', 'gave', 'know', 'knew', 'think', 'thought', 'said', 'told', 'work', 'worked', 'done', 'went', 'gone', 'seen', 'saw', 'been', 'being', 'have', 'has', 'had', 'were', 'was', 'are', 'is', 'am', 'do', 'does', 'did', 'can', 'could', 'will', 'would', 'shall', 'should', 'may', 'might', 'must', 'ought', 'need', 'dare', 'used', 'use', 'using', 'get', 'got', 'gets', 'put', 'puts', 'putting', 'let', 'lets', 'letting', 'keep', 'keeps', 'keeping', 'begin', 'begins', 'beginning', 'show', 'shows', 'showing', 'seem', 'seems', 'seeming', 'help', 'helps', 'helping', 'talk', 'talks', 'talking', 'turn', 'turns', 'turning', 'start', 'starts', 'starting', 'run', 'runs', 'running', 'move', 'moves', 'moving', 'play', 'plays', 'playing', 'live', 'lives', 'living', 'believe', 'believes', 'believing', 'bring', 'brings', 'bringing', 'happen', 'happens', 'happening', 'write', 'writes', 'writing', 'sit', 'sits', 'sitting', 'stand', 'stands', 'standing', 'lose', 'loses', 'losing', 'pay', 'pays', 'paying', 'meet', 'meets', 'meeting', 'include', 'includes', 'including', 'continue', 'continues', 'continuing', 'set', 'sets', 'setting', 'learn', 'learns', 'learning', 'change', 'changes', 'changing', 'lead', 'leads', 'leading', 'understand', 'understands', 'understanding', 'watch', 'watches', 'watching', 'follow', 'follows', 'following', 'stop', 'stops', 'stopping', 'create', 'creates', 'creating', 'speak', 'speaks', 'speaking', 'read', 'reads', 'reading', 'allow', 'allows', 'allowing', 'add', 'adds', 'adding', 'spend', 'spends', 'spending', 'grow', 'grows', 'growing', 'open', 'opens', 'opening', 'walk', 'walks', 'walking', 'win', 'wins', 'winning', 'offer', 'offers', 'offering', 'remember', 'remembers', 'remembering', 'love', 'loves', 'loving', 'consider', 'considers', 'considering', 'appear', 'appears', 'appearing', 'buy', 'buys', 'buying', 'wait', 'waits', 'waiting', 'serve', 'serves', 'serving', 'die', 'dies', 'dying', 'send', 'sends', 'sending', 'build', 'builds', 'building', 'stay', 'stays', 'staying', 'fall', 'falls', 'falling', 'cut', 'cuts', 'cutting', 'reach', 'reaches', 'reaching', 'kill', 'kills', 'killing', 'remain', 'remains', 'remaining'].includes(word)).slice(0, 10)
    : [];
  const keywords = [...new Set([...baseKeywords, ...aboutKeywords])]; // Remove duplicates


  return {
    title: "Asterixh | Full Stack Developer",
    description,
    keywords,
    metadataBase: new URL("https://codewithasterixh.vercel.app"),
    alternates: { canonical: "https://codewithasterixh.vercel.app" },
    openGraph: {
      title: "Asterixh | Full Stack Developer",
      description: about?.content?.slice(0, 200) || "Portfolio of Asterixh. High performance web solutions built with modern tools.",
      url: "https://codewithasterixh.vercel.app",
      siteName: "Code With Asterixh",
      type: "website",
      images: [
        {
          url: "https://codewithasterixh.vercel.app/icon",
          width: 1200,
          height: 630,
          alt: "Asterixh Portfolio",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Asterixh | Full Stack Developer",
      description: about?.content?.slice(0, 200) || "Modern web solutions created with React, Next.js and TypeScript.",
      images: ["https://codewithasterixh.vercel.app/icon"],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
      },
    },
    category: "technology",
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const portfolioData: PortfolioDataType = (await getSanityQuery(portfolioQuery))[0];
  const about = portfolioData?.about;
  const hero = portfolioData?.hero;

  const socialUrls = hero?.socials?.map(social => social.href) || [
    "https://github.com/asterixh",
    "https://twitter.com/asterixh",
    "https://linkedin.com/in/asterixh",
  ];

  // Use about content for description, fallback to default
  const description = about?.content
    ? about.content.slice(0, 160) // Limit to ~160 chars for SEO
    : "Asterixh builds fast and structured web applications with Next.js, React and TypeScript. View projects, skills and results.";

  // Comprehensive keywords for top SEO ranking
  const baseKeywords = [
    "Asterixh",
    "Paul Peter",
    "Paul",
    "Peter",
    "Full Stack Developer",
    "Next.js Developer",
    "React Developer",
    "TypeScript Developer",
    "Web Developer",
    "Developer Nigeria",
    "Nigeria Developer",
    "Web Developer Nigeria",
    "Frontend Developer",
    "Backend Developer",
    "Portfolio Developer",
    "JavaScript Developer",
    "Node.js Developer",
    "MERN Stack Developer",
    "Software Engineer",
    "Web Applications",
    "Modern Web Solutions",
    "High Performance Web Apps",
    "Code With Asterixh",
    "Asterixh Portfolio",
    "Paul Peter Portfolio",
    "Nigerian Developer",
    "African Developer",
    "Tech Portfolio",
    "Web Development Services",
    "Custom Web Apps",
    "E-commerce Developer",
    "SaaS Developer",
    "API Development",
    "Database Design",
    "UI/UX Developer",
    "Responsive Design",
    "Mobile First Development",
    "SEO Optimized Websites",
    "Fast Loading Websites",
    "Scalable Web Applications",
  ];

  // Add keywords from about content if available
  const aboutKeywords = about?.content
    ? about.content.toLowerCase().split(/\s+/).filter(word => word.length > 3 && !['with', 'from', 'that', 'this', 'have', 'been', 'will', 'they', 'their', 'what', 'when', 'where', 'which', 'also', 'like', 'just', 'over', 'some', 'them', 'then', 'than', 'into', 'such', 'each', 'most', 'much', 'many', 'made', 'make', 'come', 'came', 'take', 'took', 'give', 'gave', 'know', 'knew', 'think', 'thought', 'said', 'told', 'work', 'worked', 'done', 'went', 'gone', 'seen', 'saw', 'been', 'being', 'have', 'has', 'had', 'were', 'was', 'are', 'is', 'am', 'do', 'does', 'did', 'can', 'could', 'will', 'would', 'shall', 'should', 'may', 'might', 'must', 'ought', 'need', 'dare', 'used', 'use', 'using', 'get', 'got', 'gets', 'put', 'puts', 'putting', 'let', 'lets', 'letting', 'keep', 'keeps', 'keeping', 'begin', 'begins', 'beginning', 'show', 'shows', 'showing', 'seem', 'seems', 'seeming', 'help', 'helps', 'helping', 'talk', 'talks', 'talking', 'turn', 'turns', 'turning', 'start', 'starts', 'starting', 'run', 'runs', 'running', 'move', 'moves', 'moving', 'play', 'plays', 'playing', 'live', 'lives', 'living', 'believe', 'believes', 'believing', 'bring', 'brings', 'bringing', 'happen', 'happens', 'happening', 'write', 'writes', 'writing', 'sit', 'sits', 'sitting', 'stand', 'stands', 'standing', 'lose', 'loses', 'losing', 'pay', 'pays', 'paying', 'meet', 'meets', 'meeting', 'include', 'includes', 'including', 'continue', 'continues', 'continuing', 'set', 'sets', 'setting', 'learn', 'learns', 'learning', 'change', 'changes', 'changing', 'lead', 'leads', 'leading', 'understand', 'understands', 'understanding', 'watch', 'watches', 'watching', 'follow', 'follows', 'following', 'stop', 'stops', 'stopping', 'create', 'creates', 'creating', 'speak', 'speaks', 'speaking', 'read', 'reads', 'reading', 'allow', 'allows', 'allowing', 'add', 'adds', 'adding', 'spend', 'spends', 'spending', 'grow', 'grows', 'growing', 'open', 'opens', 'opening', 'walk', 'walks', 'walking', 'win', 'wins', 'winning', 'offer', 'offers', 'offering', 'remember', 'remembers', 'remembering', 'love', 'loves', 'loving', 'consider', 'considers', 'considering', 'appear', 'appears', 'appearing', 'buy', 'buys', 'buying', 'wait', 'waits', 'waiting', 'serve', 'serves', 'serving', 'die', 'dies', 'dying', 'send', 'sends', 'sending', 'build', 'builds', 'building', 'stay', 'stays', 'staying', 'fall', 'falls', 'falling', 'cut', 'cuts', 'cutting', 'reach', 'reaches', 'reaching', 'kill', 'kills', 'killing', 'remain', 'remains', 'remaining'].includes(word)).slice(0, 10)
    : [];
  const keywords = [...new Set([...baseKeywords, ...aboutKeywords])]; // Remove duplicates

  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "Person",
      name: "Asterixh",
      alternateName: "Paul Peter",
      url: "https://codewithasterixh.vercel.app",
      jobTitle: "Full Stack Developer",
      description: about?.content,
      email: about?.email,
      telephone: about?.phone,
      sameAs: socialUrls,
      knowsAbout: keywords.slice(0, 10), // Top keywords
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "Code With Asterixh",
      url: "https://codewithasterixh.vercel.app",
      description: description,
      author: {
        "@type": "Person",
        name: "Asterixh",
      },
      publisher: {
        "@type": "Person",
        name: "Asterixh",
      },
      potentialAction: {
        "@type": "SearchAction",
        target: "https://codewithasterixh.vercel.app/search?q={search_term_string}",
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Code With Asterixh",
      url: "https://codewithasterixh.vercel.app",
      logo: "https://codewithasterixh.vercel.app/icon.png",
      sameAs: socialUrls,
      contactPoint: {
        "@type": "ContactPoint",
        email: about?.email,
        telephone: about?.phone,
        contactType: "Customer Service",
      },
    },
  ];

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="author" href="/humans.txt" />
        {structuredData.map((data, index) => (
          <script
            key={index}
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(data),
            }}
          />
        ))}
      </head>
      <body className="antialiased font-poppins bg-base-100 text-base-content">
        <HashScrollHandler />
        {children}
      </body>
    </html>
  );
}
