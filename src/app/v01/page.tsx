import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "v01 — 2025 | Pavitra Kushwaha",
  description:
    "The original 2025 version of pavitrakushwaha.dev — preserved as a time capsule.",
  robots: "noindex",
};

export default function V01Page() {
  return (
    <>
      {/* Archive banner */}
      <div
        style={{
          background: "#111",
          color: "#fff",
          padding: "0.7em 1.4em",
          fontSize: "0.8em",
          fontFamily: "'JetBrains Mono', monospace",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "1em",
          flexWrap: "wrap",
          position: "sticky",
          top: 0,
          zIndex: 100,
        }}
      >
        <span>
          📦 <strong>v01 — 2025</strong>&nbsp;&nbsp;an archived version of the
          site. things were different back then.
        </span>
        <Link
          href="/"
          style={{
            color: "#d9ff57",
            textDecoration: "none",
            fontWeight: 600,
            whiteSpace: "nowrap",
            borderBottom: "1px solid #d9ff57",
            paddingBottom: "1px",
          }}
        >
          ← back to v02
        </Link>
      </div>

      <div
        style={{
          fontFamily:
            "'Fraunces', 'Playfair Display', Georgia, serif",
          background: "#fff",
          color: "#1a1a1a",
          minHeight: "100vh",
        }}
      >
        {/* ── About ── */}
        <section
          style={{
            maxWidth: "900px",
            margin: "0 auto",
            padding: "5rem 2rem 2rem",
          }}
        >
          <h1
            style={{
              fontSize: "2.5rem",
              fontWeight: 700,
              marginBottom: "1.5rem",
            }}
          >
            Hey there!
          </h1>

          <div
            style={{
              fontSize: "1.2rem",
              lineHeight: 1.75,
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
            }}
          >
            <p>
              I&apos;m <strong>Pavitra Kushwaha</strong>, a builder,{" "}
              <a
                href="https://www.stanford.edu/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#8C1515", fontWeight: 700 }}
              >
                wannabe Stanford guy
              </a>
              , and currently at{" "}
              <a
                href="https://dpskalyanpur.com/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#16a34a", fontWeight: 700 }}
              >
                DPS
              </a>
              .
            </p>

            <p>
              I&apos;m obsessed with understanding intelligence — how to build
              it, accelerate it, and eventually define it. Founder of{" "}
              <strong>PaXus</strong> and{" "}
              <a
                href="https://byteforge.space"
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontWeight: 700, color: "#000" }}
              >
                byteforge
                <span style={{ color: "#39FF14", fontWeight: 900 }}>.</span>
              </a>{" "}
              My ultimate goal is to build something that dents Silicon Valley.
            </p>

            <p>
              For fun, I break APIs, win hackathons, write about 2045, do
              research on the{" "}
              <a
                href="https://www.simulation-argument.com/simulation.pdf"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#B07D54", fontWeight: 700 }}
              >
                Simulation Hypothesis
              </a>
              , and go on long bike rides.
            </p>

            <div
              style={{
                marginTop: "1.5rem",
                borderLeft: "2px solid #e5e7eb",
                paddingLeft: "1rem",
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
              }}
            >
              <div>
                <span
                  style={{
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    color: "#16a34a",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  Now
                </span>
                <div>
                  Building ORCA — agentic AI for Android via WhatsApp/Telegram
                </div>
                <div>
                  Researching MPC/Cryptography with{" "}
                  <a
                    href="https://scholar.google.com/citations?user=jeOME6wAAAAJ&hl=en"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "#2563eb", fontWeight: 600 }}
                  >
                    Prof. Adithya Vadapalli
                  </a>{" "}
                  @ IIT Kanpur
                </div>
              </div>

              <div>
                <span
                  style={{
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    color: "#9ca3af",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  Did
                </span>
                <div>
                  <strong>byteforge.</strong> · PaXus · Execron · ORBIS
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Highlights ── */}
        <section
          style={{
            maxWidth: "900px",
            margin: "0 auto",
            padding: "1rem 2rem 3rem",
          }}
        >
          <p style={{ fontSize: "1.2rem", color: "#374151", marginBottom: "1.5rem" }}>
            Here are the coolest things I&apos;ve done:
          </p>
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              display: "flex",
              flexDirection: "column",
              gap: "0.9rem",
            }}
          >
            {[
              {
                icon: "🦄",
                content: (
                  <>
                    <strong style={{ color: "#eab308" }}>#1</strong> across
                    3,500+, India&apos;s{" "}
                    <a
                      href="https://uniform2unicorn.polariscampus.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: "#eab308", fontWeight: 700 }}
                    >
                      Top Young Founder of the Year &apos;26
                    </a>{" "}
                    — won ₹1,00,000 + ₹10,00,000 in credits &amp; an exclusive
                    dinner with Iqlipse Nova
                  </>
                ),
              },
              {
                icon: "🎓",
                content: (
                  <>
                    Research Fellow at IIT Kanpur, under{" "}
                    <a
                      href="https://scholar.google.com/citations?user=jeOME6wAAAAJ&hl=en"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: "#2563eb", fontWeight: 600 }}
                    >
                      Prof. Adithya Vadapalli
                    </a>{" "}
                    (CSE Dept.)
                  </>
                ),
              },
              {
                icon: "Y",
                iconBg: "#FF6600",
                content: (
                  <>
                    Got selected for{" "}
                    <a
                      href="https://www.ycombinator.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: "#FF6600", fontWeight: 700 }}
                    >
                      Y Combinator
                    </a>{" "}
                    Startup School India (6% acceptance rate)
                  </>
                ),
              },
              {
                icon: "🏆",
                content: (
                  <>
                    Top 20 builders across India out of 20,000+ applicants at{" "}
                    <a
                      href="https://vibecon.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: "#38bdf8", fontWeight: 700 }}
                    >
                      VIBECON
                    </a>
                  </>
                ),
              },
              {
                icon: "🔒",
                content: (
                  <>
                    Independently identified a significant security vulnerability
                    in a major AI platform — 5-figure bounty
                  </>
                ),
              },
              {
                icon: "🔒",
                content: (
                  <>
                    Discovered a pricing logic vulnerability in a major
                    quick-commerce platform&apos;s API — 6-figure bounty
                  </>
                ),
              },
              {
                icon: "🏗️",
                content: (
                  <>
                    Founded{" "}
                    <a
                      href="https://byteforge.space"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ fontWeight: 700, color: "#000" }}
                    >
                      byteforge
                      <span style={{ color: "#39FF14", fontWeight: 900 }}>.</span>
                    </a>{" "}
                    — one of North India&apos;s largest tech communities (4,500+
                    members)
                  </>
                ),
              },
              { icon: "⚡", content: "Won 15+ hackathons in the last 2 months." },
              {
                icon: "📄",
                content: "Published a research paper on Synthetic Intelligence at 16.",
              },
            ].map((item, i) => (
              <li key={i} style={{ display: "flex", gap: "0.8rem", alignItems: "flex-start", fontSize: "1.1rem" }}>
                <span
                  style={{
                    width: "1.5rem",
                    height: "1.5rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    background: item.iconBg || "transparent",
                    borderRadius: "3px",
                    color: item.iconBg ? "#fff" : "inherit",
                    fontWeight: item.iconBg ? 700 : "inherit",
                    fontSize: item.iconBg ? "0.85rem" : "1rem",
                    marginTop: "0.1rem",
                  }}
                >
                  {item.icon}
                </span>
                <span>{item.content}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* ── Projects grid ── */}
        <section
          style={{
            maxWidth: "900px",
            margin: "0 auto",
            padding: "1rem 2rem 4rem",
          }}
        >
          <h2 style={{ fontSize: "2rem", fontWeight: 700, marginBottom: "0.5rem" }}>
            I Do :)
          </h2>
          <p style={{ fontSize: "1.2rem", color: "#374151", marginBottom: "2rem" }}>
            Here&apos;s a collection of some of my favorite work!
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
              gap: "1.2rem",
            }}
          >
            {[
              { year: "2025", name: "ORCA", desc: "Agentic AI — Android control via WhatsApp/Telegram", img: "/orca.jpg" },
              { year: "2024", name: "D2AR", desc: "Benchmark of 8 Diffusion vs AR language models for Hindi NLP.", img: "/d2ar.jpeg", link: "https://github.com/Pavitrakus/D2AR-diffusion-vs-ar-hindi-nlp/blob/master/README.md" },
              { year: "2025", name: "Execron 1.0 BuildFest", desc: "290+ participant hackathon at IIT Kanpur", img: "/execron.jpg" },
              { year: "2025", name: "ORBIS 2045", desc: "Raspberry Pi + local LLM + ADB phone control device", img: "/orbis.jpeg" },
              { year: "2024", name: "ClusterOrch-Gym", desc: "RL benchmark for AI agents diagnosing GPU failures in clusters.", img: "/ascend3.jpg" },
              { year: "2024", name: "LumenSeed", desc: "GenAI healthcare platform. 1st at Sprakx, IIT Bombay.", img: "/lumenseed.png" },
            ].map((p, i) => {
              const El = p.link ? "a" : "div";
              return (
                <El
                  key={i}
                  href={p.link}
                  target={p.link ? "_blank" : undefined}
                  rel={p.link ? "noopener noreferrer" : undefined}
                  style={{
                    borderRadius: "8px",
                    border: "1px solid rgba(0,0,0,0.15)",
                    overflow: "hidden",
                    position: "relative",
                    height: "220px",
                    display: "block",
                    textDecoration: "none",
                    color: "inherit",
                  }}
                >
                  <img
                    src={p.img}
                    alt={p.name}
                    style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
                  />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.6), transparent)" }} />
                  <div
                    style={{
                      position: "absolute",
                      bottom: "0.6rem",
                      left: "0.6rem",
                      right: "0.6rem",
                      background: "rgba(255,255,255,0.95)",
                      borderRadius: "6px",
                      padding: "0.5rem 0.75rem",
                      border: "1px solid rgba(0,0,0,0.12)",
                    }}
                  >
                    <div style={{ fontWeight: 700, fontSize: "1.1rem" }}>{p.name}</div>
                    <div style={{ fontSize: "0.82rem", color: "#555", marginTop: "0.2rem" }}>{p.desc}</div>
                  </div>
                  <div
                    style={{
                      position: "absolute",
                      top: "0.5rem",
                      left: "0.5rem",
                      background: "#fff",
                      borderRadius: "4px",
                      padding: "0.1rem 0.4rem",
                      fontSize: "0.75rem",
                      border: "1px solid #e5e7eb",
                    }}
                  >
                    {p.year}
                  </div>
                </El>
              );
            })}
          </div>
        </section>

        {/* Footer */}
        <div
          style={{
            borderTop: "1px solid #eee",
            padding: "1.5rem 2rem",
            maxWidth: "900px",
            margin: "0 auto",
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.75rem",
            color: "#aaa",
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "0.5em",
          }}
        >
          <span>© 2025 pavitra kushwaha · v01 — the original</span>
          <Link href="/" style={{ color: "#aaa" }}>
            switch to v02 (current) →
          </Link>
        </div>
      </div>
    </>
  );
}
