import { notFound } from "next/navigation";
import ArticlePage from "@/components/blog/ArticlePage";
import type { ArticleDetail } from  "@/lib/api/types"
import { API_BASE } from "@/lib/apiUrl";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  try {
    const res = await fetch(`${API_BASE}articles/public?limit=100`);
    if (!res.ok) return [];
    const data = await res.json();
    return (data.articles ?? []).map((article: { slug: string }) => ({
      slug: article.slug,
    }));
  } catch {
    return [];
  }
}

export const revalidate = 600;

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;

  try {
    const res = await fetch(`${API_BASE}articles/public/${slug}`);
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
  } catch {
    return { title: "Article not found" };
  }
}

export default async function ArticleDetailPage({ params }: Props) {
  const { slug } = await params;

  const res = await fetch(`${API_BASE}articles/public/${slug}`, {
    next: { revalidate: 600 },
  });

  if (!res.ok) notFound();

  const data = await res.json();
  const article: ArticleDetail = data.data;

  let relatedArticles: ArticleDetail[] = [];
  if (article.category) {
    const relRes = await fetch(
      `${API_BASE}articles/public?categoryId=${article.category.slug}&limit=4`
    );
    if (relRes.ok) {
      const relData = await relRes.json();
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
