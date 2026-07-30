import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "LumenSeed | Pavitra Kushwaha",
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
    site: "@Pavitra_Kushwah",
    creator: "@Pavitra_Kushwah",
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

      <div className="post-body">
        <p>Whenever you get a medical report back from a lab, it is written entirely in dense jargon meant for doctors. If you try to search for the terms online, you usually end up reading extreme diagnosis threads and panicking. Most patients have no idea what their own health data means, which is a massive communication gap.</p>

        <p>LumenSeed translates medical reports into clear, friendly language that anyone can read. It doesn&apos;t give medical advice. It just explains what the terms mean, what the normal ranges are, and what questions you should actually ask your doctor during your next visit.</p>

        <p>Won <strong>1st place at SparkX, Techfest IIT Bombay</strong> &mdash; the annual science and technology festival of IIT Bombay, one of India&apos;s largest tech fests.</p>

        <h2 style={{ fontSize: "1.1em", fontWeight: 600, marginTop: "1.5em", marginBottom: "0.6em" }}>Architecture</h2>

        <p><strong>1. PDF Ingestion</strong><br />
        OCR fallback for scanned reports using Tesseract with Hindi and English language packs. Text extraction for digital PDFs via PyMuPDF. The ingestion layer handles multi-page reports, mixed layouts, and embedded tables. Reports are classified by type (blood test, radiology, pathology, etc.) for downstream processing.</p>

        <p><strong>2. Semantic Chunking</strong><br />
        Semantic boundary detection splits the report into logical sections. Rather than naive token-count splitting, the system uses embedding similarity to detect topic shifts: when a paragraph&apos;s embedding diverges from the running section centroid, a new chunk begins. This preserves clinical coherence within each chunk.</p>

        <p><strong>3. Entity Linking</strong><br />
        Extracted terms are mapped to UMLS (Unified Medical Language System) ontologies. UMLS integrates over 200 biomedical vocabularies including SNOMED CT, ICD-10, LOINC, and RxNorm. Each term gets a CUI (Concept Unique Identifier) that disambiguates acronyms: &ldquo;RA&rdquo; maps to Rheumatoid Arthritis, not Right Atrium, based on surrounding context.</p>

        <p><strong>4. Retrieval</strong><br />
        LangChain RAG pipeline pulls reference definitions from verified medical dictionaries stored in a Weaviate vector database. The retrieval layer is hybrid: dense embeddings (PubMedBERT) for semantic similarity combined with sparse BM25 for keyword precision. Retrieved passages are reranked by a cross-encoder before being passed to the generation stage.</p>

        <p><strong>5. Generation</strong><br />
        Fine-tuned LLM writes the summary with a strict tone classifier enforcing human, calming output. The classifier checks every generated sentence against a trained tone model that penalizes alarmist language (&ldquo;you may have cancer&rdquo;), unsupported inferences, and overly technical phrasing. Output is constrained to read like a calm, knowledgeable friend explaining test results.</p>

        <p><strong>6. Confidence Scoring</strong><br />
        Each explanation gets a reliability score so patients know how trustworthy the information is. The score combines: (a) retrieval relevance from the vector DB, (b) semantic alignment between the question and the generated answer, and (c) a calibrated uncertainty estimate from the LLM&apos;s output logits. Low-confidence explanations flag the user to verify with their doctor.</p>

        <h2 style={{ fontSize: "1.1em", fontWeight: 600, marginTop: "1.5em", marginBottom: "0.6em" }}>Privacy-First Design</h2>

        <p>Medical data is incredibly sensitive. The system runs on local-first principles wherever possible, stripping out PII (personally identifiable information) before any text gets processed by the inference layer. Name, age, patient ID, doctor name, and hospital identifiers are detected using a combination of regex patterns and a fine-tuned NER model, then replaced with anonymized tokens before the text reaches the RAG or generation stages. The original report is never stored or transmitted.</p>
      </div>

      <footer>
        <span>&copy; {new Date().getFullYear()} pavitra kushwaha</span>
        <Link href="/">home</Link>
        <Link href="/projects">projects</Link>
      </footer>
    </main>
  );
}
