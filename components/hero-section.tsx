"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion";
import { Building2, Users, Award, TrendingUp } from "lucide-react"
import { StatCard } from "@/components/statCard";
import Image from "next/image";
import Link from "next/link";

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const item = {
  hidden: {
    opacity: 0,
    y: 25,
  },
  show: {
    opacity: 1,
    y: 0,
  },
};

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-50 pb-20 px-4 sm:px-6 lg:px-8">
      {/* Decorative Background */}
      {/* <div className="absolute top-0 left-0 right-0 h-28 md:h-36 -z-0 pointer-events-none">
        <Image src="/images/apartment_hero_upper.png" alt="" fill priority sizes="100vw" className="object-cover opacity-30 select-none" />
      </div> */}

      <div className="absolute bottom-0 left-0 right-0 h-28 md:h-36 -z-0 pointer-events-none">
        <Image src="/images/apartment_hero_lower.png" alt="" fill sizes="100vw" className="object-cover opacity-20 select-none" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
              }}
              className="
              text-5xl
              lg:text-7xl
              font-semibold
              leading-[1.05]
              tracking-[-0.02em]
              text-foreground
            ">
              Find Your{" "}
              <span className="text-primary">Dream Home</span>
              {" "}In{" "}
              <br/>
              <span className="text-primary">West Bengal</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: 0.2,
                duration: 0.6,
              }}
              className="text-lg text-muted-foreground max-w-xl leading-relaxed"
            >
              Samriddh Realty brings you the finest curated properties — from luxury apartments to affordable homes — with complete transparency and zero hidden charges.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: 0.35,
                duration: 0.6,
              }}
              className="flex flex-wrap gap-4"
            >
              <Link href="/Projects">
              <Button
                size="lg"
                className="
                  bg-primary
                  text-primary-foreground
                  text-bold
                  hover:bg-[#f59e0b]
                  hover:shadow-[0_4px_20px_rgba(251,191,36,0.35)]
                  active:translate-y-[1px]
                  transition-all
                  duration-150
                  px-8
                "
              >
                Explore Properties
              </Button>
              </Link>
              <Button size="lg" variant="outline" className="border-border text-foreground hover:bg-secondary">
                Learn More
              </Button>
            </motion.div>
          </div>

          {/* Right Stats */}
          {/* <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-4"
          >
            <motion.div
              variants={item}
              className="bg-card border border-border rounded-xl p-6 space-y-3"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Building2 className="w-6 h-6 text-primary" />
              </div>
              <div className="text-3xl font-semibold text-foreground">15K+</div>
              <div className="text-muted-foreground">Properties Listed</div>
            </motion.div>
            <motion.div
              variants={item}
              className="bg-card border border-border rounded-xl p-6 space-y-3"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <div className="text-3xl font-semibold text-foreground">8K+</div>
              <div className="text-muted-foreground">Happy Clients</div>
            </motion.div>
            <motion.div
              variants={item}
              className="bg-card border border-border rounded-xl p-6 space-y-3"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Award className="w-6 h-6 text-primary" />
              </div>
              <div className="text-3xl font-semibold text-foreground">200+</div>
              <div className="text-muted-foreground">Awards Won</div>
            </motion.div>
           <motion.div
              variants={item}
              className="bg-card border border-border rounded-xl p-6 space-y-3"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
              <div className="text-3xl font-semibold text-foreground">98%</div>
              <div className="text-muted-foreground">Client Satisfaction</div>
            </motion.div>
          </motion.div> */}
          {/* <div className="grid grid-cols-2 gap-4"> */}
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-4"
          >
              {/* <motion.div 
                variants={item}
                className="col-span-2 flex items-center justify-end gap-3 mb-2"
              >
                <Image 
                  src="/images/logo.jpeg" 
                  alt="Samriddh" 
                  width={40} 
                  height={40} 
                  className="rounded-lg object-cover"
                />
                <div>
                  <p className="text-sm font-semibold text-foreground">Samriddh Realty</p>
                  <p className="text-xs text-muted-foreground">Trusted since 2015</p>
                </div>
              </motion.div> */}
              <StatCard
                  icon={<Building2 className="w-6 h-6 text-primary" />}
                  value={15000}
                  suffix="+"
                  label="Properties Listed"
              />

              <StatCard
                  icon={<Users className="w-6 h-6 text-primary" />}
                  value={8000}
                  suffix="+"
                  label="Happy Clients"
              />

              <StatCard
                  icon={<Award className="w-6 h-6 text-primary" />}
                  value={200}
                  suffix="+"
                  label="Awards Won"
              />

              <StatCard
                  icon={<TrendingUp className="w-6 h-6 text-primary" />}
                  value={98}
                  suffix="%"
                  label="Client Satisfaction"
              />

          {/* </div> */}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
