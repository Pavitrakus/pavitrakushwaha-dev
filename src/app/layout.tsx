import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://pavitrakushwaha.dev"),
  title: "Pavitra Kushwaha | Founder, Builder, AI Researcher",
  description:
    "Pavitra Kushwaha — 16-year-old founder, builder, and AI researcher from Delhi. Research Fellow at IIT Kanpur. #1 Top Young Founder of the Year '26. Building the video pipeline at Prolearn ($3.2M pre-seed) and things that dent Silicon Valley.",
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
  ],
  authors: [{ name: "Pavitra Kushwaha", url: "https://pavitrakushwaha.dev" }],
  robots: "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1",
  alternates: {
    canonical: "https://pavitrakushwaha.dev",
  },
  openGraph: {
    type: "profile",
    url: "https://pavitrakushwaha.dev",
    title: "Pavitra Kushwaha",
    description:
      "17-year-old founder, builder, and AI researcher from Delhi. Research Fellow at IIT Kanpur. #1 Top Young Founder of the Year '26. Building things that dent Silicon Valley.",
    siteName: "Pavitra Kushwaha",
    locale: "en_IN",
  },
  twitter: {
    card: "summary",
    site: "@Pavitra_Kushwah",
    creator: "@Pavitra_Kushwah",
    title: "Pavitra Kushwaha",
    description:
      "17-year-old founder, builder, and AI researcher from Delhi. Research Fellow at IIT Kanpur. Building things that dent Silicon Valley.",
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
      alternateName: ["Pavitra", "Pavitra Kushwaha portfolio"],
      inLanguage: "en-IN",
      publisher: { "@id": "https://pavitrakushwaha.dev/#person" },
    },
    {
      "@type": "Person",
      "@id": "https://pavitrakushwaha.dev/#person",
      name: "Pavitra Kushwaha",
      url: "https://pavitrakushwaha.dev/",
      email: "mailto:pavitra@paxus.in",
      jobTitle: ["Founder", "AI Researcher", "Builder"],
      description:
        "Pavitra Kushwaha is a 16-year-old founder, builder, and AI researcher from Delhi. Research Fellow at IIT Kanpur under Prof. Adithya Vadapalli. #1 Top Young Founder of the Year '26 at Uniform2Unicorn. Currently building the video pipeline at Prolearn ($3.2M pre-seed, Bangalore).",
      nationality: { "@type": "Country", name: "India" },
      knowsAbout: [
        "Artificial Intelligence",
        "Synthetic Intelligence",
        "Agentic AI",
        "Software Engineering",
        "Cryptography",
        "MPC",
        "Hackathons",
      ],
      award: [
        "#1 Top Young Founder of the Year '26 — Uniform2Unicorn",
        "YC Startup School India (6% acceptance rate)",
        "Top 20 builder — VIBECON (20,000+ applicants)",
        "Research Fellow — IIT Kanpur",
        "5-figure bug bounty on major AI platform",
        "6-figure bug bounty on major quick-commerce platform",
        "Won 15+ hackathons in 2 months",
        "Published research paper on Synthetic Intelligence at 16",
      ],
      sameAs: [
        "https://github.com/Pavitrakus",
        "https://linkedin.com/in/pavitra-kushwaha/",
        "https://x.com/Pavitra_Kushwah",
        "https://www.instagram.com/pavitrakuswaha/",
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
    <html lang="en">
      <head>
        <link rel="me" href="https://x.com/Pavitra_Kushwah" />
        <link rel="me" href="https://github.com/Pavitrakus" />
        <link rel="me" href="https://linkedin.com/in/pavitra-kushwaha/" />
        <link rel="me" href="https://www.instagram.com/pavitrakuswaha/" />
        <link rel="me" href="mailto:pavitra@paxus.in" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
