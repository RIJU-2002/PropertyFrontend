"use client";

import Link from "next/link";
import Image from "next/image";
import styles from "./ArticleGrid.module.css";
import type { ArticleSummary } from "@/lib/api/types";

function formatDate(date: string | null) {
  if (!date) return "";

  return new Date(date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

interface Props {
  article: ArticleSummary;
  featured?: boolean;
}

export default function ArticleBlocks({
  article,
  featured = false,
}: Props) {
  return (
    <Link
      href={`/blog/${article.slug}`}
      className={`${styles.card} ${featured ? styles.featured : ""}`}
    >
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
          <span className={styles.categoryBadge}>
            {article.category.name}
          </span>
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

        <h3 className={styles.cardTitle}>
          {article.title}
        </h3>

        {article.excerpt && (
          <p className={styles.cardExcerpt}>
            {article.excerpt}
          </p>
        )}

        <span className={styles.readMore}>
          Read article

          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
          >
            <path
              d="M2 7h10M8 3l4 4-4 4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </div>
    </Link>
  );
}
