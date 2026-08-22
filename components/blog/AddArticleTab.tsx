"use client";

import { useState, useRef, useCallback } from "react";
import styles from "./AddArticleTab.module.css";

// ─── types ────────────────────────────────────────────────────────────────────

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface Tag {
  id: string;
  name: string;
  slug: string;
}

interface FormState {
  title: string;
  excerpt: string;
  content: string;
  categoryId: string;
  tags: string[]; // array of tag UUIDs
  coverImage: File | null;
}

type SaveStatus = "idle" | "saving" | "saved" | "error";

// ─── props ────────────────────────────────────────────────────────────────────

interface AddArticleTabProps {
  apiUrl: string;
  categories?: Category[];
  tags?: Tag[];
  /** Called after a successful save so parent can refresh the article list */
  onSaved?: (articleId: string) => void;
}

// ─── character counter ────────────────────────────────────────────────────────

function CharCount({ value, max }: { value: string; max: number }) {
  const len = value.length;
  const over = len > max;
  return (
    <span className={`${styles.charCount} ${over ? styles.charOver : ""}`}>
      {len}/{max}
    </span>
  );
}

// ─── cover image drop zone ────────────────────────────────────────────────────

function CoverImageInput({
  file,
  onChange,
}: {
  file: File | null;
  onChange: (f: File | null) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const preview = file ? URL.createObjectURL(file) : null;

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragging(false);
      const dropped = e.dataTransfer.files[0];
      if (dropped && dropped.type.startsWith("image/")) onChange(dropped);
    },
    [onChange]
  );

  return (
    <div
      className={`${styles.dropZone} ${dragging ? styles.dropActive : ""} ${file ? styles.dropHasFile : ""}`}
      onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
      onDragLeave={() => setDragging(false)}
      onDrop={handleDrop}
      onClick={() => inputRef.current?.click()}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && inputRef.current?.click()}
      aria-label="Upload cover image"
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className={styles.hiddenInput}
        onChange={(e) => onChange(e.target.files?.[0] ?? null)}
      />

      {preview ? (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={preview} alt="Cover preview" className={styles.dropPreview} />
          <button
            type="button"
            className={styles.dropRemove}
            onClick={(e) => { e.stopPropagation(); onChange(null); }}
            aria-label="Remove cover image"
          >
            ✕
          </button>
          <span className={styles.dropChange}>Click to change</span>
        </>
      ) : (
        <div className={styles.dropPrompt}>
          <span className={styles.dropIcon}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2"/>
              <circle cx="8.5" cy="8.5" r="1.5"/>
              <polyline points="21 15 16 10 5 21"/>
            </svg>
          </span>
          <p className={styles.dropText}>
            Drag &amp; drop a cover image, or <span className={styles.dropLink}>browse</span>
          </p>
          <p className={styles.dropHint}>JPG, PNG or WebP · max 5 MB · 1200×630 recommended</p>
        </div>
      )}
    </div>
  );
}

// ─── tag selector ─────────────────────────────────────────────────────────────

function TagSelector({
  allTags,
  selected,
  onChange,
}: {
  allTags: Tag[];
  selected: string[];
  onChange: (ids: string[]) => void;
}) {
  const toggle = (id: string) =>
    onChange(selected.includes(id) ? selected.filter((t) => t !== id) : [...selected, id]);

  return (
    <div className={styles.tagGrid}>
      {allTags.map((tag) => {
        const active = selected.includes(tag.id);
        return (
          <button
            key={tag.id}
            type="button"
            className={`${styles.tagPill} ${active ? styles.tagActive : ""}`}
            onClick={() => toggle(tag.id)}
            aria-pressed={active}
          >
            {active && <span className={styles.tagCheck}>✓</span>}
            {tag.name}
          </button>
        );
      })}
    </div>
  );
}

// ─── main component ───────────────────────────────────────────────────────────

