"use client";

import { PropertyCard } from "@/components/property-card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useFeaturedProjects } from "@/hooks/useApi";
import { useSavedProjectIds } from "@/hooks/useSavedProjectIds"; // <-- import
import { PropertyCardSkeleton } from "../components/project-details/property-card-skeleton";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const item: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.96,
    y: 20,
  },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function FeaturedProperties() {
  const { data: properties = [], isLoading: projectsLoading } = useFeaturedProjects();
  const { savedIds } = useSavedProjectIds();

  const showCards = !projectsLoading && properties.length > 0;

  return (
    <section className="relative z-0 py-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#FAF7F2]">
      {/* Background pattern */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgb(255, 187, 0) 1.2px, transparent 1.2px)",
          backgroundSize: "24px 24px",
          maskImage:
            "radial-gradient(ellipse 85% 70% at 50% 45%, black 65%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 85% 70% at 50% 45%, black 65%, transparent 100%)",
        }}
      />

      <div className="max-w-7xl mx-auto relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12"
        >
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/25 bg-[#D4AF37]/8 px-4 py-1.5 mb-5">
              <span className="w-2 h-2 rounded-full bg-[#D4AF37]" />
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#B8860B]">
                Featured Properties
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-semibold text-[#0D1B2A]">
              Our Best Options
            </h2>
            <p className="text-[#5C4A2E] mt-2 max-w-xl">
              Explore our hand-picked selection of premium properties available
            </p>
          </div>
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Link href="/Projects" className="self-start sm:self-auto">
              <Button
                variant="outline"
                className="group h-12 rounded-full px-7 border-2 border-[#D4AF37]/30 bg-white/80 backdrop-blur-md text-[#8B6914] font-semibold hover:bg-[#D4AF37] hover:text-white hover:border-[#D4AF37] transition-all duration-300 hover:shadow-[0_10px_30px_rgba(212,175,55,0.25)] hover:-translate-y-0.5"
              >
                Explore Properties
                <ArrowRight className="ml-2 h-4 w-4 transition-all duration-300 group-hover:translate-x-1" />
              </Button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Properties Grid */}
        {projectsLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, index) => (
              <PropertyCardSkeleton key={index} />
            ))}
          </div>
        ) : (
          <motion.div
            key="featured-grid"
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {showCards
              ? properties.map((project) => (
                <motion.div
                  key={project.id}
                  variants={item}
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.25 }}
                  className="rounded-xl transition-shadow duration-300 hover:shadow-xl hover:shadow-[rgba(201,168,76,0.12)]"
                >
                  <PropertyCard
                    projectId={project.id}
                    image={project.images[0]?.url ?? "/placeholder.jpg"}
                    title={project.name}
                    location={`${project.locality.name}, ${project.city.name}`}
                    type="Apartment"
                    featured={project.isFeatured}
                    configs={project.configs}
                    slug={project.slug}
                    initialSaved={savedIds.has(project.id)}
                  />
                </motion.div>
              ))
              : (
                <p className="col-span-full text-center text-[#5C4A2E]">
                  No featured projects yet.
                </p>
              )}
          </motion.div>
        )}
      </div>
    </section>
  );
}
