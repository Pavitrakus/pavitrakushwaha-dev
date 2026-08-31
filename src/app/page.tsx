import Link from "next/link";
import { SiteFooter } from "@/components/SiteFooter";
import { VivacitySim } from "@/components/VivacitySim";

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
    className={className}
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

/* ── favicon from a domain (uses Google's favicon service) ── */
const Favicon = ({ domain }: { domain: string; alt: string }) => (
  <img
    src={`https://www.google.com/s2/favicons?sz=32&domain=${domain}`}
    alt=""
    aria-hidden="true"
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
  return (
    <main>
      {/* ── top nav ── */}
      <nav className="top-nav">
        <Link href="/work">work</Link>
        <span className="top-nav-sep">/</span>
        <Link href="/blog">writing</Link>
        <span className="top-nav-sep">/</span>
        <Link href="/projects">things i&apos;ve built</Link>
      </nav>

      <h1>hey, i&apos;m pavitra.</h1>

      <p>
        i&apos;m 16, cofounder and cpo of{" "}
        <a href="https://tryvivacity.com" target="_blank" rel="noopener noreferrer">
          <Favicon domain="tryvivacity.com" alt="Vivacity" />
          Vivacity
        </a>
        , a research fellow at{" "}
        <a href="https://www.iitk.ac.in/" target="_blank" rel="noopener noreferrer">
          <Logo src="/iitk-logo.jpg" alt="IIT Kanpur" />
          IIT Kanpur
        </a>
        , and somehow still in high school at{" "}
        <a href="https://dpskalyanpur.com/" target="_blank" rel="noopener noreferrer">
          <Logo src="/dps-logo.webp" alt="DPS" />
          DPS
        </a>
        .
      </p>

      <p>
        started making animations in class 3, wrote my first real line of
        code in class 5, and never really stopped. that turned into companies,
        papers, work with{" "}
        <a href="https://www.nvidia.com/en-us/research/" target="_blank" rel="noopener noreferrer">
          <Favicon domain="nvidia.com" alt="NVIDIA" />
          NVIDIA
        </a>{" "}
        Research, and a pile of hackathon wins that&apos;s getting embarrassing
        to count. most days i&apos;m trying to understand intelligence well
        enough to dent{" "}
        <a href="https://www.google.com/search?q=Silicon+Valley" target="_blank" rel="noopener noreferrer">
          Silicon Valley
        </a>
        . for fun: long bike rides, breaking APIs, the{" "}
        <a href="https://www.simulation-argument.com/simulation.pdf" target="_blank" rel="noopener noreferrer">
          simulation hypothesis
        </a>{" "}
        at 3am, and occasionally{" "}
        <Link href="/visits" className="easter-quiet" title="yes i know where you are. chill.">
          reading the room
        </Link>
        .
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
        <a href="https://cal.com/pavitrakushwaha" target="_blank" rel="noopener me noreferrer">
          30 minutes. direct with me. cal.com/pavitrakushwaha
        </a>
      </p>

      <p>what i&apos;ve been up to:</p>

      <ul>
        <li>
          cofounder and cpo of{" "}
          <Link href="/projects/vivacity">
            <Favicon domain="tryvivacity.com" alt="Vivacity" />
            Vivacity
          </Link>
          , working on product, pipelines, and the runtime contract
        </li>

        <li>
          research fellow at{" "}
          <a href="https://www.iitk.ac.in/" target="_blank" rel="noopener noreferrer">
            <Logo src="/iitk-logo.jpg" alt="IIT Kanpur" />
            IIT Kanpur
          </a>
          , working on mpc and cryptography under{" "}
          <a href="https://avadapal.github.io/" target="_blank" rel="noopener noreferrer">
            Prof. Adithya Vadapalli
          </a>{" "}
          in cse
        </li>

        <li>
          worked with{" "}
          <a
            href="https://research.nvidia.com/person/cedric-augonnet"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Favicon domain="nvidia.com" alt="NVIDIA" />
            Cédric Augonnet at NVIDIA Research
          </a>
          , around programming systems and accelerator runtimes
        </li>

        <li>
          contributed to{" "}
          <a href="https://github.com/openai/codex" target="_blank" rel="noopener noreferrer">
            <Favicon domain="openai.com" alt="OpenAI" />
            OpenAI Codex OSS
          </a>
          , the terminal agent with a real tool and approval loop
        </li>

        <li>
          got an{" "}
          <a href="https://www.inflectiongrants.com/" target="_blank" rel="noopener noreferrer">
            <Favicon domain="edgecity.live" alt="Inflection Grants" />
            Inflection Grant
          </a>
          . $2k from the pool funded by Jensen Huang&apos;s $960k jacket.
          hwahwhahwa
        </li>

        <li>
          organized{" "}
          <Link href="/work/execron">
            <Logo src="/byteforge-logo.jpg" alt="byteforge" />
            Execron 1.0
          </Link>{" "}
          under byteforge at IIT Kanpur: 290+ builders, 24 hours, $75k in
          prizes and credits plus $2k cash
        </li>

        <li>
          made technical content with{" "}
          <a href="https://supabase.com" target="_blank" rel="noopener noreferrer">
            <Favicon domain="supabase.com" alt="Supabase" />
            Supabase
          </a>
          , around postgres, auth, storage, and row level security
        </li>

        <li>
          built two 8kg combat robots and won a match at{" "}
          <a href="https://techfest.org/" target="_blank" rel="noopener noreferrer">
            <Logo src="/techfest-logo.jpg" alt="Techfest IIT Bombay" />
            international Robowars, Techfest IIT Bombay
          </a>
          . shoutout tanish
        </li>
      </ul>

      <p>
        <Link href="/work">see everything i&apos;ve done →</Link>
        <span className="muted">
          {" "}prolearn, 15+ hackathons, u2u, yc, vibecon, two bounties,
          byteforge, the synthetic intelligence paper, and kuku live there
        </span>
      </p>

      <section className="home-vivacity" aria-labelledby="vivacity-home-title">
        <p id="vivacity-home-title" className="home-vivacity-title">
          a live world from{" "}
          <Link href="/projects/vivacity">
            <Favicon domain="tryvivacity.com" alt="Vivacity" />
            Vivacity
          </Link>
          . play it, kick it, fork a future
        </p>
        <VivacitySim mode="compact" />
        <p className="home-vivacity-link">
          <Link href="/projects/vivacity">how the runtime works →</Link>
        </p>
      </section>

      <p>
        things i&apos;ve built{" "}
        <span className="muted">(side projects)</span>:{" "}
        <Link href="/projects/orca">
          <Logo src="/orca-logo.jpg" alt="ORCA" />
          ORCA
        </Link>
        ,{" "}
        <Link href="/projects/bucket">
          <Favicon domain="brokebucket.com" alt="Bucket" />
          Bucket
        </Link>
        ,{" "}
        <Link href="/projects/whocodedmore">
          <Logo
            src="/whocodedmore-logo.png"
            alt="WhoCodedMore"
            rounded={false}
            style={{ objectFit: "contain" }}
          />
          WhoCodedMore
        </Link>
        , D2AR, ORBIS 2045, LumenSeed, ClusterOrch-Gym,{" "}
        <Link href="/projects">and more</Link>
      </p>

      <p>
        when a day is worth keeping, i put it in{" "}
        <Link href="/notes">notes</Link>
        . the longer pieces stay in <Link href="/blog">writing</Link>
      </p>

      <p>
        most days are split between the vivacity runtime, mpc papers, and
        whatever broke after midnight. if one of those sounds like your
        problem, send it over
      </p>

      <p>
        building something ambitious? reach me at{" "}
        <a href="mailto:pavitra@paxus.in">pavitra@paxus.in</a>. for everything
        else, find me on{" "}
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
