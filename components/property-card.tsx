import Image from "next/image"
import { Button } from "@/components/ui/button"
import { BedDouble, Bath, Square, MapPin, Heart } from "lucide-react"

interface PropertyCardProps {
  image: string
  title: string
  location: string
  price: string
  beds: number
  baths: number
  sqft: number
  type: string
  featured?: boolean
}

export function PropertyCard({
  image,
  title,
  location,
  price,
  beds,
  baths,
  sqft,
  type,
  featured = false,
}: PropertyCardProps) {
  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden group hover:border-primary/50 transition-colors">
      {/* Image */}
      <div className="relative h-56 overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 left-4 flex gap-2">
          {featured && (
            <span className="bg-primary text-primary-foreground text-xs font-medium px-3 py-1 rounded-full">
              Featured
            </span>
          )}
          <span className="bg-secondary text-secondary-foreground text-xs font-medium px-3 py-1 rounded-full">
            {type}
          </span>
        </div>
        <button className="absolute top-4 right-4 w-9 h-9 bg-background/80 backdrop-blur-sm rounded-full flex items-center justify-center text-muted-foreground hover:text-primary transition-colors">
          <Heart className="w-5 h-5" />
        </button>
      </div>

      {/* Content */}
      <div className="p-5 space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
            {title}
          </h3>
          <div className="flex items-center gap-1 text-muted-foreground text-sm mt-1">
            <MapPin className="w-4 h-4" />
            <span>{location}</span>
          </div>
        </div>

        <div className="flex items-center gap-4 text-muted-foreground text-sm">
          <div className="flex items-center gap-1">
            <BedDouble className="w-4 h-4" />
            <span>{beds} Beds</span>
          </div>
          <div className="flex items-center gap-1">
            <Bath className="w-4 h-4" />
            <span>{baths} Baths</span>
          </div>
          <div className="flex items-center gap-1">
            <Square className="w-4 h-4" />
            <span>{sqft.toLocaleString()} sqft</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div>
            <span className="text-2xl font-bold text-primary">{price}</span>
            <span className="text-muted-foreground text-sm">/mo</span>
          </div>
          <Button variant="outline" className="border-border text-foreground hover:bg-secondary">
            View Details
          </Button>
        </div>
      </div>
    </div>
  )
}
