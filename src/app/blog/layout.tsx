import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "writing",
  description:
    "Essays and short notes from Pavitra Kushwaha on building, research, travel, and the weeks worth writing down.",
};

export default function BlogLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
