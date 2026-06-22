import { PropertyCard } from "@/components/property-card"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link";


const properties = [
  {
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop",
    title: "Modern Luxury Villa",
    location: "Beverly Hills, CA",
    price: "$4,500",
    beds: 4,
    baths: 3,
    sqft: 3200,
    type: "Villa",
    featured: true,
  },
  {
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop",
    title: "Contemporary Townhouse",
    location: "Manhattan, NY",
    price: "$3,200",
    beds: 3,
    baths: 2,
    sqft: 2100,
    type: "Townhouse",
    featured: false,
  },
  {
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop",
    title: "Elegant Apartment",
    location: "San Francisco, CA",
    price: "$2,800",
    beds: 2,
    baths: 2,
    sqft: 1500,
    type: "Apartment",
    featured: true,
  },
  {
    image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop",
    title: "Coastal Beach House",
    location: "Miami Beach, FL",
    price: "$5,200",
    beds: 5,
    baths: 4,
    sqft: 4000,
    type: "House",
    featured: false,
  },
  {
    image: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&h=600&fit=crop",
    title: "Urban Loft",
    location: "Chicago, IL",
    price: "$1,900",
    beds: 1,
    baths: 1,
    sqft: 950,
    type: "Condo",
    featured: false,
  },
  {
    image: "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=800&h=600&fit=crop",
    title: "Mountain View Estate",
    location: "Denver, CO",
    price: "$3,800",
    beds: 4,
    baths: 3,
    sqft: 2800,
    type: "House",
    featured: true,
  },
]

export function FeaturedProperties() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
              Featured Properties
            </h2>
            <p className="text-muted-foreground mt-2 max-w-xl">
              Explore our hand-picked selection of premium properties available for rent
            </p>
          </div>
          <Link href="/Projects">
          <Button variant="outline" className="border-border text-foreground hover:bg-secondary self-start sm:self-auto">
            View All Properties
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
          </Link>
        </div>

        {/* Properties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property, index) => (
            <PropertyCard key={index} {...property} />
          ))}
        </div>
      </div>
    </section>
  )
}
