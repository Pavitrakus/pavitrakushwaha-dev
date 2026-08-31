import Link from "next/link";
import { SiteFooter } from "@/components/SiteFooter";
import { VivacitySim } from "@/components/VivacitySim";
import { FeaturedCards } from "@/components/FeaturedCards";

/* ── inline SVG social icons ── */
const XIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"
    style={{ display: "inline", verticalAlign: "-0.1em", marginRight: "0.2em" }}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.261 5.632zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);
const GithubIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"
    style={{ display: "inline", verticalAlign: "-0.1em", marginRight: "0.2em" }}>
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
  </svg>
);
const LinkedinIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"
    style={{ display: "inline", verticalAlign: "-0.1em", marginRight: "0.2em" }}>
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C0 .774 23.2 0 22.222 0h.003z" />
  </svg>
);
const InstagramIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"
    style={{ display: "inline", verticalAlign: "-0.1em", marginRight: "0.2em" }}>
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
  </svg>
);

/* ── small inline logo image ── */
const Logo = ({
  src,
  rounded = true,
  className,
  style: extraStyle,
}: {
  src: string;
  alt: string;
  rounded?: boolean;
  className?: string;
  style?: React.CSSProperties;
}) => (
  <img
    src={src}
    alt=""
    aria-hidden="true"
    className={["home-mark", "inline-mark", className].filter(Boolean).join(" ")}
    style={{
      display: "inline-block",
      width: "1em",
      height: "1em",
      objectFit: "cover",
      verticalAlign: "-0.2em",
      marginRight: "0.22em",
      borderRadius: rounded ? "3px" : "0",
      ...extraStyle,
    }}
  />
);

/* ── favicon from a domain (uses Google's favicon service) ── */
const Favicon = ({ domain }: { domain: string; alt: string }) => (
  <img
    src={`https://www.google.com/s2/favicons?sz=64&domain=${domain}`}
    alt=""
    aria-hidden="true"
    className="home-mark inline-mark"
    style={{
      display: "inline-block",
      width: "1.05em",
      height: "1.05em",
      objectFit: "contain",
      verticalAlign: "-0.2em",
      marginRight: "0.22em",
      borderRadius: "3px",
    }}
  />
);

