import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { SearchBar } from "@/components/search-bar"
import { FeaturedProperties } from "@/components/featured-properties"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <SearchBar />
      <FeaturedProperties />
      <Footer />
    </main>
  )
}
