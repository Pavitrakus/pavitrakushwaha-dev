"use client";

import Link from "next/link";

type Card = {
  href: string;
  title: string;
  desc: string;
  image: string;
  alt: string;
};

const cards: Card[] = [
  {
    href: "/projects/orbis-2045",
    title: "ORBIS 2045",
    desc: "a desk appliance that runs a local model and talks to a phone. pi, llama.cpp, the whole object sitting still.",
    image: "/featured/orbis-2.jpg",
    alt: "ORBIS 2045 hardware on the bench, still",
  },
  {
    href: "/blog/bangalore-trip",
    title: "Two weeks in Bangalore",
    desc: "hackathons, a walk-in, and two days broke at a shell pump. the longer piece.",
    image: "/featured/bangalore-office.jpg",
    alt: "Pavitra with friends in a Bangalore office",
  },
];

export function FeaturedCards() {
  return (
    <div className="featured-grid">
      {cards.map((c) => (
        <Link key={c.href} href={c.href} className="featured-card">
          <div className="featured-frame">
            <img
              src={c.image}
              alt={c.alt}
              className="is-on"
              loading="eager"
              decoding="async"
            />
          </div>
          <h3>
            {c.title}
            <span className="work-arrow" aria-hidden="true">
              →
            </span>
          </h3>
          <p>{c.desc}</p>
        </Link>
      ))}
    </div>
  );
}
