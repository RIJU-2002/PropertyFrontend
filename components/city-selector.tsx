"use client"

import { MapPin } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useCity, cities } from "@/contexts/city-context"

export function CitySelector() {
  const { selectedCity, setSelectedCity } = useCity()

  return (
    <Select value={selectedCity} onValueChange={setSelectedCity}>
      <SelectTrigger className="w-[160px] bg-secondary/50 border-border">
        <MapPin className="w-4 h-4 mr-2 text-primary" />
        <SelectValue placeholder="Select City" />
      </SelectTrigger>
      <SelectContent>
        {cities.map((city) => (
          <SelectItem key={city.value} value={city.value}>
            {city.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}