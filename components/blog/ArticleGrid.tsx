"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import styles from "./ArticleGrid.module.css";
import type { ArticleSummary } from "@/lib/api/types";
import { usePublishedArticles } from "@/hooks/useApi";

export type { ArticleSummary };

interface ArticleGridProps {
  /** Pre-fetched articles (SSR / RSC usage). */
  articles?: ArticleSummary[];
  heading?: string;
  subheading?: string;
  /** Max articles to show. Default: 6 */
  limit?: number;
  /** Show category filter tabs */
  showFilter?: boolean;
}

// ─── helpers ──────────────────────────────────────────────────────────────────

function formatDate(iso: string | null) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

// ─── sub-component: article card ─────────────────────────────────────────────

function ArticleCard({ article, featured }: { article: ArticleSummary; featured?: boolean }) {
  return (
    <Link href={`/blog/${article.slug}`} className={`${styles.card} ${featured ? styles.featured : ""}`}>
      <div className={styles.cardImage}>
        {article.coverImage ? (
          <Image
            src={article.coverImage}
            alt={article.title}
            fill
            sizes={featured ? "700px" : "400px"}
            className={styles.img}
          />
        ) : (
          <div className={styles.imgPlaceholder}>
            <span>SR</span>
          </div>
        )}
        {article.category && (
          <span className={styles.categoryBadge}>{article.category.name}</span>
        )}
      </div>

      <div className={styles.cardBody}>
        <div className={styles.meta}>
          <span>{formatDate(article.publishedAt)}</span>
          {article.readTimeMin && (
            <>
              <span className={styles.dot}>·</span>
              <span>{article.readTimeMin} min read</span>
            </>
          )}
        </div>

        <h3 className={styles.cardTitle}>{article.title}</h3>

        {article.excerpt && (
          <p className={styles.cardExcerpt}>{article.excerpt}</p>
        )}

        <span className={styles.readMore}>
          Read article
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </span>
      </div>
    </Link>
  );
}

// ─── main component ───────────────────────────────────────────────────────────

export default function ArticleGrid({
  heading = "Insights & Guides",
  subheading = "Real estate advice, market updates, and property guides for Odisha and West Bengal.",
  limit = 6,
  showFilter = true,
}: ArticleGridProps) {
 const { data, isLoading } = usePublishedArticles({
  limit,
  });
  const articles = data?.articles ?? [];
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const categories = Array.from(
  new Map(
    articles
      .filter((a) => a.category)
      .map((a) => [a.category!.slug, a.category!])
  ).values()
  );

  

  const filtered =
    activeCategory === "all"
      ? articles
      : articles.filter((a) => a.category?.slug === activeCategory);

  const [featured, ...rest] = filtered;

  return (
    <section className={styles.section}>
      <div className={styles.sectionHeader}>
        <div className={styles.eyebrow}>Blog</div>
        <h2 className={styles.heading}>{heading}</h2>
        <p className={styles.subheading}>{subheading}</p>
      </div>

      {showFilter && categories.length > 0 && (
        <div className={styles.filterRow}>
          <button
            className={`${styles.filterBtn} ${activeCategory === "all" ? styles.activeFilter : ""}`}
            onClick={() => setActiveCategory("all")}
          >
            All
          </button>
          {categories.map((c) => (
            <button
              key={c.slug}
              className={`${styles.filterBtn} ${activeCategory === c.slug ? styles.activeFilter : ""}`}
              onClick={() => setActiveCategory(c.slug)}
            >
              {c.name}
            </button>
          ))}
        </div>
      )}

      {isLoading ? (
        <div className={styles.skeletonGrid}>
          {Array.from({ length: limit }).map((_, i) => (
            <div key={i} className={styles.skeleton} />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <p className={styles.empty}>No articles yet. Check back soon.</p>
      ) : (
        <div className={styles.grid}>
          {featured && <ArticleCard article={featured} featured />}
          <div className={styles.secondaryGrid}>
            {rest.slice(0, 5).map((a) => (
              <ArticleCard key={a.id} article={a} />
            ))}
          </div>
        </div>
      )}

      <div className={styles.viewAll}>
        <Link href="/blog" className={styles.viewAllBtn}>
          View all articles
        </Link>
      </div>
    </section>
  );
}
