"use client";

import Link from "next/link";
import { usePresence } from "./PresenceProvider";

type Props = {
  links?: React.ReactNode;
  showHome?: boolean;
};

function formatViews(n: number | null) {
  if (n == null) return null;
  return n.toLocaleString("en-US");
}

export function SiteFooter({ links, showHome = true }: Props) {
  const { lastPlace, siteViews } = usePresence();
  const views = formatViews(siteViews);

  return (
    <footer>
      <span>2026 pavitra kushwaha</span>
      {showHome && <Link href="/">home</Link>}
      {links}
      <Link href="/v01">v01 2025</Link>
      {lastPlace ? (
        <Link href="/visits" className="footer-trail">
          last: {lastPlace}
        </Link>
      ) : (
        <Link href="/visits" className="footer-trail">
          visitor trail →
        </Link>
      )}
      {views && <span className="footer-views">{views} views</span>}
    </footer>
  );
}
