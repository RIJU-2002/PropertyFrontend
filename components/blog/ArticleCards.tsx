"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { usePublishedArticles } from "@/hooks/useApi";
import ArticleCardSkeleton from "./ArticleSkeleton";
import ArticleBlocks from "./ArticleBlocks";
import { motion } from "framer-motion";

export function ArticleCards() {
  const { data, isLoading } = usePublishedArticles({});
  const articles = data?.articles ?? [];

  return (
    <section className="relative isolate overflow-hidden py-20 px-4 sm:px-6 lg:px-8">

      {/* ---------- BACKGROUND ---------- */}

      <div className="absolute inset-0 -z-10 pointer-events-none">

        {/* LEFT GOLDEN MESH */}
        <motion.div
          animate={{
            x: [0, 40, 0],
            opacity: [0.55, 0.8, 0.55],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute inset-0"
          style={{
            backgroundImage: `
              repeating-linear-gradient(
                -25deg,
                rgba(212,175,55,0.18) 0px,
                rgba(212,175,55,0.18) 1px,
                transparent 1px,
                transparent 32px
              ),
              repeating-linear-gradient(
                25deg,
                rgba(212,175,55,0.12) 0px,
                rgba(212,175,55,0.12) 1px,
                transparent 1px,
                transparent 32px
              )
            `,
            WebkitMaskImage:
              "linear-gradient(to right, black 0%, black 42%, transparent 100%)",
            maskImage:
              "linear-gradient(to right, black 0%, black 42%, transparent 100%)",
          }}
        />

        {/* BLOB 1 */}
        <motion.div
          animate={{
            x: [0, 60, -20, 0],
            y: [0, -40, 20, 0],
            scale: [1, 1.1, 0.95, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -top-40 -left-40 w-[520px] h-[520px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(212,175,55,0.32) 0%, rgba(212,175,55,0.14) 45%, transparent 72%)",
            filter: "blur(120px)",
          }}
        />

        {/* BLOB 2 */}
        <motion.div
          animate={{
            x: [0, -40, 30, 0],
            y: [0, 50, -30, 0],
            scale: [1, 0.9, 1.08, 1],
          }}
          transition={{
            duration: 24,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-[-180px] right-[-120px] w-[460px] h-[460px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(245,190,35,0.22) 0%, rgba(245,190,35,0.08) 45%, transparent 75%)",
            filter: "blur(140px)",
          }}
        />

        {/* CENTER LIGHT */}
        <motion.div
          animate={{
            scale: [1, 1.08, 0.94, 1],
            opacity: [0.2, 0.35, 0.2],
          }}
          transition={{
            duration: 16,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(255,220,90,0.28) 0%, transparent 70%)",
            filter: "blur(90px)",
          }}
        />

        {/* DOT GRID */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "radial-gradient(circle,#B78C16 1px,transparent 1px)",
            backgroundSize: "30px 30px",
          }}
        />
      </div>

      {/* ---------- CONTENT ---------- */}

      <div className="max-w-7xl mx-auto relative">
        <div className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/25 bg-[#D4AF37]/8 px-4 py-1.5 mb-5">
          <span className="w-2 h-2 rounded-full bg-[#D4AF37]" />
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#B8860B]">
              Resources
          </span>
      </div>

        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">

          <div>
            <h2 className="text-4xl sm:text-5xl font-black tracking-[-0.03em] text-foreground leading-tight">
              Latest Insights
            </h2>

            <p className="mt-4 max-w-2xl text-base text-muted-foreground leading-7">
              Market trends, buying guides, investment advice and expert tips to help you
              make smarter real estate decisions.
            </p>
          </div>

          <Link href="/blog" className="self-start sm:self-auto">
            <Button
              variant="outline"
              className="
                group
                h-12
                rounded-full
                px-7
                border-2
                border-[#D4AF37]/30
                bg-white/80
                backdrop-blur-md
                text-[#8B6914]
                font-semibold
                hover:bg-[#D4AF37]
                hover:text-white
                hover:border-[#D4AF37]
                transition-all
                duration-300
                hover:shadow-[0_10px_30px_rgba(212,175,55,0.25)]
                hover:-translate-y-0.5
              "
            >
              Explore Articles

              <ArrowRight
                className="
                  ml-2
                  h-4
                  w-4
                  transition-all
                  duration-300
                  group-hover:translate-x-1
                "
              />
            </Button>
          </Link>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {isLoading
            ? Array.from({ length: 3 }).map((_, i) => (
                <ArticleCardSkeleton key={i} />
              ))
            : articles.map((article) => (
                <div
                  key={article.id}
                  className="rounded-2xl transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
                >
                  <ArticleBlocks article={article} />
                </div>
              ))}
        </div>

      </div>
    </section>
  );
}
