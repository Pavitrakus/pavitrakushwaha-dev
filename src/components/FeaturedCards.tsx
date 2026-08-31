"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Card = {
  href: string;
  title: string;
  desc: string;
  images: string[];
  alt: string;
};

const cards: Card[] = [
  {
    href: "/projects/orbis-2045",
    title: "ORBIS 2045",
    desc: "a hardware toy that wanted to look like 2045. pi, a local model, and a pile of jumper wires.",
    images: ["/featured/orbis-1.jpg", "/featured/orbis-2.jpg"],
    alt: "ORBIS 2045 hardware prototype",
  },
  {
    href: "/blog/bangalore-trip",
    title: "two weeks in bangalore",
    desc: "hackathons, a walk-in, and two days broke at a shell pump. the longer piece.",
    images: ["/featured/bangalore-office.jpg"],
    alt: "Pavitra with friends in a Bangalore office",
  },
];

function Cycle({ images, alt }: { images: string[]; alt: string }) {
  const [i, setI] = useState(0);

  useEffect(() => {
    if (images.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => {
      setI((n) => (n + 1) % images.length);
    }, 3400);
    return () => window.clearInterval(id);
  }, [images.length]);

  return (
    <div className="featured-frame">
      {images.map((src, n) => (
        <img
          key={src}
          src={src}
          alt={n === i ? alt : ""}
          className={n === i ? "is-on" : undefined}
          loading={n === 0 ? "eager" : "lazy"}
          decoding="async"
        />
      ))}
    </div>
  );
}

export function FeaturedCards() {
  return (
    <div className="featured-grid">
      {cards.map((c) => (
        <Link key={c.href} href={c.href} className="featured-card">
          <Cycle images={c.images} alt={c.alt} />
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
