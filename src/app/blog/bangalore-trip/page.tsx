import type { Metadata } from "next";
import Link from "next/link";
import { PostChrome } from "@/components/PostChrome";
import { SiteFooter } from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "two weeks in bangalore | Pavitra Kushwaha",
  description:
    "Two weeks in Bangalore: won two hackathons, built Vivacity with 3B1B-style Manim animations for JEE/NEET, walked into ProLearn's office without an appointment, and ended up broke at a Shell petrol pump. A story about building things in India's startup capital.",
  keywords: [
    "Pavitra Kushwaha",
    "Bangalore hackathon",
    "Uniform2Unicorn",
    "ProLearn",
    "Vivacity",
    "AIBOOMI",
    "Agent Arena",
    "byteforge",
    "Indian startup story",
    "student builder",
    "IIT Bombay Techfest",
    "edtech India",
    "Manim animation",
    "JEE NEET",
  ],
  openGraph: {
    type: "article",
    url: "https://pavitrakushwaha.dev/blog/bangalore-trip",
    title: "two weeks in bangalore, or, how i ended up sleeping on a petrol pump and still called it productive",
    description:
      "Won two hackathons, built Vivacity, walked into ProLearn without an appointment, and went broke at a Shell petrol pump. Bangalore, June-July 2026.",
    siteName: "Pavitra Kushwaha",
    publishedTime: "2026-07-05T00:00:00Z",
    authors: ["Pavitra Kushwaha"],
  },
  twitter: {
    card: "summary",
    site: "@Pavitra_Kushwah",
    creator: "@Pavitra_Kushwah",
    title: "two weeks in bangalore | Pavitra Kushwaha",
    description:
      "Won two hackathons, built Vivacity, walked into ProLearn without an appointment, and went broke at a Shell petrol pump.",
  },
  alternates: {
    canonical: "https://pavitrakushwaha.dev/blog/bangalore-trip",
  },
};

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "two weeks in bangalore, or, how i ended up sleeping on a petrol pump and still called it productive",
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
  datePublished: "2026-07-05",
  dateModified: "2026-07-05",
  description:
    "Two weeks in Bangalore: won two hackathons, built Vivacity with Manim animations for JEE/NEET, walked into ProLearn without an appointment, and ended up broke at a Shell petrol pump.",
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": "https://pavitrakushwaha.dev/blog/bangalore-trip",
  },
  keywords: "Bangalore, hackathon, Vivacity, ProLearn, Pavitra Kushwaha, edtech, student builder",
  inLanguage: "en-IN",
};

