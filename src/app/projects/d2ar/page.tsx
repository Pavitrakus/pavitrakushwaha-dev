import type { Metadata } from "next";
import Link from "next/link";
import { PostChrome } from "@/components/PostChrome";
import { SiteFooter } from "@/components/SiteFooter";


export const metadata: Metadata = {
  title: "D2AR | Pavitra Kushwaha",
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
    site: "@Pavitra_Kushwah",
    creator: "@Pavitra_Kushwah",
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
        <p>D2AR is the most comprehensive benchmark of diffusion language models for Hindi to date. It evaluates 8 models across 4 Hindi NLP tasks with a rigorous, reproducible evaluation framework. The research was published as a full paper and the evaluation framework is fully open-source.</p>

        <h2 style={{ fontSize: "1.1em", fontWeight: 600, marginTop: "1.5em", marginBottom: "0.6em" }}>The Evaluation Pipeline</h2>

        <p><strong>1. Data Preprocessing</strong><br />
        Transliteration normalization, tokenization (using IndicNLP and HuggingFace tokenizers), and an 80/20 stratified train-test split. The dataset covers four Hindi language tasks balanced for domain diversity: news text, social media, formal documents, and conversational Hindi. Special attention was paid to code-mixed Hindi-English (Hinglish) samples which make up a significant portion of real-world Hindi NLP data.</p>

        <p><strong>2. Zero-Shot Prompting</strong><br />
        All 8 models evaluated on identical prompts across 4 Hindi NLP tasks: sentiment analysis (3-class: positive, negative, neutral), named entity recognition (10 entity types), question answering (extractive and abstractive), and text summarization (3 dataset domains). Each prompt is templated in Hindi with consistent formatting across models to eliminate prompt engineering bias.</p>

        <p><strong>3. Metric Computation</strong><br />
        Four metrics computed per task: BLEU (n-gram precision up to 4-grams), ROUGE-L (longest common subsequence based recall), BERTScore (multilingual variant using mBERT embeddings), and perplexity (causal LM perplexity for auto-regressive models, pseudo-perplexity for diffusion models). Each metric was computed with 95% confidence intervals using bootstrap sampling with 1,000 resamples.</p>

        <p><strong>4. Statistical Significance</strong><br />
        Paired t-tests and bootstrap confidence intervals establish whether performance differences between model classes are statistically meaningful. The bootstrap analysis uses 10,000 resamples per model pair. Results are reported with Bonferroni-corrected p-values to account for multiple comparisons across the 28 model pairs.</p>

        <p><strong>5. Qualitative Error Analysis</strong><br />
        Error taxonomy by task type and model architecture. A random sample of 200 errors per model was manually annotated into 12 error categories (gender agreement errors, case marking errors, compound verb splitting, entity boundary errors, etc.). This qualitative layer reveals failure patterns that aggregate metrics alone would miss.</p>

        <h2 style={{ fontSize: "1.1em", fontWeight: 600, marginTop: "1.5em", marginBottom: "0.6em" }}>Models Benchmarked</h2>

        <p><strong>Auto-Regressive:</strong> GPT-NeoX (20B), OPT (6.7B and 13B), BLOOM (7.1B). these models use causal attention where each token attends only to previous tokens, enabling left-to-right generation with strong sequential reasoning capabilities.</p>

        <p><strong>Diffusion-Based:</strong> Diffusion-LM, MDLM (Masked Diffusion Language Model), SEDD (Score Entropy Discrete Diffusion), PLM-Discrete (Permutation Language Model, Discrete). these models learn the data distribution through iterative denoising rather than autoregressive factorization, allowing bidirectional context but lacking causal attention scaffolding.</p>

        <h2 style={{ fontSize: "1.1em", fontWeight: 600, marginTop: "1.5em", marginBottom: "0.6em" }}>Key Findings</h2>

        <p>Diffusion models showed competitive performance on generation tasks (text summarization: within 2.3% of auto-regressive) but lagged significantly on structured NLP tasks (NER: 14.7% gap, sentiment analysis: 11.2% gap). The architectural reason: diffusion models lack the causal attention scaffolding that auto-regressive models use for sequential reasoning, which becomes critical for morphologically rich languages like Hindi where word order and inflection carry semantic weight.</p>

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
