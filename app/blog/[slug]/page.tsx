import { notFound } from "next/navigation";
import ArticlePage from "@/components/blog/ArticlePage";
// import type { ArticleDetail } from "@/components/article/ArticlePage";
import type { ArticleDetail } from  "@/lib/api/types"

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

// Generate static paths for all published articles at build time
export async function generateStaticParams() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}articles/public?limit=100`
  );

  const data = await res.json();

  return (data.articles ?? []).map((article: { slug: string }) => ({
    slug: article.slug,
  }));
}
// ISR: re-generate pages every 10 minutes
export const revalidate = 600;

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}articles/public/${slug}`
  );
  if (!res.ok) return { title: "Article not found" };
  const data = await res.json();
  const article: ArticleDetail = data.data;

  return {
    title: `${article.title} | Samriddh Realty Blog`,
    description: article.excerpt ?? undefined,
    openGraph: {
      title: article.title,
      description: article.excerpt ?? undefined,
      images: article.coverImage ? [article.coverImage] : [],
    },
  };
}

export default async function ArticleDetailPage({ params }: Props) {
  const { slug } = await params;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}articles/public/${slug}`,
    {
      next: { revalidate: 600 },
    }
  );

  if (!res.ok) notFound();

  const data = await res.json();
  const article: ArticleDetail = data.data;

  // Fetch related articles from same category (best-effort)
  let relatedArticles: ArticleDetail[] = [];
  if (article.category) {
    const relRes = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}articles/public?categoryId=${article.category.slug}&limit=4`
    );
    if (relRes.ok) {
      const relData = await relRes.json();
      // exclude current article
      relatedArticles = (relData.articles ?? []).filter(
        (a: ArticleDetail) => a.id !== article.id
      );
    }
  }

  return (
    <main>
      <ArticlePage article={article} relatedArticles={relatedArticles} />
    </main>
  );
}