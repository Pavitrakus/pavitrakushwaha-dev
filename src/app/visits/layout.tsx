import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "visitor trail",
  description:
    "recent humans who opened pavitrakushwaha.dev. city-level visitor trail. we hide the ip. mostly.",
  robots: "index, follow",
  alternates: { canonical: "https://pavitrakushwaha.dev/visits" },
};

export default function VisitsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
