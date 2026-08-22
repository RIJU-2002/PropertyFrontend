"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./ArticlePage.module.css";
import type { ArticleDetail } from "@/lib/api/types";

export type { ArticleDetail };

interface ArticlePageProps {
  /** Pass the article directly (SSR / RSC) */
  article?: ArticleDetail;
  /** Or fetch by slug client-side */
  slug?: string;
  apiUrl?: string;
  /** Related articles to show at the bottom */
  relatedArticles?: ArticleDetail[];
}

// ─── helpers ──────────────────────────────────────────────────────────────────

function formatDate(iso: string | null) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

// ─── reading progress bar ─────────────────────────────────────────────────────

function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const el = document.documentElement;
      const scrollTop = el.scrollTop || document.body.scrollTop;
      const scrollHeight = el.scrollHeight - el.clientHeight;
      setProgress(scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={styles.progressBar} style={{ width: `${progress}%` }} aria-hidden />
  );
}

// ─── share button ─────────────────────────────────────────────────────────────

function ShareButtons({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);
  const url = typeof window !== "undefined" ? window.location.href : "";

  const copy = () => {
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className={styles.shareRow}>
      <span className={styles.shareLabel}>Share</span>
      <button className={styles.shareBtn} onClick={copy} title="Copy link">
        {copied ? (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M3 8l3.5 3.5L13 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        ) : (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <rect x="5" y="1" width="8" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M3 5H2a1 1 0 00-1 1v8a1 1 0 001 1h8a1 1 0 001-1v-1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        )}
      </button>
      <a
        className={styles.shareBtn}
        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`}
        target="_blank"
        rel="noopener noreferrer"
        title="Share on X"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75zm-.86 13.028h1.36L4.323 2.145H2.865z"/>
        </svg>
      </a>
      <a
        className={styles.shareBtn}
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`}
        target="_blank"
        rel="noopener noreferrer"
        title="Share on LinkedIn"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z"/>
        </svg>
      </a>
    </div>
  );
}

// ─── table of contents ────────────────────────────────────────────────────────

function useHeadings(content: string) {
  const matches = [...content.matchAll(/<h([23])[^>]*id="([^"]*)"[^>]*>(.*?)<\/h[23]>/gi)];
  return matches.map((m) => ({
    level: parseInt(m[1]),
    id: m[2],
    text: m[3].replace(/<[^>]+>/g, ""),
  }));
}

// ─── main component ───────────────────────────────────────────────────────────

export default function ArticlePage({
  article: propArticle,
  slug,
  apiUrl,
  relatedArticles = [],
}: ArticlePageProps) {
  const [article, setArticle] = useState<ArticleDetail | null>(propArticle ?? null);
  const [loading, setLoading] = useState(!propArticle && !!slug);
  const [activeHeading, setActiveHeading] = useState("");
  const contentRef = useRef<HTMLDivElement>(null);
  const toc = useHeadings(article?.content ?? "");

  // fetch if not SSR
  useEffect(() => {
    if (!slug || !apiUrl || propArticle) return;
    setLoading(true);
    fetch(`${apiUrl}/public/${slug}`)
      .then((r) => r.json())
      .then((data) => setArticle(data.data ?? null))
      .finally(() => setLoading(false));
  }, [slug, apiUrl, propArticle]);

  // scroll spy for TOC
  useEffect(() => {
    if (!toc.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveHeading(e.target.id);
        });
      },
      { rootMargin: "-20% 0px -70% 0px" }
    );
    toc.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [toc]);

  if (loading) {
    return (
      <div className={styles.loadingWrap}>
        <div className={styles.loadingPulse} />
        <div className={styles.loadingPulse} style={{ width: "60%", height: 20 }} />
        <div className={styles.loadingPulse} style={{ height: 400 }} />
      </div>
    );
  }

  if (!article) {
    return (
      <div className={styles.notFound}>
        <h2>Article not found</h2>
        <Link href="/blog">← Back to Blog</Link>
      </div>
    );
  }

  return (
    <>
      <ReadingProgress />

      <article className={styles.article}>
        {/* ── hero ── */}
        <header className={styles.hero}>
          <div className={styles.heroInner}>
            {article.category && (
              <Link href={`/blog?category=${article.category.slug}`} className={styles.categoryPill}>
                {article.category.name}
              </Link>
            )}
            <h1 className={styles.title}>{article.title}</h1>
            {article.excerpt && <p className={styles.excerpt}>{article.excerpt}</p>}

            <div className={styles.heroMeta}>
              <span>{formatDate(article.publishedAt)}</span>
              {article.readTimeMin && (
                <>
                  <span className={styles.metaDot}>·</span>
                  <span>{article.readTimeMin} min read</span>
                </>
              )}
              <span className={styles.metaDot}>·</span>
              <span>{article.views.toLocaleString("en-IN")} views</span>
            </div>
          </div>
        </header>

        {/* ── cover image ── */}
        {article.coverImage && (
          <div className={styles.coverWrap}>
            <div className={styles.coverImage}>
              <Image
                src={article.coverImage}
                alt={article.title}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 900px"
                className={styles.coverImg}
              />
            </div>
          </div>
        )}

        {/* ── body: sidebar + content ── */}
        <div className={styles.body}>
          {/* TOC sidebar */}
          {toc.length > 2 && (
            <aside className={styles.toc}>
              <div className={styles.tocInner}>
                <p className={styles.tocTitle}>Contents</p>
                <ul className={styles.tocList}>
                  {toc.map(({ id, text, level }) => (
                    <li key={id} className={`${styles.tocItem} ${level === 3 ? styles.tocSub : ""}`}>
                      <a
                        href={`#${id}`}
                        className={`${styles.tocLink} ${activeHeading === id ? styles.tocActive : ""}`}
                      >
                        {text}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          )}

          {/* content */}
          <div className={styles.contentWrap}>
            <div
              ref={contentRef}
              className={styles.content}
              dangerouslySetInnerHTML={{ __html: article.content }}
            />

            {/* tags */}
            {article.tags.length > 0 && (
              <div className={styles.tagsRow}>
                {article.tags.map((tag) => (
                  <Link key={tag.id} href={`/blog?tag=${tag.slug}`} className={styles.tag}>
                    #{tag.name}
                  </Link>
                ))}
              </div>
            )}

            <ShareButtons title={article.title} />
          </div>
        </div>

        {/* ── related articles ── */}
        {relatedArticles.length > 0 && (
          <section className={styles.related}>
            <h2 className={styles.relatedHeading}>Related articles</h2>
            <div className={styles.relatedGrid}>
              {relatedArticles.slice(0, 3).map((a) => (
                <Link key={a.id} href={`/blog/${a.slug}`} className={styles.relatedCard}>
                  {a.coverImage && (
                    <div className={styles.relatedImage}>
                      <Image src={a.coverImage} alt={a.title} fill sizes="300px" className={styles.relatedImg} />
                    </div>
                  )}
                  <div className={styles.relatedBody}>
                    {a.category && <span className={styles.relatedCategory}>{a.category.name}</span>}
                    <p className={styles.relatedTitle}>{a.title}</p>
                    <span className={styles.relatedMeta}>{formatDate(a.publishedAt)} · {a.readTimeMin} min</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </article>
    </>
  );
}
