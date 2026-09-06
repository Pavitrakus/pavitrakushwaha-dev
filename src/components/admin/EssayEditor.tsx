"use client";

import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import { FontFamily, FontSize, TextStyle } from "@tiptap/extension-text-style";
import Underline from "@tiptap/extension-underline";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

async function compressImage(file: File): Promise<{ mime: string; data: string }> {
  const url = URL.createObjectURL(file);
  try {
    const img = document.createElement("img");
    await new Promise<void>((resolve, reject) => {
      img.onload = () => resolve();
      img.onerror = () => reject(new Error("could not read image"));
      img.src = url;
    });
    const max = 1600;
    let w = img.naturalWidth || 1600;
    let h = img.naturalHeight || 1600;
    if (w > max || h > max) {
      const r = Math.min(max / w, max / h);
      w = Math.round(w * r);
      h = Math.round(h * r);
    }
    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("no canvas");
    ctx.drawImage(img, 0, 0, w, h);
    const blob: Blob = await new Promise((resolve, reject) => {
      canvas.toBlob(
        (b) => (b ? resolve(b) : reject(new Error("compress failed"))),
        "image/jpeg",
        0.82,
      );
    });
    const data = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const result = String(reader.result || "");
        resolve(result.split(",")[1] || "");
      };
      reader.onerror = () => reject(new Error("read failed"));
      reader.readAsDataURL(blob);
    });
    return { mime: "image/jpeg", data };
  } finally {
    URL.revokeObjectURL(url);
  }
}

