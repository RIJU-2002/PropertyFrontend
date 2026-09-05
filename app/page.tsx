
import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { SearchBar } from "@/components/search-bar"
import { FeaturedProperties } from "@/components/featured-properties"
import { Footer } from "@/components/footer"
// import ArticleGrid from "@/components/blog/ArticleGrid"
import { ArticleCards } from "@/components/blog/ArticleCards"
import HomeLoanSection from "@/components/HomeLoanSection"
import {ExploreProjects} from "@/components/exploreProjects"
import { TrustRibbon } from "@/components/trustRibbon"
import { CrissCrossBand } from "@/components/crossBand"

export default function Home() {
  
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <SearchBar />
      <FeaturedProperties />
      <CrissCrossBand/>
      <section id="loan-calculator">
        <HomeLoanSection/>
      </section>
      {/* <ArticleGrid
        heading="Latest Insights"
        subheading="Real estate advice, market updates, and buying guides."
        limit={3}
      /> */}
      <TrustRibbon/>
      <ExploreProjects/>
      <ArticleCards/>
      <Footer />
    </main>
  )
}
