import type { Metadata } from "next";
import Link from "next/link";
import { PostChrome } from "@/components/PostChrome";
import { SiteFooter } from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "how it all started",
  description:
    "Kanpur, a first computer, ORCA, quitting the JEE track, Bangalore, and how that hunger became Vivacity.",
  openGraph: {
    type: "article",
    url: "https://pavitrakushwaha.dev/blog/how-it-started",
    title: "how it all started | Pavitra Kushwaha",
    description:
      "Kanpur, a first computer, ORCA, quitting the JEE track, and the path into Vivacity.",
    siteName: "Pavitra Kushwaha",
  },
  twitter: {
    card: "summary",
    site: "@pavikshw",
    creator: "@pavikshw",
    title: "how it all started | Pavitra Kushwaha",
    description:
      "Kanpur, a first computer, ORCA, quitting the JEE track, and the path into Vivacity.",
  },
  alternates: { canonical: "https://pavitrakushwaha.dev/blog/how-it-started" },
};

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "how it all started",
  author: {
    "@type": "Person",
    name: "Pavitra Kushwaha",
    url: "https://pavitrakushwaha.dev",
  },
  datePublished: "2026-09-01",
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": "https://pavitrakushwaha.dev/blog/how-it-started",
  },
};

export default function HowItStartedPage() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <Link href="/blog" className="back-link">
        ← writing
      </Link>

      <span className="mono muted" style={{ display: "block", marginBottom: "0.6em" }}>
        2026
      </span>

      <h1 style={{ fontSize: "1.8em", marginBottom: "0.8em", lineHeight: 1.3 }}>
        how it all started
      </h1>

      <p className="muted" style={{ fontSize: "0.9em", fontStyle: "italic", marginBottom: "1.8em" }}>
        kanpur, a spaceship that would not stop exploding, and the machine i
        wanted on the night electrostatics would not yield
      </p>

      <PostChrome path="/blog/how-it-started" />

      <div className="post-body">
        <p>
          i am pavitra kushwaha. 16. i live mostly in kanpur, at dps azad
          nagar, and a few weeks each year dissolve into delhi or bangalore
          when the work is louder than school.
        </p>

        <p>
          i fell in love with my first computer in class four, in the most
          literal sense of the phrase. the next year and a half i spent
          making crude games in scratch out of an amateur cs book, the
          kind you play at dinner and refuse to shut down. my mother
          thought i slept at regular hours. fifteen days later i walked into
          the school techno fair with a spaceship game i could not seem to
          finish blowing up, competing with class eight, and came home with
          first prize. i still do not know what happened in those days.
          something in my chest knew my life had found its gravity.
        </p>

        <p>
          html in class five. python after that. java by class eight. covid
          lockdown, class six for me, was boredom for a lot of people. mine
          was a private room of coding until my eyes burned. by class eight
          i had a fitness tracker on the play store, politely reviewed by
          my parents, which nobody else had the patience to try. cute
          projects die cute deaths when the world does not need your
          gravity.
        </p>

        <p>
          class ten, 2024. i watched my grandparents fall in love with
          facebook reels until they needed a cab or groceries, and the phone
          became a tool of frustration. i built orca so they could talk to
          whatsapp in natural language and pull the daily problems out of
          the glass. that season was competitions, cold emails to
          researchers, and the adolescent need to prove i existed. some of
          it was hunger. some of it was vanity. i am not ashamed of either.
          orca taught me i could build products with actual teeth. once i
          tasted that, i went back to my own bones.
        </p>

        <p>
          class eleven was jee. when a problem resisted my mind i did not
          want another chatbot, or a forty minute lecture that only
          half-addressed the stuck point. i wanted a diagram that moved. the
          step that makes a synapse fire. the step no teacher had been able
          to produce the night i wrestled electrostatics in vain. i left the
          jee track. if the video did not exist at the price and quality a
          student could afford, i would build the machine that made it. i
          was the right person in the most prosaic sense: i was the student
          who needed the machine most. that machine became vivacity.
        </p>

        <p>
          last summer i boarded a plane to bangalore with friends and a
          half-serious bag of clothes, because staying in kanpur felt like
          a form of cowardice. we had two proud days sleeping at a shell
          petrol pump with laptops on our laps after a hackathon, waiting
          for prize money to clear. it was ridiculous. i would do it again.
          with help from pratham pengoria i met ravneet singh of prolearn,
          who let three rowdy teenagers waste his time after security took
          exception to us. he roasted our thinking, then hired me onto their
          video pipeline when we came back with demos. i work with him on
          stipend and credit, which is not enough to offset engine costs,
          and is heartening anyway. we have early conversations,
          walkthroughs, competition noise. i work with aditya bhatia and
          tanish anand. i am the contact person for most of this.
        </p>

        <p>
          hard exams are good for serious children, even when they feel
          cruel in the moment. indian families already invest years in jee
          and neet. the fashionable argument that these exams are meaningless
          is one i have always resisted. the pressure is unhealthy. coaching
          is predatory. difficult problems are still a real filter for the
          kinds of minds that want to do physics and math. what gets me up
          is simpler. a lot of people need those filters and do not have
          access to the kind of explanation that makes vertical learning
          possible, especially on the specific problem that has them stuck.
        </p>

        <p>
          a lot of money in ai video went toward looking like a movie.
          photoreal rooms. cinematic light. minutes of waiting for a clip.
          when an agent reasons, i want the visual to arrive the way text
          arrives: in the same tab, at the speed of the model, frame by
          frame as the thought happens.
        </p>

        <p>
          conventional video generation paints heavy rgb grids on
          industrial clusters. that architecture is slow in a browser, and
          slow next to a language model. the thing i kept turning over was
          treating a visual the way a browser treats a page: a stream of
          light primitives and scene instructions the client draws locally.
          webgpu in the tab. skip the frames that have not changed. keep
          the model small enough for the memory a chrome tab actually has. a
          channel you watch unfold. coordinated diagrams, narrated steps,
          spatial reasoning made visible.
        </p>

        <p>
          vivacity started as that hunger for moving explanations. cheap
          enough to call, exact enough to trust, in english, hindi, and
          hinglish, because that is how this country actually speaks. the
          research went further down. the thing we are building now is an
          executable world. an agent can inspect state, act, simulate,
          fork a few futures, verify, and commit. the orbital workbench on
          this site is a local example of that loop, running in your
          browser, with no production api hiding behind it. just the verbs.
        </p>

        <p>
          if you believe in trajectory shifts, this is the one i am on.
        </p>
      </div>

      <SiteFooter
        links={
          <>
            <Link href="/blog">writing</Link>
            <Link href="/projects/vivacity">vivacity</Link>
          </>
        }
      />
    </main>
  );
}
