import type { Metadata } from "next";
import BlogArchive from "@/components/blog/ArticleArchive"
import { Header } from "@/components/header";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Real estate insights, guides, and market updates from Samriddh.",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  return (
    <main>
      {/* <ArticleGrid
        heading="Insights & Guides"
        subheading="Real estate advice, market updates, and property guides for Odisha and West Bengal."
        limit={9}
        showFilter
      /> */}
      <Header/>
      <BlogArchive/>
    </main>
  );
}
