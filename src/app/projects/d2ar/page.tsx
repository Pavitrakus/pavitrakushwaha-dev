import type { Metadata } from "next";
import Link from "next/link";
import { PostChrome } from "@/components/PostChrome";
import { SiteFooter } from "@/components/SiteFooter";


export const metadata: Metadata = {
  title: "D2AR",
  description:
    "systematic benchmark comparing 8 language models (4 diffusion, 4 auto-regressive) on Hindi NLP tasks. published research, open-source evaluation framework. BLEU, ROUGE-L, BERTScore, perplexity metrics across sentiment analysis, NER, QA, and text summarization.",
  keywords: [
    "D2AR Hindi NLP",
    "diffusion vs auto-regressive",
    "Hindi language model benchmark",
    "Pavitra Kushwaha D2AR",
    "Hindi NLP research",
    "Diffusion-LM Hindi",
    "GPT-NeoX Hindi",
    "BLOOM Hindi evaluation",
    "Hindi sentiment analysis",
    "Hindi NER",
    "Hindi question answering",
    "Hindi text summarization",
  ],
  openGraph: {
    type: "article",
    url: "https://pavitrakushwaha.dev/projects/d2ar",
    title: "D2AR - Diffusion vs Auto-Regressive Hindi NLP Benchmark | Pavitra Kushwaha",
    description:
      "systematic benchmark comparing 8 language models on Hindi NLP tasks. published research paper, open-source evaluation framework.",
    siteName: "Pavitra Kushwaha",
  },
  twitter: {
    card: "summary_large_image",
    site: "@pavikshw",
    creator: "@pavikshw",
    title: "D2AR | Pavitra Kushwaha",
    description:
      "systematic benchmark comparing 8 language models (4 diffusion, 4 auto-regressive) on Hindi NLP tasks.",
  },
  alternates: { canonical: "https://pavitrakushwaha.dev/projects/d2ar" },
};

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "ScholarlyArticle",
  headline: "D2AR - Diffusion vs Auto-Regressive: A Systematic Benchmark for Hindi NLP",
  description:
    "systematic benchmark comparing 8 language models (4 diffusion, 4 auto-regressive) on Hindi NLP tasks. published research, open-source evaluation framework.",
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
    "@id": "https://pavitrakushwaha.dev/projects/d2ar",
  },
  keywords: "Hindi NLP, diffusion models, auto-regressive, benchmark, Pavitra Kushwaha",
  inLanguage: "en-IN",
};

export default function D2ARPage() {
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
        2024 &middot; Research / NLP
      </span>

      <h1 style={{ fontSize: "1.8em", marginBottom: "0.8em", lineHeight: 1.3 }}>
        D2AR
      </h1>

      <p className="muted" style={{ fontSize: "0.9em", fontStyle: "italic", marginBottom: "1.8em" }}>
        Diffusion vs Auto-Regressive: a systematic benchmark for Hindi NLP.
      </p>

      <PostChrome />

      <div className="post-body">
        <p>d2ar started with a question i could not find a clean answer to: what happens when discrete diffusion language models meet hindi, especially the code-mixed hindi people actually type? i compared eight models across sentiment, named entities, question answering, and summarization, then published the paper and evaluation code.</p>

        <h2 style={{ fontSize: "1.1em", fontWeight: 600, marginTop: "1.5em", marginBottom: "0.6em" }}>the benchmark</h2>

        <p>the data path normalizes devanagari and romanized hindi, keeps hinglish samples visible, and uses matched splits across news, social, formal, and conversational text. every model sees the same task instructions and output schema so a nicer prompt cannot quietly become the result.</p>

        <p>classification and extraction use task-specific accuracy and f1. generation gets bleu, rouge-l, and multilingual bertscore, with confidence intervals over the same examples. i kept raw predictions next to the aggregate scores because hindi failures hide inside case marking, gender agreement, compound verbs, and entity boundaries long before one average number admits it.</p>

        <h2 style={{ fontSize: "1.1em", fontWeight: 600, marginTop: "1.5em", marginBottom: "0.6em" }}>the models</h2>

        <p><strong>auto-regressive:</strong> gpt-neox, opt, and bloom variants. each token conditions on the prefix and arrives left to right through causal attention.</p>

        <p><strong>discrete diffusion:</strong> diffusion-lm, mdlm, sedd, and plm-discrete. generation happens through iterative denoising, which gives the model bidirectional context while it repairs a sequence.</p>

        <h2 style={{ fontSize: "1.1em", fontWeight: 600, marginTop: "1.5em", marginBottom: "0.6em" }}>what moved</h2>

        <p>diffusion models stayed closer on summarization and other open generation tasks. the gap widened on structured outputs such as named entities and sentiment, where morphology, ordering, and a strict label schema punish a locally plausible repair. the error sheets were more useful than the leaderboard because they showed where each architecture lost the sentence.</p>

        <p>The full paper, dataset splits, and evaluation code are available on GitHub. if you actually read this far you&apos;re either a researcher or a stalker.{" "}
          <Link href="/visits" className="easter-quiet" title="diffusion of responsibility">
            pick a lane
          </Link>
          .</p>

        <p style={{ marginTop: "1.5em" }}>
          <a
            href="https://github.com/Pavitrakus/D2AR-diffusion-vs-ar-hindi-nlp"
            target="_blank"
            rel="noopener noreferrer"
            className="mono"
            style={{ fontSize: "0.82em" }}
          >
            github.com/Pavitrakus/D2AR-diffusion-vs-ar-hindi-nlp ↗
          </a>
        </p>
      </div>

      <SiteFooter
        links={<Link href="/projects">projects</Link>}
      />
    </main>
  );
}
