"use client";

import { useState } from "react";
import Link from "next/link";

/* ── inline SVG social icons ── */
const XIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"
    style={{ display: "inline", verticalAlign: "-0.1em", marginRight: "0.2em" }}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.261 5.632zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);
const GithubIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"
    style={{ display: "inline", verticalAlign: "-0.1em", marginRight: "0.2em" }}>
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
  </svg>
);
const LinkedinIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"
    style={{ display: "inline", verticalAlign: "-0.1em", marginRight: "0.2em" }}>
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);
const InstagramIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"
    style={{ display: "inline", verticalAlign: "-0.1em", marginRight: "0.2em" }}>
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
  </svg>
);

/* ── small inline logo image ── */
const Logo = ({
  src,
  alt,
  rounded = true,
  style: extraStyle,
}: {
  src: string;
  alt: string;
  rounded?: boolean;
  style?: React.CSSProperties;
}) => (
  <img
    src={src}
    alt={alt}
    style={{
      display: "inline",
      width: "1em",
      height: "1em",
      objectFit: "cover",
      verticalAlign: "-0.14em",
      marginRight: "0.22em",
      borderRadius: rounded ? "3px" : "0",
      ...extraStyle,
    }}
  />
);

/* ── YC orange box ── */
const YC = () => (
  <span style={{
    display: "inline-block",
    width: "1em", height: "1em",
    background: "#FF6600", borderRadius: "2px",
    color: "#fff", fontWeight: 700,
    fontSize: "0.7em", lineHeight: "1em",
    textAlign: "center", verticalAlign: "-0.02em",
    marginRight: "0.22em", fontFamily: "sans-serif",
  }}>Y</span>
);

/* ── favicon from a domain (uses Google's favicon service) ── */
const Favicon = ({ domain, alt }: { domain: string; alt: string }) => (
  <img
    src={`https://www.google.com/s2/favicons?sz=32&domain=${domain}`}
    alt={alt}
    style={{
      display: "inline",
      width: "1em",
      height: "1em",
      objectFit: "contain",
      verticalAlign: "-0.14em",
      marginRight: "0.22em",
      borderRadius: "3px",
    }}
  />
);

