import type { CSSProperties } from "react";

export function Logo({
  src,
  alt,
  rounded = true,
  className,
  style: extraStyle,
}: {
  src: string;
  alt: string;
  rounded?: boolean;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <img
      src={src}
      alt={alt}
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
}

export function Favicon({ domain, alt }: { domain: string; alt: string }) {
  return (
    <img
      src={`https://www.google.com/s2/favicons?sz=64&domain=${domain}`}
      alt={alt}
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
}

export function YC() {
  return (
    <span
      style={{
        display: "inline-block",
        width: "1em",
        height: "1em",
        background: "#FF6600",
        borderRadius: "2px",
        color: "#fff",
        fontWeight: 700,
        fontSize: "0.7em",
        lineHeight: "1em",
        textAlign: "center",
        verticalAlign: "-0.02em",
        marginRight: "0.22em",
        fontFamily: "sans-serif",
      }}
    >
      Y
    </span>
  );
}
