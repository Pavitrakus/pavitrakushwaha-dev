import type { Metadata } from "next";
import Link from "next/link";
import { PostChrome } from "@/components/PostChrome";
import { SiteFooter } from "@/components/SiteFooter";


export const metadata: Metadata = {
  title: "LumenSeed",
  description:
    "medical report translator that turns clinical jargon into clear language anyone can read. OCR ingestion, UMLS entity linking, LangChain RAG with Weaviate vector DB, PII stripping. Won 1st at Techfest IIT Bombay SparkX.",
  keywords: [
    "LumenSeed",
    "medical report translator",
    "healthcare AI",
    "Pavitra Kushwaha LumenSeed",
    "clinical jargon translator",
    "UMLS ontology",
    "LangChain RAG",
    "Weaviate vector database",
    "Techfest IIT Bombay winner",
    "SparkX winner",
    "medical NLP",
    "PDF medical report parser",
    "PII stripping healthcare",
  ],
  openGraph: {
    type: "article",
    url: "https://pavitrakushwaha.dev/projects/lumenseed",
    title: "LumenSeed - Medical Report Translator | Pavitra Kushwaha",
    description:
      "medical report translator. turns clinical jargon into clear language anyone can read. Won 1st at Techfest IIT Bombay SparkX.",
    siteName: "Pavitra Kushwaha",
  },
  twitter: {
    card: "summary_large_image",
    site: "@pavikshw",
    creator: "@pavikshw",
    title: "LumenSeed | Pavitra Kushwaha",
    description:
      "medical report translator using OCR, UMLS entity linking, LangChain RAG with Weaviate. Won 1st at Techfest IIT Bombay SparkX.",
  },
  alternates: { canonical: "https://pavitrakushwaha.dev/projects/lumenseed" },
};

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "LumenSeed - Medical Report Translator for Patients",
  description:
    "medical report translator that turns clinical jargon into clear language. Uses OCR, UMLS entity linking, LangChain RAG, and PII-stripping. Won 1st at Techfest IIT Bombay SparkX.",
  author: {
    "@type": "Person",
    name: "Pavitra Kushwaha",
    url: "https://pavitrakushwaha.dev",
  },
  publisher: {
    "@type": "Person",
    name: "Pavitra Kushwaha",
    url: "https://pavitrakushwaha.dev",
  },
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": "https://pavitrakushwaha.dev/projects/lumenseed",
  },
  keywords: "LumenSeed, medical AI, healthcare NLP, Techfest IIT Bombay, Pavitra Kushwaha",
  inLanguage: "en-IN",
};

export default function LumenSeedPage() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <Link href="/projects" className="back-link">
        ← projects
      </Link>

      <span className="mono muted" style={{ display: "block", marginBottom: "0.6em" }}>
        2024 &middot; Healthcare AI
      </span>

      <h1 style={{ fontSize: "1.8em", marginBottom: "0.8em", lineHeight: 1.3 }}>
        LumenSeed
      </h1>

      <p className="muted" style={{ fontSize: "0.9em", fontStyle: "italic", marginBottom: "1.8em" }}>
        medical report translator. turns clinical jargon into clear language anyone can read.
      </p>

      <PostChrome />

      <div className="post-body">
        <p>lab reports are compact because doctors already know the vocabulary. everyone else gets a page of abbreviations, reference ranges, and one highlighted value that sends them into the worst search result on the internet.</p>

        <p>lumenseed turns that report into a plain-language walkthrough. each explanation stays tied to the original test, the range printed by the lab, and the line it came from. it also collects the questions worth carrying into the next appointment.</p>

        <p>Won <strong>1st place at SparkX, Techfest IIT Bombay</strong>, the annual science and technology festival of IIT Bombay, one of India&apos;s largest tech fests.</p>

        <h2 style={{ fontSize: "1.1em", fontWeight: 600, marginTop: "1.5em", marginBottom: "0.6em" }}>inside the report</h2>

        <p>digital pdfs go through structured text extraction, while scanned pages use ocr with hindi and english language packs. layout matters here: a test name, value, unit, and reference range may sit in four columns, and flattening them in the wrong order can change the meaning before a model sees anything.</p>

        <p>the parser rebuilds those rows into a small schema and keeps section boundaries for panels such as cbc, liver function, thyroid, radiology findings, and impressions. extracted terms can then be linked to clinical vocabularies and retrieved definitions without losing the exact wording on the page.</p>

        <p>retrieval pulls explanations from curated medical references and ranks them against the report section. the generation step receives the original row, its surrounding text, and the retrieved definition. the answer carries that provenance forward so a reader can move from the explanation back to the document.</p>

        <p>confidence follows the extraction and retrieval path. an unreadable scan, a missing unit, or a weak terminology match lowers it and pushes the test into a review list. clinical decisions stay with the doctor; lumenseed&apos;s job is to make the report legible enough for a better conversation.</p>

        <h2 style={{ fontSize: "1.1em", fontWeight: 600, marginTop: "1.5em", marginBottom: "0.6em" }}>privacy</h2>

        <p>medical data gets a short path through the system. names, patient ids, doctors, and hospital identifiers are redacted before the explanation stage, and the uploaded report is discarded after the result is built. your city name is apparently fair game, so that one{" "}
          <Link href="/visits" className="easter-quiet" title="hipaa who">
            still gets roasted publicly
          </Link>
          .</p>

        <p style={{ marginTop: "1.5em" }}>
          <a
            href="https://lumenseedai.web.app"
            target="_blank"
            rel="noopener noreferrer"
            className="mono"
            style={{ fontSize: "0.82em" }}
          >
            lumenseedai.web.app ↗
          </a>
        </p>
      </div>

      <SiteFooter
        links={<Link href="/projects">projects</Link>}
      />
    </main>
  );
}