export default function BangaloreTripPage() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <Link href="/blog" className="back-link">
        ← writing
      </Link>

      <div className="post-header">
        <span className="post-date">2026-06-15 - 2026-07-05</span>
        <h1 className="post-title">
          two weeks in bangalore, or, how i ended up sleeping on a
          petrol pump and still called it productive
        </h1>
        <p className="post-subtitle">15 Jun - 5 Jul 2026</p>
      </div>

      <PostChrome path="/blog/bangalore-trip" />

      <div className="post-body">
        <p>
          summer 2026. we just packed our bags and booked a one-sided
          flight to bangalore. no return ticket. no real plan. barely any
          money. just a half-baked google form we&apos;d filled out weeks
          ago for something called{" "}
          <strong>Uniform2Unicorn</strong> at polaris school of
          technology. typed something decent, hit submit, moved on. then
          they called and said we won.
        </p>

        <p>
          so we left. me, tanish, and aditya - three guys who thought
          we&apos;d figure it out once we landed. and somehow, we did.
        </p>

        <img
          className="blog-img" loading="lazy"
          src="/blog/bangalore-trip/photo-03.jpg"
          alt="Pavitra Kushwaha with team arriving in Bangalore for Uniform2Unicorn competition at Polaris School of Technology"
        />

        <p>
          we reached bangalore at night, and there was already a car
          waiting for us. which immediately made us feel like we were
          more important than we probably were. polaris had offered us
          four days of accommodation on campus, which meant four days of
          not worrying about logistics and just focusing on the actual
          work. we pitched our ideas, sat through interviews, met people,
          shot some reels, and tried our best to look like we had
          everything figured out. mostly it worked. there&apos;s a kind of
          confidence that comes from genuinely believing in what
          you&apos;re building, and we had that at least.
        </p>

        <img
          className="blog-img" loading="lazy"
          src="/blog/bangalore-trip/photo-08.jpg"
          alt="Pavitra Kushwaha and team on Polaris School of Technology campus in Bangalore"
        />

        <p>
          around the same time, we were also invited to a pitching event
          by <strong>Masters Union</strong>. originally scheduled for the
          13th but rescheduled to the 17th specifically for us, which we
          may have mentioned to each other more than once because it felt
          nice.
        </p>

        <p>
          after the polaris accommodation ended, the trip shifted into a
          different gear entirely. no more campus, no more free rooms.
          just us, three hotels across the next few weeks, and the city.
        </p>

        <p>
          the hackathons started around june 19th. we did three of them
          back to back: <strong>AIBOOMI</strong>,{" "}
          <strong>Reactor.inc</strong>, and the{" "}
          <strong>Agent Arena Bangalore Hackathon 2026</strong> - an AMD ×
          AICamp × Google collab that had a ₹50,000 first prize.
        </p>

        <img
          className="blog-img" loading="lazy"
          src="/blog/bangalore-trip/photo-09.jpg"
          alt="AIBOOMI hackathon banner - Pavitra Kushwaha won first hackathon in Bangalore"
        />

        <p>
          we won aiboomi and agent arena. for both of them we were
          building on top of something i&apos;d put together mid-hackathon
          called <strong>Prometheus</strong> - a framework that became the
          base we kept stacking newer stuff on top of, kind of like the
          world&apos;s most sleep-deprived lego set. if you&apos;re
          curious:{" "}
          <a href="https://github.com/AdityaBhatia-agentperry007/promethues">
            github.com/AdityaBhatia-agentperry007/promethues
          </a>
          . yes the spelling is wrong. no we haven&apos;t fixed it.
        </p>

        <img
          className="blog-img" loading="lazy"
          src="/blog/bangalore-trip/photo-10.jpg"
          alt="Inception and Reactor.inc hackathon banner - Pavitra Kushwaha competing at Bangalore hackathons"
        />

        <img
          className="blog-img" loading="lazy"
          src="/blog/bangalore-trip/photo-04.jpg"
          alt="Pavitra Kushwaha AMD FragFest Agent Arena winners with Nasiko boxes - ₹50,000 first prize"
        />

        <p>
          somewhere in between all of this - around june 23rd or 24th -
          we started going to networking events hosted by cedat, and
          that&apos;s where things got genuinely interesting.
        </p>

        <img
          className="blog-img" loading="lazy"
          src="/blog/bangalore-trip/photo-05.jpg"
          alt="Pavitra Kushwaha at Tim Hortons HSR Layout Bangalore meeting Pratham Pengoria"
        />

        <p>
          we met <strong>Pratham Pengoria</strong> there. founder of jee
          simplified and solve arena on youtube. aditya has been watching
          this guy since 9th grade, which made the whole thing feel
          slightly unreal. the way it does when someone who existed only
          on a screen suddenly has a coffee cup in front of them and is
          asking you what you&apos;re building. we sat with him at{" "}
          <strong>Tim Hortons in HSR Layout</strong> for about two to
          three hours, talking about education, about the gaps in what
          exists for jee and neet students, about where technology is
          actually going in indian edtech versus where people{" "}
          <em>think</em> it&apos;s going. by the end of it, we had an
          unofficial deal on the table: build a specific piece of
          software and he&apos;d pay ₹2 lakhs to use it in his platform.
        </p>

        <img
          className="blog-img" loading="lazy"
          src="/blog/bangalore-trip/photo-06.jpg"
          alt="Tim Hortons storefront in HSR Layout Bangalore with Kannada and English signage"
        />

        <p>
          but the more important thing he said was almost a throwaway line
          near the end.
        </p>

        <blockquote>
          &ldquo;there&apos;s this guy named ravneet singh. he was
          director of technology at vedantu, co-founder. physics wallah
          offered him their cto position - he turned it down.
          now he&apos;s started a new thing called prolearn and raised ₹30
          crore in pre-seed. just on an idea. his office is actually right
          around the corner.&rdquo;
        </blockquote>

        <p>and then pratham left.</p>

        <p>
          we sat there for about thirty seconds. then aditya opened google
          maps.
        </p>

        <p>
          it took maybe four minutes to find the office. we walked over,
          went upstairs, and told the security guard we were there to meet
          ravneet singh. the guard looked at us: three guys in their late
          teens, no appointment, no context, no credentials beyond vibes.
          he was visibly trying to figure out what was happening.
          honestly, fair.
        </p>

        <p>
          and then ravneet walked past the corridor at that exact moment.
        </p>

        <p>
          he stopped. he looked at us. there was a pause that felt longer
          than it was. his expression was somewhere between &ldquo;who are
          these people&rdquo; and &ldquo;i&apos;m genuinely curious what
          they want&rdquo;. and i think the second one won, because he
          said come in.
        </p>

        <img
          className="blog-img" loading="lazy"
          src="/blog/bangalore-trip/photo-07.jpg"
          alt="Pavitra Kushwaha at ProLearn office in Bangalore meeting Ravneet Singh former Vedantu Director of Technology"
        />

        <p>
          we went inside, sat down, and spent the next hour or so talking
          about everything. who we were, what we were working on, why
          we&apos;d come to bangalore, and what we were hoping to get out
          of it. we talked about orca, which was the project we were
          pitching at the time, an agentic android control thing. we asked
          about internships, about lors for college applications. and
          ravneet was the kind of person who doesn&apos;t soften things.
          he told us exactly what he thought, pointed out the real
          weaknesses in our approach, and talked about edtech with the
          kind of fluency that only comes from having actually built
          things at scale. it wasn&apos;t comfortable, but it was the most
          useful hour we&apos;d had in weeks.
        </p>

        <p>
          the software idea we&apos;d been loosely discussing with
          pratham - <strong>Vivacity</strong> - was still pretty rough
          at that point. ravneet&apos;s perspective was what actually
          shaped it into something real.
        </p>

        <p>
          here&apos;s what vivacity is: you know{" "}
          <strong>3Blue1Brown</strong> - grant sanderson, the
          mathematician who made youtube feel like a film studio? he built{" "}
          <strong>Manim</strong>, a mathematical animation library
          that&apos;s behind all of his videos. what we asked ourselves
          was: what if you took that visual language and pointed it
          specifically at jee and neet students? not at general physics
          concepts, not at broad topics. at the actual problems. the
          specific questions students get stuck on where they understand
          the theory fine but can&apos;t see the solution.
        </p>

        <p>
          there are simulation tools out there - phet, simphy -
          but they&apos;re built to explain concepts in general.
          there&apos;s nothing built around indian competitive exam
          problems specifically. nothing that takes your doubt in a
          particular question and shows you the solution animated, step by
          step, the way your brain actually wants to process it.
          that&apos;s the gap. that&apos;s vivacity. we took the design
          essence of 3b1b&apos;s approach, trained a small open-source
          model on a jee-relevant dataset, and built an engine that
          generates those animated explanations. the existing forks of
          manim that other organizations have tried either serve completely
          different use cases or are basically unusable in practice, so we
          had to build the pipeline ourselves.
        </p>

        <img
          className="blog-img" loading="lazy"
          src="/blog/bangalore-trip/photo-11.jpg"
          alt="Pavitra Kushwaha building Vivacity at a Bangalore coworking space with team"
        />

        <p>
          those were the demos we eventually went back to show ravneet.
        </p>

        <p>
          after that first meeting we tried visiting a few more times. he
          was unavailable most of those, which is the respectful way of
          saying we showed up unannounced to someone&apos;s office
          multiple times like this was normal behavior. around{" "}
          <strong>july 3rd or 4th</strong> he was actually there and
          agreed to see us again. we went in, showed him what we&apos;d
          built, and he was genuinely impressed. we talked for another two
          to three hours, met a lot of the people working there, and came
          out with a ₹60k internship. we haven&apos;t accepted it yet. but
          it&apos;s there.
        </p>

        <p>
          there were other people too. <strong>Prateek Behera</strong>,
          co-founder of gradcapital - we had a personal one-on-one with
          him, talked through vivacity, and we&apos;re pending approval on
          a ₹6 lakhs deal. <strong>Abhishek Sensharma</strong>, founder of
          lucidml, who we got to know through gradcapital. we spent time
          at <strong>Forge Residency</strong> and{" "}
          <strong>InnovationNoveltyHQ</strong>. we knew founders there
          personally, which is how we got in, and those late-night rooms
          with whiteboards and bad wi-fi were some of the best parts of
          the whole trip.
        </p>

        <img
          className="blog-img" loading="lazy"
          src="/blog/bangalore-trip/photo-12.jpg"
          alt="Pavitra Kushwaha playing carrom at a Bangalore cafe during late night downtime"
        />

        <p>
          and then there were two days where we were completely, entirely,
          not-a-single-rupee broke, camped outside a{" "}
          <strong>Shell petrol pump</strong>.
        </p>

        <p>
          i want to be clear about the specific humour of this situation:
          we had just won ₹50,000 at a hackathon. people were discussing
          six-figure deals with us over coffee. and we were sitting
          outside a petrol pump with our laptops, rationing whatever
          snacks we had, waiting for a transfer to come through. the city
          had not been informed that we were briefly insolvent. we kept
          that professional.
        </p>

        <img
          className="blog-img" loading="lazy"
          src="/blog/bangalore-trip/photo-01.jpg"
          alt="Pavitra Kushwaha at Versus Festival in Bangalore exploring the city between meetings"
        />

        <p>
          it lasted two days. we survived. we moved into the third hotel.
        </p>

        <p>
          by the time we actually left bangalore - and yes, we eventually
          booked the return tickets - we&apos;d won two hackathons, built
          a product that serious people in indian edtech took seriously,
          met founders and investors across three weeks of barely-planned
          persistence, walked cold into an office and came out with an
          internship, locked a ₹6 lakhs deal, and spent two days broke at
          a petrol pump in a city that had no idea. we came with nothing
          and left with more than we could have planned for.
        </p>

        <img
          className="blog-img" loading="lazy"
          src="/blog/bangalore-trip/photo-02.jpg"
          alt="Pavitra Kushwaha at arcade in Bangalore before leaving the city"
        />

        <p>
          we came for a competition. the competition was just the door.
        </p>

        <p className="post-signoff">
          <em>Vivacity is still being built. What comes next - that&apos;s
          what we&apos;re figuring out.</em>
        </p>
        <p className="easter-aside muted">
          ps: if you made it this far,{" "}
          <Link href="/visits" title="yes this is the stalker page">
            someone from your city might already be on the list
          </Link>
          . creepy? a little. fun? also a little.
        </p>
      </div>

      <SiteFooter
        links={<Link href="/blog">writing</Link>}
      />
    </main>
  );
}
