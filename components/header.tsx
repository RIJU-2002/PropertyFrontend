"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { useState } from "react"
import { ThemeToggle } from "@/components/theme-toggle"
import { CitySelector } from "@/components/city-selector"
import { useAuth } from "@/hooks/useAuth";


export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { isAuthenticated, user } = useAuth();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-3">
            <Image 
              src="/images/logo.jpeg" 
              alt="Samriddh Logo" 
              width={50} 
              height={50}
              className="rounded"
            />
            {/* <span className="text-l font-semibold text-foreground tracking-widest uppercase">Samriddh Realty</span> */}
            <div className="flex flex-col leading-tight">
              <span className="text-lg font-bold tracking-wider uppercase">
                Samriddh Realty
              </span>

              <span className="text-[7px] uppercase tracking-[0.2em] text-muted-foreground">
                Authorised Marketing Partner
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <CitySelector />
            <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              Projects
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              New Launch🔥
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              Ready to Move
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              Loan Calculator
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              About
            </Link>
          </nav>

          <div className="hidden md:flex items-center gap-2">
            <ThemeToggle />
            <Button variant="ghost" className="text-muted-foreground hover:text-foreground" asChild>
              {isAuthenticated ? (
                <Link href="/cms">
                  Profile
                </Link>
              ) : (
                <Link href="/auth">
                  Sign In
                </Link>
              )}
            </Button>
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90" asChild>
              {/* <Link href="/auth">Get Started</Link> */}
              {user?.role === "ADMIN" && (
                <Link
                  href="/admin"
                >
                  Admin Hub
                </Link>
              )}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-foreground"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <nav className="flex flex-col gap-4">
              <div className="pb-2">
                <CitySelector />
              </div>
              <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                Buy
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                New Launch🔥
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                Ready to Move
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                Loan Calculator
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                About
              </Link>
              <div className="flex flex-col gap-2 pt-4 border-t border-border">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground text-sm">Theme</span>
                  <ThemeToggle />
                </div>
                <Button variant="ghost" className="justify-start text-muted-foreground" asChild>
                  {isAuthenticated ? (
                    <Link href="/cms">
                      Profile
                    </Link>
                  ) : (
                    <Link href="/auth">
                      Sign In
                    </Link>
                  )}
                </Button>
                <Button className="bg-primary text-primary-foreground" asChild>
                  {/* <Link href="/auth">Get Started</Link> */}
                  {user?.role === "ADMIN" && (
                    <Link
                      href="/admin"
                    >
                      Admin Hub
                    </Link>
                  )}
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
