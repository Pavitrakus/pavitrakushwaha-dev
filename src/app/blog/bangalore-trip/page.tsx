import type { Metadata } from "next";
import Link from "next/link";
import { PostChrome } from "@/components/PostChrome";
import { SiteFooter } from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "my month in bangalore",
  description:
    "June and July 2026 in Bangalore: two hackathons, a walk-in at Prolearn, two days outside a Shell pump, and the people we met.",
  keywords: [
    "Pavitra Kushwaha",
    "Bangalore",
    "Uniform2Unicorn",
    "ProLearn",
    "Vivacity",
    "AIBOOMI",
    "Agent Arena",
    "byteforge",
  ],
  openGraph: {
    type: "article",
    url: "https://pavitrakushwaha.dev/blog/bangalore-trip",
    title: "my month in bangalore | Pavitra Kushwaha",
    description:
      "Two hackathons, a walk-in at Prolearn, two days outside a Shell pump. Bangalore, June-July 2026.",
    siteName: "Pavitra Kushwaha",
    publishedTime: "2026-07-05T00:00:00Z",
    authors: ["Pavitra Kushwaha"],
  },
  twitter: {
    card: "summary",
    site: "@pavikshw",
    creator: "@pavikshw",
    title: "my month in bangalore | Pavitra Kushwaha",
    description:
      "Two hackathons, a walk-in at Prolearn, two days outside a Shell pump. Bangalore, June-July 2026.",
  },
  alternates: {
    canonical: "https://pavitrakushwaha.dev/blog/bangalore-trip",
  },
};

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "my month in bangalore",
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
  dateModified: "2026-09-06",
  description:
    "June and July 2026 in Bangalore: two hackathons, a walk-in at Prolearn, two days outside a Shell pump, and the people we met.",
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": "https://pavitrakushwaha.dev/blog/bangalore-trip",
  },
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
        <h1 className="post-title">my month in bangalore</h1>
        <p className="post-subtitle">15 jun - 5 jul 2026</p>
      </div>

      <PostChrome path="/blog/bangalore-trip" />

      <div className="post-body">
        <p>
          summer 2026 we packed bags and booked a one-way flight to
          bangalore. no return ticket, barely any money, and a google form
          we had filled weeks earlier for{" "}
          <strong>Uniform2Unicorn</strong> at polaris school of technology.
          we typed something decent, hit submit, and forgot about it until
          they called and said we won. so me, tanish, and aditya left, three
          people hoping the rest would make sense after landing.
        </p>

        <img
          className="blog-img" loading="lazy"
          src="/blog/bangalore-trip/photo-03.jpg"
          alt="Pavitra Kushwaha with team arriving in Bangalore for Uniform2Unicorn at Polaris School of Technology"
        />

        <p>
          we reached at night and a car was already waiting, which made us
          feel briefly more important than we were. polaris gave us four
          days on campus so we could pitch, sit through interviews, meet
          people, shoot some reels, and try to look like we had a plan.
          some of that was real belief in what we were building. some of it
          was just adrenaline and not wanting to waste the room.
        </p>

        <img
          className="blog-img" loading="lazy"
          src="/blog/bangalore-trip/photo-08.jpg"
          alt="Pavitra Kushwaha and team on Polaris School of Technology campus in Bangalore"
        />

        <p>
          around the same week <strong>Masters Union</strong> asked us to a
          pitching event. it was supposed to be the 13th, then they moved
          it to the 17th so we could make it, and we definitely told each
          other that more than once because it felt good. after polaris the
          trip changed. no campus, no free rooms, just us, three hotels
          across the next few weeks, and the city.
        </p>

        <p>
          hackathons started around june 19th. we did three of them back to
          back: <strong>AIBOOMI</strong>, <strong>Reactor.inc</strong>, and
          the <strong>Agent Arena Bangalore Hackathon 2026</strong>, an AMD
          × AICamp × Google collab with a ₹50,000 first prize. we won
          aiboomi and agent arena, both of them sitting on something i
          threw together mid-hackathon called{" "}
          <strong>Prometheus</strong>, a framework we kept stacking newer
          stuff on, like the world&apos;s most sleep-deprived lego set. if
          you want the repo:{" "}
          <a href="https://github.com/AdityaBhatia-agentperry007/promethues">
            github.com/AdityaBhatia-agentperry007/promethues
          </a>
          . the spelling is wrong and we still have not fixed it.
        </p>

        <img
          className="blog-img" loading="lazy"
          src="/blog/bangalore-trip/photo-09.jpg"
          alt="AIBOOMI hackathon banner"
        />

        <img
          className="blog-img" loading="lazy"
          src="/blog/bangalore-trip/photo-10.jpg"
          alt="Inception and Reactor.inc hackathon banner"
        />

        <img
          className="blog-img" loading="lazy"
          src="/blog/bangalore-trip/photo-04.jpg"
          alt="Pavitra Kushwaha AMD FragFest Agent Arena winners with Nasiko boxes"
        />

        <p>
          somewhere around june 23rd or 24th we started going to networking
          nights hosted by cedat, and that is where the month actually
          opened up.
        </p>

        <img
          className="blog-img" loading="lazy"
          src="/blog/bangalore-trip/photo-05.jpg"
          alt="Pavitra Kushwaha at Tim Hortons HSR Layout Bangalore meeting Pratham Pengoria"
        />

        <p>
          we met <strong>Pratham Pengoria</strong> there, the founder of
          jee simplified and solve arena. aditya had been watching him
          since 9th grade, so sitting across a table at{" "}
          <strong>Tim Hortons in HSR Layout</strong> felt slightly fake,
          like a youtube tab had grown a coffee cup and started asking what
          we were building. we stayed two or three hours talking about
          education, about what jee and neet students still cannot get from
          the tools that exist, and about where indian edtech is actually
          going versus where people like to say it is going. by the end
          there was an unofficial deal on the table: build a specific piece
          of software and he would pay ₹2 lakhs to use it on his platform.
        </p>

        <img
          className="blog-img" loading="lazy"
          src="/blog/bangalore-trip/photo-06.jpg"
          alt="Tim Hortons storefront in HSR Layout Bangalore"
        />

        <p>
          the line that mattered more came near the end, almost thrown
          away: there is this guy named ravneet singh. director of
          technology at vedantu, co-founder. physics wallah offered him
          cto and he turned it down. now he has started prolearn and raised
          ₹30 crore in pre-seed, just on an idea, and his office is around
          the corner. then pratham left, we sat there for maybe thirty
          seconds, and aditya opened google maps.
        </p>

        <p>
          four minutes later we were upstairs telling the security guard we
          were there to meet ravneet singh. three teenagers, no
          appointment, no context, nothing except vibes. the guard was
          trying to decide what we were, which was fair, and then ravneet
          walked past the corridor at that exact moment. he stopped, looked
          at us, and you could see him picking between &ldquo;who are these
          people&rdquo; and &ldquo;fine, i am curious.&rdquo; the second one
          won. he said come in.
        </p>

        <img
          className="blog-img" loading="lazy"
          src="/blog/bangalore-trip/photo-07.jpg"
          alt="Pavitra Kushwaha at ProLearn office in Bangalore meeting Ravneet Singh"
        />

        <p>
          we sat for an hour and talked about who we were, why we had come
          to bangalore, and what we were hoping to get out of it. we talked
          about orca, the agentic android control thing we were pitching at
          the time, and we asked about internships and lors for college.
          ravneet does not soften things. he told us what was weak, talked
          about edtech like someone who had actually shipped it at scale,
          and that hour was more useful than most of the polite rooms we
          had sat in that month.
        </p>

        <p>
          the software we had been loosely shaping with pratham was{" "}
          <strong>Vivacity</strong>, still rough. ravneet is the person who
          made us take it seriously. the idea then was simple in a way that
          still makes sense to me: grant sanderson / 3blue1brown built
          manim so math could move on a screen, and we wanted that visual
          language pointed at the actual jee and neet questions students
          get stuck on, the ones where they already know the theory and
          still cannot see the next step. phet and simphy explain concepts
          in general. we wanted something that takes a specific doubt and
          walks the solution the way your head wants to see it. we took the
          design feel of 3b1b, trained a small open-source model on a
          jee-relevant set, and built an engine that generates those
          animations. the public manim forks we tried were either for
          different jobs or basically unusable, so we had to make the
          pipeline ourselves. those were the demos we eventually took back
          to ravneet.
        </p>

        <img
          className="blog-img" loading="lazy"
          src="/blog/bangalore-trip/photo-11.jpg"
          alt="Pavitra Kushwaha building Vivacity at a Bangalore coworking space with team"
        />

        <p>
          after the first meeting we tried visiting a few more times. he
          was unavailable most of those, which is the polite way of saying
          we kept showing up unannounced like that was a normal thing to
          do. around <strong>july 3rd or 4th</strong> he was actually there
          and agreed to see us again. we showed him what we had built, sat
          another two or three hours, met a lot of the people working
          there, and came out with a ₹60k internship. we have not accepted
          it yet, but it is there.
        </p>

        <p>
          there were other people too. <strong>Prateek Behera</strong>,
          co-founder of gradcapital, sat with us one-on-one, talked through
          vivacity, and we are still pending approval on a ₹6 lakhs deal.{" "}
          <strong>Abhishek Sensharma</strong> from lucidml we got to know
          through gradcapital. we spent nights at{" "}
          <strong>Forge Residency</strong> and{" "}
          <strong>InnovationNoveltyHQ</strong> because we knew people
          there, and those rooms with whiteboards and bad wi-fi were some
          of the best hours of the trip.
        </p>

        <img
          className="blog-img" loading="lazy"
          src="/blog/bangalore-trip/photo-12.jpg"
          alt="Pavitra Kushwaha playing carrom at a Bangalore cafe"
        />

        <p>
          and then there were two days where we were completely broke,
          camped outside a <strong>Shell petrol pump</strong> with
          laptops, waiting for a transfer, even though we had just won
          ₹50,000 at a hackathon and people were talking six-figure deals
          with us over coffee. the city did not need to know. we moved into
          the third hotel when the money finally showed up.
        </p>

        <img
          className="blog-img" loading="lazy"
          src="/blog/bangalore-trip/photo-01.jpg"
          alt="Pavitra Kushwaha at Versus Festival in Bangalore"
        />

        <p>
          by the time we booked the return tickets we had won two
          hackathons, built something that people in indian edtech actually
          sat with, walked into an office with no appointment and came out
          with an internship, left a ₹6 lakhs conversation pending, and
          spent two days outside a petrol pump. we came with almost nothing
          and left with more than we had any right to plan for. the
          competition got us on the plane. the rest of the month was
          showing up anyway.
        </p>

        <img
          className="blog-img" loading="lazy"
          src="/blog/bangalore-trip/photo-02.jpg"
          alt="Pavitra Kushwaha at an arcade in Bangalore"
        />

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
