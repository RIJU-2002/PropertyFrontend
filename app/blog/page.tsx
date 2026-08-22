// import ArticleGrid from "@/components/blog/ArticleGrid";
import BlogArchive from "@/components/blog/ArticleArchive"
import { Header } from "@/components/header";
// export const metadata = {
//   title: "Blog | Samriddh Realty",
//   description:
//     "Real estate insights, guides, and market updates for Odisha and West Bengal.",
// };

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
