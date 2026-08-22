"use client"

import { createContext, useContext, useState, ReactNode } from "react"

export const cities = [
  { value: "all", label: "All Cities" },
  { value: "mumbai", label: "Mumbai" },
  { value: "delhi", label: "Delhi" },
  { value: "bangalore", label: "Bangalore" },
  { value: "hyderabad", label: "Hyderabad" },
  { value: "chennai", label: "Chennai" },
  { value: "pune", label: "Pune" },
  { value: "kolkata", label: "Kolkata" },
  { value: "ahmedabad", label: "Ahmedabad" },
  { value: "jaipur", label: "Jaipur" },
  { value: "lucknow", label: "Lucknow" },
  { value: "chandigarh", label: "Chandigarh" },
  { value: "gurgaon", label: "Gurgaon" },
  { value: "noida", label: "Noida" },
  { value: "goa", label: "Goa" },
]

type CityContextType = {
  selectedCity: string
  setSelectedCity: (city: string) => void
  getCityLabel: (value: string) => string
}

const CityContext = createContext<CityContextType | undefined>(undefined)

export function CityProvider({ children }: { children: ReactNode }) {
  const [selectedCity, setSelectedCity] = useState("all")

  const getCityLabel = (value: string) => {
    return cities.find((city) => city.value === value)?.label || "All Cities"
  }

  return (
    <CityContext.Provider value={{ selectedCity, setSelectedCity, getCityLabel }}>
      {children}
    </CityContext.Provider>
  )
}

export function useCity() {
  const context = useContext(CityContext)
  if (context === undefined) {
    throw new Error("useCity must be used within a CityProvider")
  }
  return context
}