export default function Home() {
  const [showBounty, setShowBounty] = useState(false);

  return (
    <main>
      {/* ── top nav ── */}
      <nav className="top-nav">
        <Link href="/blog">writing</Link>
        <span className="top-nav-sep">/</span>
        <Link href="/projects">things i&apos;ve built</Link>
      </nav>

      <h1>hey, i&apos;m pavitra.</h1>

      <p>
        i&apos;m a founder, builder, and AI researcher. 16, delhi. high school
        at{" "}
        <a href="https://dpskalyanpur.com/" target="_blank" rel="noopener noreferrer">
          <Logo src="/dps-logo.webp" alt="DPS" />
          DPS
        </a>
        , doing research at{" "}
        <a href="https://www.iitk.ac.in/" target="_blank" rel="noopener noreferrer">
          <Logo src="/iitk-logo.jpg" alt="IIT Kanpur" />
          IIT Kanpur
        </a>
        .
      </p>

      <p>
        started making animations in class 3. wrote my first real line of code
        in class 5, just to understand how something worked. never really
        stopped. somewhere along the way the curiosity turned into companies,
        research papers, and a number of hackathon wins that is getting a little
        embarrassing to keep count of.
      </p>

      <p>
        i&apos;m obsessed with understanding intelligence, how it emerges, how
        to build it, how to accelerate it. i run{" "}
        <a href="https://byteforge.space" target="_blank" rel="noopener noreferrer">
          <Logo src="/byteforge-logo.jpg" alt="byteforge" />
          byteforge<span style={{ color: "#39FF14", fontWeight: 900 }}>.</span>
        </a>{" "}
        and PaXus. the goal is to build something that actually dents{" "}
        <a href="https://www.google.com/search?q=Silicon+Valley" target="_blank" rel="noopener noreferrer">
          Silicon Valley
        </a>
        . working on it.
      </p>

      <p>
        for fun: long bike rides, breaking APIs, and researching the{" "}
        <a href="https://www.simulation-argument.com/simulation.pdf" target="_blank" rel="noopener noreferrer">
          simulation hypothesis
        </a>{" "}
        at unreasonable hours.
      </p>

      <p className="social-links">
        <a href="https://x.com/Pavitra_Kushwah" target="_blank" rel="noopener me noreferrer">
          <XIcon />x
        </a>
        <a href="https://github.com/Pavitrakus" target="_blank" rel="noopener me noreferrer">
          <GithubIcon />github
        </a>
        <a href="https://linkedin.com/in/pavitra-kushwaha/" target="_blank" rel="noopener me noreferrer">
          <LinkedinIcon />linkedin
        </a>
        <a href="https://www.instagram.com/pavitrakuswaha/" target="_blank" rel="noopener me noreferrer">
          <InstagramIcon />instagram
        </a>
        <a href="https://cal.com/pavitrakushwaha" target="_blank" rel="noopener me noreferrer">
          30 minutes. direct with founder. cal.com/pavitrakushwaha
        </a>
      </p>

      <p>what i&apos;ve been up to:</p>

      <ul>
        {/* 1. Prolearn - logo has text built in, no word needed */}
        <li>
          currently building the video pipeline at{" "}
          <a href="https://prolearn.app/" target="_blank" rel="noopener noreferrer">
            <Logo
              src="/prolearn-logo.svg"
              alt="Prolearn"
              rounded={false}
              style={{ width: "auto", height: "1.1em", objectFit: "contain", verticalAlign: "-0.18em" }}
            />
          </a>{" "}
          ($3.2M pre-seed, Bangalore edtech) as an engineer, working with{" "}
          <a href="https://in.linkedin.com/in/ravneetsk" target="_blank" rel="noopener noreferrer">
            Ravneet Singh
          </a>{" "}
          (founder of{" "}
          <a href="https://prolearn.app/" target="_blank" rel="noopener noreferrer">
            Prolearn
          </a>{" "}
          and{" "}
          <a href="https://fc.one" target="_blank" rel="noopener noreferrer">
            FC.one
          </a>
          , former CTO of{" "}
          <a href="https://vedantu.com" target="_blank" rel="noopener noreferrer">
            Vedantu
          </a>
          )
        </li>

        {/* 2. IIT Kanpur research */}
        <li>
          research fellow at{" "}
          <a href="https://www.iitk.ac.in/" target="_blank" rel="noopener noreferrer">
            <Logo src="/iitk-logo.jpg" alt="IIT Kanpur" />
            IIT Kanpur
          </a>
          , working on MPC and cryptography under{" "}
          <a href="https://scholar.google.com/citations?user=jeOME6wAAAAJ&hl=en" target="_blank" rel="noopener noreferrer">
            Prof. Adithya Vadapalli
          </a>{" "}
          (CSE dept.)
        </li>

        {/* 3. U2U */}
        <li>
          ranked <strong>#1</strong> across 3,500+ at{" "}
          <a href="https://uniform2unicorn.polariscampus.com/" target="_blank" rel="noopener noreferrer">
            <Logo src="/u2u-logo.png" alt="Uniform2Unicorn" />
            Uniform2Unicorn
          </a>
          , India&apos;s Top Young Founder of the Year &apos;26. won Rs. 1,00,000
          cash, Rs. 10,00,000 in credits, and an exclusive dinner with{" "}
          <a href="https://www.youtube.com/@IqlipseNova" target="_blank" rel="noopener noreferrer">
            Iqlipse Nova
          </a>{" "}
          <span className="muted">(team: aditya bhatia and tanish anand)</span>
        </li>

        {/* 4. YC */}
        <li>
          selected for{" "}
          <YC />
          <a href="https://www.ycombinator.com" target="_blank" rel="noopener noreferrer">
            Y Combinator
          </a>{" "}
          Startup School India, 6% acceptance rate
        </li>

        {/* 5. VIBECON */}
        <li>
          top 20 builder in India out of 20,000+ at{" "}
          <a href="https://vibecon.com" target="_blank" rel="noopener noreferrer">
            <Logo src="/vibecon-logo.png" alt="VIBECON" />
            VIBECON
          </a>
          , where i also interviewed{" "}
          <a href="https://x.com/mukundjha" target="_blank" rel="noopener noreferrer">
            Mukund Jha
          </a>{" "}
          (Emergent Labs) and{" "}
          <a href="https://www.ycombinator.com/people/jared-friedman" target="_blank" rel="noopener noreferrer">
            Jared Friedman
          </a>{" "}
          (YC partner)
        </li>

        {/* 6. Hackathons with logos */}
        <li>
          won 15+ hackathons in the last 2 months, including ones from{" "}
          <a href="https://ai.google.dev/" target="_blank" rel="noopener noreferrer">
            <Favicon domain="google.com" alt="Google" />
            Google
          </a>
          ,{" "}
          <a href="https://openai.com" target="_blank" rel="noopener noreferrer">
            <Favicon domain="openai.com" alt="OpenAI" />
            OpenAI
          </a>
          , and{" "}
          <a href="https://cursor.com" target="_blank" rel="noopener noreferrer">
            <Favicon domain="cursor.com" alt="Cursor" />
            Cursor
          </a>
        </li>

        {/* 7. Techfest IIT Bombay */}
        <li>
          keynoted{" "}
          <a href="https://techfest.org/" target="_blank" rel="noopener noreferrer">
            <Logo src="/techfest-logo.jpg" alt="Techfest" />
            SparkX at Techfest &apos;25
          </a>{" "}
          (IIT Bombay) and won international robowars 8kg{" "}
          <span className="muted">(shoutout tanish)</span>
        </li>

        {/* 8. Bounties combined */}
        <li>
          independently found two significant security vulnerabilities: one in a
          major AI platform, one in a major quick-commerce platform&apos;s
          pricing API{" "}
          <button
            className="reveal-toggle"
            onClick={() => setShowBounty(!showBounty)}
            title="click to reveal"
          >
            [$]
          </button>
          {showBounty && (
            <span className="muted">
              {" "}a 5-figure and a 6-figure bounty, respectively. their
              engineering teams had mixed feelings.
            </span>
          )}
        </li>

        {/* 9. byteforge */}
        <li>
          founded{" "}
          <a href="https://byteforge.space" target="_blank" rel="noopener noreferrer">
            <Logo src="/byteforge-logo.jpg" alt="byteforge" />
            byteforge<span style={{ color: "#39FF14", fontWeight: 900 }}>.</span>
          </a>
          , one of north India&apos;s largest independent tech communities,
          4,500+ members
        </li>

        {/* 10. Research paper */}
        <li>
          published a research paper on Synthetic Intelligence at 16
        </li>

        {/* 11. KuKu TV */}
        <li>
          former content analyst at{" "}
          <a href="https://kukufm.com" target="_blank" rel="noopener noreferrer">
            KuKu TV
          </a>
        </li>
      </ul>

      <p>
        things i&apos;ve built:{" "}
        <Link href="/projects">
          <Logo src="/orca-logo.jpg" alt="ORCA" />
          ORCA
        </Link>
        , D2AR, ORBIS 2045, LumenSeed, ClusterOrch-Gym,{" "}
        <Link href="/projects">and more</Link>
      </p>

      <p>
        i write sometimes. <Link href="/blog">all writing →</Link>
      </p>

      <p>
        i spend most of my time at the intersection of systems that think and
        systems that scale. if you care about what happens when intelligence
        stops being a feature and starts being infrastructure, the architecture
        decisions, the tradeoffs, the parts that break, we&apos;re probably
        thinking about the same problems.
      </p>

      <p>
        building something ambitious? reach me at{" "}
        <a href="mailto:pavitra@paxus.in">pavitra@paxus.in</a>. for everything
        else, find me on{" "}
        <a href="https://x.com/Pavitra_Kushwah" target="_blank" rel="noopener noreferrer">
          x @Pavitra_Kushwah
        </a>
        . i reply to interesting things.
      </p>

      <footer>
        <span>2026 pavitra kushwaha</span>
        <Link href="/v01">v01 2025</Link>
        <a href="/Pavitra_Kushwaha_Resume_Full.pdf" target="_blank" rel="noopener noreferrer">
          resume
        </a>
      </footer>
    </main>
  );
}