export function EssayEditor({ slug }: { slug?: string }) {
  const router = useRouter();
  const [gate, setGate] = useState<"wait" | "ok">("wait");
  const [title, setTitle] = useState("");
  const [dek, setDek] = useState("");
  const [linkOpen, setLinkOpen] = useState(false);
  const [linkValue, setLinkValue] = useState("https://");
  const [status, setStatus] = useState("");
  const [saving, setSaving] = useState(false);
  const [currentSlug, setCurrentSlug] = useState(slug || "");
  const [published, setPublished] = useState(false);
  const [loaded, setLoaded] = useState(!slug);

  useEffect(() => {
    fetch("/api/admin/me", { cache: "no-store" }).then((res) => {
      if (res.ok) setGate("ok");
      else router.replace("/admin");
    });
  }, [router]);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({ heading: { levels: [2, 3] } }),
      Underline,
      TextStyle,
      FontFamily,
      FontSize,
      Link.configure({ openOnClick: false, autolink: true }),
      Image.configure({ inline: false, allowBase64: false }),
      Placeholder.configure({ placeholder: "start writing. keep it human." }),
    ],
    content: "<p></p>",
  });

  useEffect(() => {
    if (!slug || !editor) return;
    let cancelled = false;
    (async () => {
      const res = await fetch(`/api/admin/essays/${slug}`, { cache: "no-store" });
      if (cancelled) return;
      if (!res.ok) {
        setStatus("could not load that piece");
        setLoaded(true);
        return;
      }
      const data = await res.json();
      setTitle(data.essay.title);
      setDek(data.essay.dek);
      setPublished(data.essay.published);
      setCurrentSlug(data.essay.slug);
      editor.commands.setContent(data.essay.html || "<p></p>");
      setLoaded(true);
    })();
    return () => {
      cancelled = true;
    };
  }, [slug, editor]);

  const save = useCallback(
    async (nextPublished: boolean) => {
      if (!editor) return;
      setSaving(true);
      setStatus("");
      try {
        const payload = {
          slug: currentSlug || undefined,
          title,
          dek,
          html: editor.getHTML(),
          published: nextPublished,
        };
        const res = await fetch(
          currentSlug ? `/api/admin/essays/${currentSlug}` : "/api/admin/essays",
          {
            method: currentSlug ? "PUT" : "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          },
        );
        const data = await res.json();
        if (!res.ok) {
          setStatus(data.error || "save failed");
          return;
        }
        setPublished(data.essay.published);
        setCurrentSlug(data.essay.slug);
        setStatus(nextPublished ? "live." : "saved.");
        if (!slug && data.essay.slug) {
          router.replace(`/admin/write/${data.essay.slug}`);
        }
      } finally {
        setSaving(false);
      }
    },
    [currentSlug, dek, editor, router, slug, title],
  );

  const applyLink = () => {
    if (!editor) return;
    const href = linkValue.trim();
    if (href) editor.chain().focus().extendMarkRange("link").setLink({ href }).run();
    else editor.chain().focus().unsetLink().run();
    setLinkOpen(false);
  };

  const addImage = async (file: File) => {
    setStatus("uploading image…");
    try {
      const packed = await compressImage(file);
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(packed),
      });
      const data = await res.json();
      if (!res.ok) {
        setStatus(data.error || "upload failed");
        return;
      }
      editor?.chain().focus().setImage({ src: data.src, alt: file.name }).run();
      setStatus("");
    } catch {
      setStatus("could not add that image");
    }
  };

  if (gate !== "ok" || !loaded) {
    return (
      <main className="admin-shell">
        <p className="muted">loading…</p>
      </main>
    );
  }

  return (
    <main className="admin-shell admin-editor-page">
      <div className="admin-top">
        <a href="/admin" className="back-link">
          ← desk
        </a>
        {published && currentSlug && (
          <a href={`/blog/${currentSlug}`} target="_blank" rel="noopener noreferrer">
            view live
          </a>
        )}
      </div>

      <input
        className="admin-title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
      />
      <input
        className="admin-dek"
        value={dek}
        onChange={(e) => setDek(e.target.value)}
        placeholder="one-line dek, optional"
      />

      <div className="admin-toolbar" role="toolbar" aria-label="format">
        <button type="button" onClick={() => editor?.chain().focus().toggleBold().run()} className={editor?.isActive("bold") ? "is-on" : ""}>
          B
        </button>
        <button type="button" onClick={() => editor?.chain().focus().toggleItalic().run()} className={editor?.isActive("italic") ? "is-on" : ""}>
          I
        </button>
        <button type="button" onClick={() => editor?.chain().focus().toggleUnderline().run()} className={editor?.isActive("underline") ? "is-on" : ""}>
          U
        </button>
        <button type="button" onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()} className={editor?.isActive("heading", { level: 2 }) ? "is-on" : ""}>
          H
        </button>
        <button type="button" onClick={() => editor?.chain().focus().toggleBlockquote().run()} className={editor?.isActive("blockquote") ? "is-on" : ""}>
          “
        </button>
        <button type="button" onClick={() => editor?.chain().focus().toggleBulletList().run()} className={editor?.isActive("bulletList") ? "is-on" : ""}>
          •
        </button>
        <button type="button" onClick={() => editor?.chain().focus().toggleOrderedList().run()} className={editor?.isActive("orderedList") ? "is-on" : ""}>
          1.
        </button>
        <button
          type="button"
          onClick={() => {
            setLinkValue(editor?.getAttributes("link").href || "https://");
            setLinkOpen((v) => !v);
          }}
          className={editor?.isActive("link") ? "is-on" : ""}
        >
          link
        </button>
        <label className="admin-file">
          image
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) addImage(file);
              e.target.value = "";
            }}
          />
        </label>
        <select
          aria-label="font"
          onChange={(e) => {
            const v = e.target.value;
            if (v === "default") editor?.chain().focus().unsetFontFamily().run();
            else editor?.chain().focus().setFontFamily(v).run();
          }}
        >
          <option value="default">font</option>
          <option value="Lora, Georgia, serif">serif</option>
          <option value="Georgia, serif">georgia</option>
          <option value="JetBrains Mono, monospace">mono</option>
          <option value="system-ui, sans-serif">sans</option>
        </select>
        <select
          aria-label="size"
          onChange={(e) => {
            const v = e.target.value;
            if (v === "default") editor?.chain().focus().unsetFontSize().run();
            else editor?.chain().focus().setFontSize(v).run();
          }}
        >
          <option value="default">size</option>
          <option value="16px">16</option>
          <option value="18px">18</option>
          <option value="20px">20</option>
          <option value="24px">24</option>
          <option value="28px">28</option>
        </select>
      </div>

      {linkOpen && (
        <div className="admin-linkbar">
          <input
            value={linkValue}
            onChange={(e) => setLinkValue(e.target.value)}
            placeholder="https://"
            inputMode="url"
          />
          <button type="button" onClick={applyLink}>
            apply
          </button>
          <button type="button" onClick={() => editor?.chain().focus().unsetLink().run()}>
            remove
          </button>
        </div>
      )}

      <div className="admin-canvas">
        <EditorContent editor={editor} />
      </div>

      <div className="admin-savebar">
        <span className="admin-status">{status}</span>
        <button type="button" disabled={saving || !title.trim()} onClick={() => save(published)}>
          save
        </button>
        {published ? (
          <button type="button" disabled={saving || !title.trim()} onClick={() => save(false)}>
            unpublish
          </button>
        ) : (
          <button type="button" className="admin-publish" disabled={saving || !title.trim()} onClick={() => save(true)}>
            publish
          </button>
        )}
      </div>
    </main>
  );
}
