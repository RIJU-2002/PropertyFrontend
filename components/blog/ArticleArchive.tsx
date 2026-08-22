"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import styles from "./BlogArchive.module.css";

import { usePublishedArticles } from "@/hooks/useApi";
import ArticleBlocks from "./ArticleBlocks";
import ArticleSkeleton from "./ArticleSkeleton";

export default function BlogArchive() {
  const [page, setPage] = useState(1);
  const [activeCategory, setActiveCategory] = useState("all");
  const [search, setSearch] = useState("");

  const limit = 9;

  const { data, isLoading, isError } = usePublishedArticles({
    page,
    limit,
  });

  const articles = data?.articles ?? [];
  const pagination = data?.pagination;

  const categories = useMemo(() => {
    const map = new Map<string, { name: string; slug: string }>();

    articles.forEach((article) => {
      if (article.category) {
        map.set(article.category.slug, article.category);
      }
    });

    return Array.from(map.values());
  }, [articles]);

  const filteredArticles = useMemo(() => {
    return articles.filter((article) => {
      const categoryMatch =
        activeCategory === "all" ||
        article.category?.slug === activeCategory;

      const keyword = search.trim().toLowerCase();

      const searchMatch =
        keyword === "" ||
        article.title.toLowerCase().includes(keyword) ||
        article.excerpt?.toLowerCase().includes(keyword);

      return categoryMatch && searchMatch;
    });
  }, [articles, activeCategory, search]);

  return (
    <section className={styles.blogSection}>
      {/* Subtle ambient background glow */}
      <div className={styles.ambientGlow} aria-hidden="true" />

      <div className={styles.container}>
        {/* ── Hero ────────────────────────────────────────── */}
        <div className={styles.hero}>
          <div className={styles.heroPattern} aria-hidden="true" />
          <span className={styles.eyebrow}>BLOG</span>
          <h1 className={styles.title}>
            Insights, Guides & Market Updates
          </h1>
          <p className={styles.description}>
            Stay informed with expert real estate advice,
            buying guides, investment tips, and the latest
            property market trends across Odisha and
            West Bengal.
          </p>
        </div>

        {/* ── Toolbar ─────────────────────────────────────── */}
        <div className={styles.toolbar}>
          <div className={styles.searchBox}>
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M21 21l-4.3-4.3"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <circle
                cx="11"
                cy="11"
                r="7"
                stroke="currentColor"
                strokeWidth="2"
              />
            </svg>
            <input
              type="text"
              placeholder="Search articles..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className={styles.results}>
            {pagination?.total ?? filteredArticles.length} Articles
          </div>
        </div>

        {/* ── Filters ─────────────────────────────────────── */}
        {categories.length > 0 && (
          <div className={styles.filters}>
            <button
              onClick={() => setActiveCategory("all")}
              className={`${styles.filterButton} ${
                activeCategory === "all" ? styles.active : ""
              }`}
            >
              All
            </button>
            {categories.map((category) => (
              <button
                key={category.slug}
                onClick={() => setActiveCategory(category.slug)}
                className={`${styles.filterButton} ${
                  activeCategory === category.slug ? styles.active : ""
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        )}

        {/* ── Content ─────────────────────────────────────── */}
        {isLoading ? (
          <div className={styles.grid}>
            {Array.from({ length: limit }).map((_, index) => (
              <ArticleSkeleton key={index} />
            ))}
          </div>
        ) : isError ? (
          <div className={styles.emptyState}>
            <h3>Unable to load articles.</h3>
            <p>Something went wrong while loading the latest blog posts.</p>
          </div>
        ) : filteredArticles.length === 0 ? (
          <div className={styles.emptyState}>
            <h3>No articles found.</h3>
            <p>Try changing your search or category.</p>
          </div>
        ) : (
          <>
            <div className={styles.grid}>
              {filteredArticles.map((article) => (
                <ArticleBlocks key={article.id} article={article} />
              ))}
            </div>

            {pagination && Number(pagination.totalPages) > 1 && (
              <div className={styles.pagination}>
                <button
                  className={styles.pageButton}
                  disabled={page === 1}
                  onClick={() => setPage((prev) => prev - 1)}
                >
                  Previous
                </button>

                <div className={styles.pageNumbers}>
                  {Array.from(
                    { length: Number(pagination.totalPages) },
                    (_, index) => {
                      const pageNumber = index + 1;
                      return (
                        <button
                          key={pageNumber}
                          className={`${styles.pageNumber} ${
                            page === pageNumber ? styles.activePage : ""
                          }`}
                          onClick={() => setPage(pageNumber)}
                        >
                          {pageNumber}
                        </button>
                      );
                    }
                  )}
                </div>

                <button
                  className={styles.pageButton}
                  disabled={page === Number(pagination.totalPages)}
                  onClick={() => setPage((prev) => prev + 1)}
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}

        {/* ── Newsletter CTA ──────────────────────────────── */}
        <div className={styles.newsletter}>
          <div className={styles.newsletterPattern} aria-hidden="true" />
          <div className={styles.newsletterContent}>
            <span className={styles.newsletterTag}>Stay Updated</span>
            <h2>Looking for your next property?</h2>
            <p>
              Explore our latest residential and commercial
              listings while staying informed with expert
              market insights.
            </p>
          </div>
          <Link href="/Projects" className={styles.ctaButton}>
            Explore Projects
          </Link>
        </div>
      </div>
    </section>
  );
}
