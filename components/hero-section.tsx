import { Button } from "@/components/ui/button"
import { Building2, Users, Award, TrendingUp } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight text-balance">
              Find Your{" "}
              <span className="text-primary">Dream Home</span>
              {" "}In{" "}
              <span className="text-primary">West Bengal</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl leading-relaxed">
              Samriddh Realty brings you the finest curated properties — from luxury apartments to affordable homes — with complete transparency and zero hidden charges.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 px-8">
                Explore Properties
              </Button>
              <Button size="lg" variant="outline" className="border-border text-foreground hover:bg-secondary">
                Learn More
              </Button>
            </div>
          </div>

          {/* Right Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-card border border-border rounded-xl p-6 space-y-3">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Building2 className="w-6 h-6 text-primary" />
              </div>
              <div className="text-3xl font-bold text-foreground">15K+</div>
              <div className="text-muted-foreground">Properties Listed</div>
            </div>
            <div className="bg-card border border-border rounded-xl p-6 space-y-3">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <div className="text-3xl font-bold text-foreground">8K+</div>
              <div className="text-muted-foreground">Happy Clients</div>
            </div>
            <div className="bg-card border border-border rounded-xl p-6 space-y-3">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Award className="w-6 h-6 text-primary" />
              </div>
              <div className="text-3xl font-bold text-foreground">200+</div>
              <div className="text-muted-foreground">Awards Won</div>
            </div>
            <div className="bg-card border border-border rounded-xl p-6 space-y-3">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
              <div className="text-3xl font-bold text-foreground">98%</div>
              <div className="text-muted-foreground">Client Satisfaction</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