export default function AddArticleTab({
  apiUrl,
  categories = [],
  tags = [],
  onSaved,
}: AddArticleTabProps) {
  const [form, setForm] = useState<FormState>({
    title: "",
    excerpt: "",
    content: "",
    categoryId: "",
    tags: [],
    coverImage: null,
  });

  const [saveStatus, setSaveStatus] = useState<SaveStatus>("idle");
  const [publishAfterSave, setPublishAfterSave] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [savedId, setSavedId] = useState<string | null>(null);

  // ── field helpers ──

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  // ── validation ──

  const validate = (): boolean => {
    const errs: Partial<Record<keyof FormState, string>> = {};
    if (!form.title.trim()) errs.title = "Title is required.";
    else if (form.title.length > 200) errs.title = "Title must be under 200 characters.";
    if (form.excerpt && form.excerpt.length > 500) errs.excerpt = "Excerpt must be under 500 characters.";
    if (!form.content.trim()) errs.content = "Content is required.";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  // ── submit ──

  const handleSave = async (publish = false) => {
    if (!validate()) return;

    setSaveStatus("saving");
    setPublishAfterSave(publish);

    try {
      const fd = new FormData();
      fd.append("title", form.title.trim());
      fd.append("excerpt", form.excerpt.trim());
      fd.append("content", form.content.trim());
      if (form.categoryId) fd.append("categoryId", form.categoryId);
      form.tags.forEach((id) => fd.append("tags[]", id));
      if (form.coverImage) fd.append("coverImage", form.coverImage);

      // Log payload for inspection
      console.group("📝 Article FormData");
      fd.forEach((val, key) => console.log(key, val));
      console.groupEnd();

      const res = await fetch(`${apiUrl}articles`, {
        method: "POST",
        body: fd,
        // omit Content-Type — browser sets it with boundary automatically
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message ?? "Failed to save article.");
      }

      const data = await res.json();
      const articleId: string = data.data.id;
      setSavedId(articleId);

      // Optionally publish immediately
      if (publish) {
        await fetch(`${apiUrl}articles/${articleId}/publish`, { method: "POST" });
      }

      setSaveStatus("saved");
      onSaved?.(articleId);
    } catch (err) {
      console.error(err);
      setSaveStatus("error");
      setTimeout(() => setSaveStatus("idle"), 4000);
    }
  };

  // ── reset ──

  const handleReset = () => {
    setForm({ title: "", excerpt: "", content: "", categoryId: "", tags: [], coverImage: null });
    setErrors({});
    setSaveStatus("idle");
    setSavedId(null);
  };

  // ── render ──

  if (saveStatus === "saved" && savedId) {
    return (
      <div className={styles.successScreen}>
        <div className={styles.successIcon}>
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
            <circle cx="20" cy="20" r="20" fill="#C9A84C" opacity=".12"/>
            <path d="M12 20l6 6 10-12" stroke="#C9A84C" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <h2 className={styles.successTitle}>
          {publishAfterSave ? "Article published" : "Draft saved"}
        </h2>
        <p className={styles.successSub}>
          {publishAfterSave
            ? "Your article is now live on the website."
            : "Your article is saved as a draft. You can publish it from the articles list."}
        </p>
        <div className={styles.successActions}>
          <button className={styles.btnPrimary} onClick={handleReset}>
            Write another article
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      {/* ── header ── */}
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>New article</h1>
          <p className={styles.pageSub}>Drafts are saved privately. Publish when you're ready.</p>
        </div>
        <div className={styles.headerActions}>
          <button
            type="button"
            className={styles.btnSecondary}
            onClick={() => handleSave(false)}
            disabled={saveStatus === "saving"}
          >
            {saveStatus === "saving" && !publishAfterSave ? "Saving…" : "Save draft"}
          </button>
          <button
            type="button"
            className={styles.btnPrimary}
            onClick={() => handleSave(true)}
            disabled={saveStatus === "saving"}
          >
            {saveStatus === "saving" && publishAfterSave ? "Publishing…" : "Publish"}
          </button>
        </div>
      </div>

      {saveStatus === "error" && (
        <div className={styles.errorBanner}>
          Something went wrong. Check your connection and try again.
        </div>
      )}

      {/* ── two-column layout ── */}
      <div className={styles.layout}>

        {/* ── LEFT: main content ── */}
        <div className={styles.main}>

          {/* Title */}
          <div className={`${styles.field} ${errors.title ? styles.fieldError : ""}`}>
            <div className={styles.labelRow}>
              <label className={styles.label} htmlFor="title">
                Title <span className={styles.required}>*</span>
              </label>
              <CharCount value={form.title} max={200} />
            </div>
            <input
              id="title"
              type="text"
              className={styles.input}
              placeholder="e.g. Top 5 Localities to Invest in Bhubaneswar 2025"
              value={form.title}
              onChange={(e) => set("title", e.target.value)}
              maxLength={210}
            />
            {errors.title && <p className={styles.fieldMsg}>{errors.title}</p>}
          </div>

          {/* Excerpt */}
          <div className={`${styles.field} ${errors.excerpt ? styles.fieldError : ""}`}>
            <div className={styles.labelRow}>
              <label className={styles.label} htmlFor="excerpt">
                Excerpt
                <span className={styles.optional}>optional</span>
              </label>
              <CharCount value={form.excerpt} max={500} />
            </div>
            <textarea
              id="excerpt"
              className={`${styles.textarea} ${styles.textareaSm}`}
              placeholder="A short summary shown on listing pages and in search results."
              value={form.excerpt}
              onChange={(e) => set("excerpt", e.target.value)}
              maxLength={510}
              rows={3}
            />
            {errors.excerpt && <p className={styles.fieldMsg}>{errors.excerpt}</p>}
          </div>

          {/* Content */}
          <div className={`${styles.field} ${errors.content ? styles.fieldError : ""}`}>
            <div className={styles.labelRow}>
              <label className={styles.label} htmlFor="content">
                Content <span className={styles.required}>*</span>
              </label>
              <span className={styles.charCount}>{form.content.length} chars</span>
            </div>

            {/* Toolbar hint — replace textarea with your rich text editor here */}
            <div className={styles.editorToolbar}>
              <span className={styles.toolbarLabel}>Rich text editor</span>
              <span className={styles.toolbarHint}>
                Replace this textarea with Tiptap / Quill. Pass HTML string to <code>content</code>.
              </span>
            </div>
            <textarea
              id="content"
              className={`${styles.textarea} ${styles.textareaLg}`}
              placeholder="Write your article here. Paste HTML or connect your rich text editor."
              value={form.content}
              onChange={(e) => set("content", e.target.value)}
              rows={16}
            />
            {errors.content && <p className={styles.fieldMsg}>{errors.content}</p>}
          </div>
        </div>

        {/* ── RIGHT: sidebar ── */}
        <aside className={styles.sidebar}>

          {/* Cover image */}
          <div className={styles.sideCard}>
            <p className={styles.sideLabel}>Cover image</p>
            <p className={styles.sideHint}>Shown at the top of the article and in previews.</p>
            <CoverImageInput
              file={form.coverImage}
              onChange={(f) => set("coverImage", f)}
            />
          </div>

          {/* Category */}
          <div className={styles.sideCard}>
            <label className={styles.sideLabel} htmlFor="category">Category</label>
            <p className={styles.sideHint}>Helps readers filter related articles.</p>
            <select
              id="category"
              className={styles.select}
              value={form.categoryId}
              onChange={(e) => set("categoryId", e.target.value)}
            >
              <option value="">— None —</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>

          {/* Tags */}
          {tags.length > 0 && (
            <div className={styles.sideCard}>
              <p className={styles.sideLabel}>Tags</p>
              <p className={styles.sideHint}>Select up to 10 tags.</p>
              <TagSelector
                allTags={tags}
                selected={form.tags}
                onChange={(ids) => set("tags", ids)}
              />
              {form.tags.length > 0 && (
                <p className={styles.tagCount}>{form.tags.length} selected</p>
              )}
            </div>
          )}

          {/* Checklist before publish */}
          <div className={styles.sideCard}>
            <p className={styles.sideLabel}>Before publishing</p>
            <ul className={styles.checklist}>
              <li className={form.title.trim().length >= 3 ? styles.checkDone : styles.checkTodo}>
                Title filled in
              </li>
              <li className={form.excerpt.trim().length > 0 ? styles.checkDone : styles.checkTodo}>
                Excerpt added
              </li>
              <li className={form.coverImage ? styles.checkDone : styles.checkTodo}>
                Cover image uploaded
              </li>
              <li className={form.content.trim().length > 0 ? styles.checkDone : styles.checkTodo}>
                Content written
              </li>
            </ul>
          </div>

        </aside>
      </div>

      {/* ── sticky bottom bar (mobile) ── */}
      <div className={styles.bottomBar}>
        <button
          type="button"
          className={styles.btnSecondary}
          onClick={() => handleSave(false)}
          disabled={saveStatus === "saving"}
        >
          Save draft
        </button>
        <button
          type="button"
          className={styles.btnPrimary}
          onClick={() => handleSave(true)}
          disabled={saveStatus === "saving"}
        >
          Publish
        </button>
      </div>
    </div>
  );
}
