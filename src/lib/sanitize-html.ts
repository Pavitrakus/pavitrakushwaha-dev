const ALLOWED = new Set([
  "P",
  "H2",
  "H3",
  "BLOCKQUOTE",
  "UL",
  "OL",
  "LI",
  "STRONG",
  "B",
  "EM",
  "I",
  "U",
  "A",
  "IMG",
  "BR",
  "SPAN",
]);

function cleanStyle(raw: string): string {
  const bits: string[] = [];
  for (const part of raw.split(";")) {
    const i = part.indexOf(":");
    if (i < 0) continue;
    const key = part.slice(0, i).trim().toLowerCase();
    const val = part.slice(i + 1).trim();
    if (!val) continue;
    if (key === "font-size" && /^\d+(\.\d+)?(px|em|rem)$/i.test(val)) {
      bits.push(`font-size: ${val}`);
    }
    if (key === "font-family" && /^[a-z0-9 ,'"_-]+$/i.test(val) && val.length < 80) {
      bits.push(`font-family: ${val}`);
    }
  }
  return bits.join("; ");
}

function cleanHref(raw: string): string | null {
  const href = raw.trim();
  if (/^https?:\/\//i.test(href) || /^mailto:/i.test(href)) {
    if (/[<>"']/.test(href) || href.length > 500) return null;
    return href;
  }
  return null;
}

function cleanSrc(raw: string): string | null {
  const src = raw.trim();
  if (/^\/api\/media\/[a-f0-9]{16,64}$/i.test(src)) return src;
  return null;
}

export function sanitizeEssayHtml(input: string): string {
  if (!input) return "";
  let html = input
    .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?>[\s\S]*?<\/style>/gi, "")
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/\son[a-z]+\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi, "")
    .replace(/javascript:/gi, "");

  html = html.replace(/<\/?([a-z0-9]+)([^>]*)>/gi, (full, name: string, attrs: string) => {
    const tag = name.toUpperCase();
    const closing = full.startsWith("</");
    if (!ALLOWED.has(tag)) return "";
    if (closing) return `</${tag.toLowerCase()}>`;
    if (tag === "BR") return "<br>";

    let extra = "";
    if (tag === "A") {
      const hrefMatch = attrs.match(/\bhref\s*=\s*("([^"]*)"|'([^']*)')/i);
      const href = cleanHref(hrefMatch?.[2] || hrefMatch?.[3] || "");
      if (!href) return "";
      extra = ` href="${href}" rel="noopener noreferrer" target="_blank"`;
    }
    if (tag === "IMG") {
      const srcMatch = attrs.match(/\bsrc\s*=\s*("([^"]*)"|'([^']*)')/i);
      const altMatch = attrs.match(/\balt\s*=\s*("([^"]*)"|'([^']*)')/i);
      const src = cleanSrc(srcMatch?.[2] || srcMatch?.[3] || "");
      if (!src) return "";
      const alt = (altMatch?.[2] || altMatch?.[3] || "").replace(/[<>"]/g, "").slice(0, 120);
      extra = ` src="${src}" alt="${alt}"`;
    }
    if (tag === "SPAN" || tag === "P" || tag === "H2" || tag === "H3" || tag === "LI") {
      const styleMatch = attrs.match(/\bstyle\s*=\s*("([^"]*)"|'([^']*)')/i);
      const style = cleanStyle(styleMatch?.[2] || styleMatch?.[3] || "");
      if (style) extra += ` style="${style}"`;
    }
    return `<${tag.toLowerCase()}${extra}>`;
  });

  return html.slice(0, 200_000);
}
