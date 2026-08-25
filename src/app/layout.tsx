import type { Metadata } from "next";
import { ThemeToggle } from "@/components/ThemeToggle";
import { PresenceProvider } from "@/components/PresenceProvider";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://pavitrakushwaha.dev"),
  title: {
    default: "Pavitra Kushwaha | Founder, Builder, AI Researcher",
    template: "%s | Pavitra Kushwaha",
  },
  description:
    "Pavitra Kushwaha, 16-year-old founder, builder, and AI researcher from Delhi. Research Fellow at IIT Kanpur. #1 Top Young Founder of the Year '26. Building the video pipeline at Prolearn ($3.2M pre-seed) and things that dent Silicon Valley. Building ORCA (zero-step agentic AI), byteforge (4,500+ member tech community), Vivacity (3B1B-style educational animations), and D2AR (diffusion vs auto-regressive Hindi NLP benchmark).",
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
    "Delhi student founder",
    "Bangalore hackathon",
    "Vivacity",
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
    "Pavitra Kushwaha Delhi",
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
    title: "Pavitra Kushwaha | Founder, Builder, AI Researcher",
    description:
      "16-year-old founder, builder, and AI researcher from Delhi. Research Fellow at IIT Kanpur. #1 Top Young Founder of the Year '26. Building things that dent Silicon Valley. ORCA, byteforge, Vivacity, D2AR.",
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
    site: "@Pavitra_Kushwah",
    creator: "@Pavitra_Kushwah",
    title: "Pavitra Kushwaha | Founder, Builder, AI Researcher",
    description:
      "16-year-old founder, builder, and AI researcher from Delhi. Research Fellow at IIT Kanpur. #1 Top Young Founder of the Year '26. Building things that dent Silicon Valley.",
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
      jobTitle: ["Founder", "AI Researcher", "Builder", "Engineer"],
      description:
        "Pavitra Kushwaha is a 16-year-old founder, builder, and AI researcher from Delhi. Research Fellow at IIT Kanpur under Prof. Adithya Vadapalli. #1 Top Young Founder of the Year '26 at Uniform2Unicorn. Currently building the video pipeline at Prolearn ($3.2M pre-seed, Bangalore). Founder of byteforge (4,500+ member tech community), PaXus (multi-venture tech company).",
      nationality: { "@type": "Country", name: "India" },
      address: {
        "@type": "PostalAddress",
        addressLocality: "Delhi",
        addressCountry: "IN",
      },
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
        "Published research paper on Synthetic Intelligence at 16",
        "Keynoted SparkX at Techfest '25 (IIT Bombay)",
        "Won international robowars 8kg at Techfest '25",
      ],
      hasOccupation: [
        {
          "@type": "Occupation",
          name: "Engineer",
          employer: {
            "@type": "Organization",
            name: "Prolearn",
            url: "https://prolearn.app",
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
        "https://x.com/Pavitra_Kushwah",
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
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("theme");if(t==="dark"||t==="light"){document.documentElement.setAttribute("data-theme",t);}else if(window.matchMedia("(prefers-color-scheme: dark)").matches){document.documentElement.setAttribute("data-theme","dark");}}catch(e){}})();`,
          }}
        />
        <link rel="me" href="https://x.com/Pavitra_Kushwah" />
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
