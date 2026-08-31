import type { Metadata, Viewport } from "next";
import { ThemeToggle } from "@/components/ThemeToggle";
import { PresenceProvider } from "@/components/PresenceProvider";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://pavitrakushwaha.dev"),
  title: {
    default: "Pavitra Kushwaha - Engineer, Founder, Researcher",
    template: "%s | Pavitra Kushwaha",
  },
  description:
    "Pavitra Kushwaha. Engineer, founder, researcher. Building Vivacity, a simulation runtime for AI agents. Research fellow at IIT Kanpur.",
  keywords: [
    "Pavitra Kushwaha",
    "AI Researcher",
    "Founder",
    "Builder",
    "ORCA",
    "byteforge",
    "PaXus",
    "Prolearn",
    "Synthetic Intelligence",
    "D2AR",
    "IIT Kanpur",
    "LumenSeed",
    "VIBECON",
    "YC Startup School",
    "Uniform2Unicorn",
    "Vivacity",
    "simulation runtime",
    "world state",
    "agentic AI",
    "Android automation",
    "student developer India",
    "hackathon winner",
    "tech community India",
    "edge AI",
    "MPC cryptography",
    "reinforcement learning",
    "NLP Hindi",
    "medical report AI",
    "byteforge India",
    "young founder India",
    "IIT Kanpur research",
    "Prolearn engineer",
    "Uniform2Unicorn winner",
    "YC Startup School",
    "VIBECON top builder",
    "Techfest IIT Bombay",
    "open source India",
  ],
  authors: [{ name: "Pavitra Kushwaha", url: "https://pavitrakushwaha.dev" }],
  creator: "Pavitra Kushwaha",
  robots: "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1",
  alternates: {
    canonical: "https://pavitrakushwaha.dev",
  },
  openGraph: {
    type: "profile",
    url: "https://pavitrakushwaha.dev",
    title: "Pavitra Kushwaha - Engineer, Founder, Researcher",
    description:
      "Engineer, founder, researcher. Building Vivacity, a simulation runtime for AI agents. Research fellow at IIT Kanpur.",
    siteName: "Pavitra Kushwaha",
    locale: "en_IN",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Pavitra Kushwaha, Founder, Builder, AI Researcher",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@pavikshw",
    creator: "@pavikshw",
    title: "Pavitra Kushwaha - Engineer, Founder, Researcher",
    description:
      "Engineer, founder, researcher. Building Vivacity. Research fellow at IIT Kanpur.",
    images: ["/og-image.png"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://pavitrakushwaha.dev/#website",
      url: "https://pavitrakushwaha.dev/",
      name: "Pavitra Kushwaha",
      alternateName: ["Pavitra", "Pavitra Kushwaha portfolio", "pavitrakushwaha.dev"],
      inLanguage: "en-IN",
      publisher: { "@id": "https://pavitrakushwaha.dev/#person" },
      potentialAction: {
        "@type": "SearchAction",
        target: "https://www.google.com/search?q=Pavitra+Kushwaha+site:pavitrakushwaha.dev",
        "query-input": "required name=Pavitra Kushwaha",
      },
    },
    {
      "@type": "Person",
      "@id": "https://pavitrakushwaha.dev/#person",
      name: "Pavitra Kushwaha",
      url: "https://pavitrakushwaha.dev/",
      email: "mailto:pavitra@paxus.in",
      jobTitle: ["Engineer", "Founder", "Researcher"],
      description:
        "Pavitra Kushwaha is an engineer, founder, and researcher. He is building Vivacity, a simulation runtime for AI agents, and is a research fellow at IIT Kanpur.",
      nationality: { "@type": "Country", name: "India" },
      knowsAbout: [
        "Artificial Intelligence",
        "Synthetic Intelligence",
        "Agentic AI",
        "Software Engineering",
        "Cryptography",
        "MPC",
        "Hackathons",
        "Android ADB",
        "LLM Agents",
        "Simulation Runtime",
        "World State",
        "Edge Computing",
        "NLP",
        "Reinforcement Learning",
        "Healthcare AI",
        "Educational Technology",
        "React",
        "Next.js",
        "TypeScript",
        "Python",
        "Node.js",
      ],
      knowsLanguage: ["English", "Hindi"],
      award: [
        "#1 Top Young Founder of the Year '26, Uniform2Unicorn",
        "YC Startup School India (6% acceptance rate)",
        "Top 20 builder, VIBECON (20,000+ applicants)",
        "Research Fellow, IIT Kanpur",
        "5-figure bug bounty on major AI platform",
        "6-figure bug bounty on major quick-commerce platform",
        "Won 15+ hackathons in 2 months",
        "Authored a research paper on Synthetic Intelligence at 16",
        "Keynoted SparkX at Techfest '25 (IIT Bombay)",
        "Won a match in international Robowars 8kg at Techfest, IIT Bombay",
        "Inflection Grant recipient",
        "Organized Execron 1.0 at IIT Kanpur",
      ],
      hasOccupation: [
        {
          "@type": "Occupation",
          name: "Cofounder",
          employer: {
            "@type": "Organization",
            name: "Vivacity",
            url: "https://tryvivacity.com",
          },
        },
      ],
      alumniOf: {
        "@type": "EducationalOrganization",
        name: "DPS Kalyanpur",
        url: "https://dpskalyanpur.com",
      },
      sameAs: [
        "https://github.com/Pavitrakus",
        "https://linkedin.com/in/pavitra-kushwaha/",
        "https://x.com/pavikshw",
        "https://www.instagram.com/pavitrakuswaha/",
        "https://cal.com/pavitrakushwaha",
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="void" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("theme");if(t==="void"||t==="dark"||t==="light"){document.documentElement.setAttribute("data-theme",t);}else{document.documentElement.setAttribute("data-theme","void");}}catch(e){document.documentElement.setAttribute("data-theme","void");}})();`,
          }}
        />
        <link rel="me" href="https://x.com/pavikshw" />
        <link rel="me" href="https://github.com/Pavitrakus" />
        <link rel="me" href="https://linkedin.com/in/pavitra-kushwaha/" />
        <link rel="me" href="https://www.instagram.com/pavitrakuswaha/" />
        <link rel="me" href="mailto:pavitra@paxus.in" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon.ico" sizes="32x32" />
        <link rel="icon" href="/favicon-16x16.png" sizes="16x16" type="image/png" />
        <link rel="icon" href="/favicon-32x32.png" sizes="32x32" type="image/png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <PresenceProvider>
          <ThemeToggle />
          {children}
        </PresenceProvider>
      </body>
    </html>
  );
}