export default function Home() {
  return (
    <main>
      {/* ── top nav ── */}
      <nav className="top-nav">
        <Link href="/work">Work</Link>
        <span className="top-nav-sep">/</span>
        <Link href="/blog">Writing</Link>
        <span className="top-nav-sep">/</span>
        <Link href="/projects">Projects</Link>
      </nav>

      <h1>Hey, I&apos;m Pavitra.</h1>

      <p>
        i&apos;m 16, founder of{" "}
        <a href="https://tryvivacity.com" target="_blank" rel="noopener noreferrer">
          <Favicon domain="tryvivacity.com" alt="Vivacity" />
          Vivacity
        </a>
        , a company building an executable simulation runtime for AI agents.
        research fellow at{" "}
        <a href="https://www.iitk.ac.in/" target="_blank" rel="noopener noreferrer">
          <Logo src="/iitk-logo.jpg" alt="IIT Kanpur" />
          IIT Kanpur
        </a>
        .
      </p>

      <p>
        class 3 was animations. class 5 was the first real line of code. it
        turned into companies, papers, a stretch with{" "}
        <a href="https://www.nvidia.com/en-us/research/" target="_blank" rel="noopener noreferrer">
          <Favicon domain="nvidia.com" alt="NVIDIA" />
          NVIDIA Research
        </a>
        , and too many hackathons. most days i&apos;m trying to understand
        intelligence well enough to leave a dent.{" "}
        <Link href="/blog/how-it-started">how it all started →</Link>
      </p>

      <p className="social-links">
        <a href="https://x.com/pavikshw" target="_blank" rel="noopener me noreferrer">
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
        <a href="https://cal.com/pavitrakushwaha" target="_blank" rel="noopener me noreferrer" className="social-cal">
          30 minutes. direct with me. cal.com/pavitrakushwaha
        </a>
      </p>

      <section className="home-section home-vivacity" aria-labelledby="vivacity-home-title">
        <header className="section-head">
          <h2 id="vivacity-home-title">Vivacity</h2>
          <span className="mono section-meta">example 001</span>
        </header>
        <p className="section-kicker">
          a two-body world an agent can inspect, kick, and fork. not a product api.
        </p>
        <VivacitySim mode="compact" />
        <p className="home-vivacity-link">
          <Link href="/projects/vivacity">inside the runtime →</Link>
        </p>
      </section>

      <section className="home-section" aria-labelledby="work-home-title">
        <h2 id="work-home-title">What I&apos;ve been up to</h2>

        <ul className="home-work">
        <li>
          worked with{" "}
          <Link href="/work/nvidia-augonnet" className="work-row">
            <Favicon domain="nvidia.com" alt="NVIDIA" />
            Cédric Augonnet at NVIDIA Research
            <span className="work-arrow" aria-hidden="true">→</span>
          </Link>
          , around programming systems and accelerator runtimes
        </li>

        <li>
          contributed to{" "}
          <Link href="/work/openai-codex" className="work-row">
            <Favicon domain="openai.com" alt="OpenAI" />
            OpenAI Codex OSS
            <span className="work-arrow" aria-hidden="true">→</span>
          </Link>
          , the terminal agent with a real tool and approval loop
        </li>

        <li>
          got an{" "}
          <Link href="/work/inflection" className="work-row">
            <Favicon domain="edgecity.live" alt="Inflection Grants" />
            Inflection Grant
            <span className="work-arrow" aria-hidden="true">→</span>
          </Link>
          . $2k from the pool funded by Jensen Huang&apos;s $960k jacket.
          hwahwhahwa
        </li>

        <li>
          research fellow at{" "}
          <Link href="/work/iitk-mpc" className="work-row">
            <Logo src="/iitk-logo.jpg" alt="IIT Kanpur" />
            IIT Kanpur
            <span className="work-arrow" aria-hidden="true">→</span>
          </Link>
          , working on mpc and cryptography under{" "}
          <a href="https://avadapal.github.io/" target="_blank" rel="noopener noreferrer">
            Prof. Adithya Vadapalli
          </a>{" "}
          in cse
        </li>

        <li>
          cofounder and cpo of{" "}
          <Link href="/work/vivacity" className="work-row">
            <Favicon domain="tryvivacity.com" alt="Vivacity" />
            Vivacity
            <span className="work-arrow" aria-hidden="true">→</span>
          </Link>
          , working on product, pipelines, and the runtime contract
        </li>

        <li>
          organized{" "}
          <Link href="/work/execron" className="work-row">
            <Logo src="/byteforge-logo.jpg" alt="byteforge" />
            Execron 1.0
            <span className="work-arrow" aria-hidden="true">→</span>
          </Link>{" "}
          under byteforge at IIT Kanpur: 290+ builders, 24 hours, $75k in
          prizes and credits plus $2k cash
        </li>

        <li>
          engineer at{" "}
          <Link href="/work/prolearn" className="work-row">
            <Logo
              src="/prolearn-logo.svg"
              alt="Prolearn"
              className="invert-on-dark wordmark"
              rounded={false}
              style={{ objectFit: "contain", width: "auto", height: "0.92em" }}
            />
            <span className="work-arrow" aria-hidden="true">→</span>
          </Link>
          . worked with{" "}
          <a href="https://www.linkedin.com/in/ravneetsk" target="_blank" rel="noopener noreferrer">
            Ravneet Singh
          </a>{" "}
          (ex{" "}
          <a href="https://www.vedantu.com/" target="_blank" rel="noopener noreferrer">
            Vedantu
          </a>{" "}
          director of technology, founder of{" "}
          <a href="https://www.linkedin.com/company/fc-one" target="_blank" rel="noopener noreferrer">
            FC.ONE
          </a>
          )
        </li>

        <li>
          built two 8kg combat robots and won a match at{" "}
          <Link href="/work/techfest-robowars" className="work-row">
            <Logo src="/techfest-logo.jpg" alt="Techfest IIT Bombay" />
            international Robowars, Techfest IIT Bombay
            <span className="work-arrow" aria-hidden="true">→</span>
          </Link>
          . shoutout tanish
        </li>
      </ul>

      <p className="home-more">
        <Link href="/work">see everything I&apos;ve done →</Link>
        <span className="muted">
          15+ hackathons, u2u, yc, vibecon, two bounties, byteforge,
          the synthetic intelligence paper, and kuku live there
        </span>
      </p>
      </section>

      <section className="home-section" aria-labelledby="built-home-title">
        <h2 id="built-home-title">Things I&apos;ve built</h2>
        <p className="section-kicker">side projects, sitting next to the company.</p>
        <ul className="home-projects">
          <li>
            <Link href="/projects/orca">
              <Logo src="/orca-logo.jpg" alt="ORCA" />
              ORCA
            </Link>
          </li>
          <li>
            <Link href="/projects/bucket">
              <Favicon domain="brokebucket.com" alt="Bucket" />
              Bucket
            </Link>
          </li>
          <li>
            <Link href="/projects/whocodedmore">
              <Logo
                src="/whocodedmore-logo.png"
                alt="WhoCodedMore"
                rounded={false}
                style={{ objectFit: "contain" }}
              />
              WhoCodedMore
            </Link>
          </li>
          <li>D2AR</li>
          <li>ORBIS 2045</li>
          <li>LumenSeed</li>
          <li>ClusterOrch-Gym</li>
          <li>
            <Link href="/projects">and more</Link>
          </li>
        </ul>
      </section>

      <section className="home-section" aria-labelledby="notes-home-title">
        <h2 id="notes-home-title">Notes and writing</h2>
        <p className="section-kicker">
          when a day is worth keeping, i put it in{" "}
          <Link href="/notes">notes</Link>
          . the longer pieces stay in <Link href="/blog">writing</Link>.
        </p>
        <FeaturedCards />
      </section>

      <p className="home-close">
        most days are split between the vivacity runtime, mpc papers, and
        whatever broke after midnight. if one of those sounds like your
        problem, send it to{" "}
        <a href="mailto:pavitra@paxus.in">pavitra@paxus.in</a>
        . everything else, find me on{" "}
        <a href="https://x.com/pavikshw" target="_blank" rel="noopener noreferrer">
          x @pavikshw
        </a>
        . i reply to interesting things.
      </p>

      <SiteFooter
        showHome={false}
        links={
          <a href="/Pavitra_Kushwaha_Resume_Full.pdf" target="_blank" rel="noopener noreferrer">
            resume
          </a>
        }
      />
    </main>
  );
}
