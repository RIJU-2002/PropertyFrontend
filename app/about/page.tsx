"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Building2,
  Users,
  Scale,
  TrendingUp,
  FileCheck,
  MapPin,
  Home,
  Landmark,
  Briefcase,
  TreePine,
  CheckCircle2,
  ArrowRight,
  Phone,
  Mail,
} from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Variants } from "framer-motion";
/* ─── Animation presets ─── */

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

/* ─── Data ─── */
const services = [
  {
    icon: <Building2 className="w-6 h-6" />,
    title: "Real Estate Consultancy",
    desc: "Discover residential, luxury and commercial properties based on your requirements, budget and objectives.",
  },
  {
    icon: <Landmark className="w-6 h-6" />,
    title: "Home Loan Assistance",
    desc: "Guidance on financing options, loan eligibility, documentation and the application process.",
  },
  {
    icon: <Scale className="w-6 h-6" />,
    title: "Legal & Property Support",
    desc: "Assistance for property documentation, agreement review, title-related checks and legal requirements.",
  },
  {
    icon: <TrendingUp className="w-6 h-6" />,
    title: "Investment Advisory",
    desc: "Evaluate opportunities based on location, market potential, rental prospects and capital appreciation.",
  },
  {
    icon: <FileCheck className="w-6 h-6" />,
    title: "Documentation Support",
    desc: "Coordinate information, documentation and professional support from discussion to final transaction.",
  },
];

const expertise = [
  "Residential apartments",
  "Premium & luxury residences",
  "Villas & independent homes",
  "New residential developments",
  "Ready-to-move properties",
  "Commercial properties",
  "Plots & land opportunities",
  "Real estate investment opportunities",
];

const values = [
  {
    title: "Curated Opportunities",
    desc: "Relevant property options rather than overwhelming clients with endless listings.",
  },
  {
    title: "Clear Guidance",
    desc: "Explain the important aspects and help you evaluate options before deciding.",
  },
  {
    title: "One Connected Journey",
    desc: "Property search, financing, legal support and documentation under one roof.",
  },
  {
    title: "Long-Term Perspective",
    desc: "Consider both present requirements and future value in every recommendation.",
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />

      {/* ═══════════════════════════════════════
          HERO
      ═══════════════════════════════════════ */}
      <section className="relative pt-50 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
  <div className="absolute inset-0 bg-[#FAF7F2] -z-10" />

  <div
    className="absolute inset-0 pointer-events-none opacity-[0.04]"
    style={{
      backgroundImage: `repeating-linear-gradient(
        -45deg,
        #0D1B2A 0px,
        #0D1B2A 1px,
        transparent 1px,
        transparent 14px
      )`,
    }}
  />

  <div className="max-w-5xl mx-auto text-center">
    <motion.span
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="inline-block px-4 py-1.5 mb-6 text-[11px] font-semibold tracking-[0.22em] uppercase text-[#C9A84C] bg-[rgba(201,168,76,0.1)] border border-[rgba(201,168,76,0.22)] rounded-full"
    >
      About Samriddh
    </motion.span>

    <motion.h1
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-[#0D1B2A] leading-tight mb-6"
    >
      <span className="block">Real Estate Decisions,</span>
      <span className="block text-[#C9A84C]">
        Made With Confidence.
      </span>
    </motion.h1>

    <motion.p
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="text-lg text-[#5C4A2E] max-w-4xl mx-auto leading-relaxed text-justify"
    >
      Buying a home, investing in property or choosing the right commercial
      space is a decision that deserves more than a property listing. It
      requires the right information, the right guidance and a partner who
      understands what matters beyond the price and location.
    </motion.p>
  </div>
</section>

      {/* ═══════════════════════════════════════
          BELIEF STATEMENT
      ═══════════════════════════════════════ */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="relative p-8 md:p-12 rounded-2xl bg-gradient-to-br from-[#0D1B2A] to-[#16324F] text-white overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#C9A84C] opacity-5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="relative z-10">
              <p className="text-xl md:text-2xl font-medium leading-relaxed text-center">
                Samriddh is a real estate consultancy built around that belief.
              </p>
              <p className="mt-4 text-white/70 text-center max-w-2xl mx-auto text-justify">
                We help homebuyers, property investors and businesses discover the
                right real estate opportunities across residential, luxury and
                commercial segments, while providing the guidance and support needed
                throughout the property journey.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          OUR APPROACH
      ═══════════════════════════════════════ */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#FAF7F2]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-1.5 mb-4 text-[11px] font-semibold tracking-[0.22em] uppercase text-[#C9A84C] bg-[rgba(201,168,76,0.1)] border border-[rgba(201,168,76,0.22)] rounded-full">
              Our Approach
            </span>
            <h2 className="text-3xl sm:text-4xl font-semibold text-[#0D1B2A] mb-4">
              Property First. People Always.
            </h2>
            <p className="text-[#5C4A2E] max-w-2xl mx-auto">
              Real estate is ultimately about people—their homes, aspirations,
              businesses and financial futures.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {["Understand", "Advise", "Connect", "Support"].map((step, i) => (
              <motion.div
                key={step}
                variants={fadeUp}
                className="relative text-center p-6 rounded-xl bg-white border border-[rgba(13,27,42,0.06)] shadow-sm"
              >
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#C9A84C] to-[#8B6F2E] text-white flex items-center justify-center font-semibold text-lg">
                  {i + 1}
                </div>
                <h3 className="font-semibold text-[#0D1B2A]">{step}</h3>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          WHAT WE DO — SERVICES
      ═══════════════════════════════════════ */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-1.5 mb-4 text-[11px] font-semibold tracking-[0.22em] uppercase text-[#C9A84C] bg-[rgba(201,168,76,0.1)] border border-[rgba(201,168,76,0.22)] rounded-full">
              What We Do
            </span>
            <h2 className="text-3xl sm:text-4xl font-semibold text-[#0D1B2A] mb-4">
              Your Property Journey, Supported Under One Roof.
            </h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {services.map((service) => (
              <motion.div
              key={service.title}
              variants={fadeUp}
              whileHover={{ y: -4 }}
              className="group p-6 rounded-xl bg-[#FAF7F2] border border-[rgba(13,27,42,0.06)] hover:border-[#C9A84C]/30 hover:shadow-lg transition-all duration-300 text-center"
            >
              <div className="w-12 h-12 mb-4 mx-auto rounded-lg bg-gradient-to-br from-[#C9A84C] to-[#8B6F2E] text-white flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
                {service.icon}
              </div>
            
              <h3 className="text-lg font-semibold text-[#0D1B2A] mb-2">
                {service.title}
              </h3>
            
              <p className="text-sm text-[#5C4A2E] leading-relaxed mx-auto text-justify">
                {service.desc}
              </p>
            </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          EXPERTISE
      ═══════════════════════════════════════ */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0D1B2A] text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#C9A84C] opacity-[0.03] rounded-full blur-3xl " />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-1.5 mb-4 text-[11px] font-semibold tracking-[0.22em] uppercase text-[#C9A84C] bg-[rgba(201,168,76,0.15)] border border-[rgba(201,168,76,0.3)] rounded-full">
              Our Expertise
            </span>
            <h2 className="text-3xl sm:text-4xl font-semibold mb-4">
              From Your First Home to Your Next Investment.
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto text-justify">
              Every buyer has a different reason for entering the property market.
              Samriddh works across these requirements with a focus on understanding
              the property, the location and the purpose behind the purchase.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {expertise.map((item) => (
              <motion.div
                key={item}
                variants={fadeUp}
                className="flex items-center gap-3 p-4 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
              >
                <CheckCircle2 className="w-5 h-5 text-[#C9A84C] shrink-0" />
                <span className="text-sm font-medium text-white/90">{item}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          WHERE WE OPERATE
      ═══════════════════════════════════════ */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#FAF7F2]">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
            >
              <span className="inline-block px-4 py-1.5 mb-4 text-[11px] font-semibold tracking-[0.22em] uppercase text-[#C9A84C] bg-[rgba(201,168,76,0.1)] border border-[rgba(201,168,76,0.22)] rounded-full">
                Where We Operate
              </span>
              <h2 className="text-3xl sm:text-4xl font-semibold text-[#0D1B2A] mb-6">
                Discover Property Opportunities Across Growing Markets.
              </h2>
              <p className="text-[#5C4A2E] leading-relaxed mb-6">
                Real estate is local. The right location can influence lifestyle,
                connectivity, rental demand, resale potential and long-term value.
                Samriddh is building its property network across key Indian real
                estate markets, beginning with a strong understanding of{" "}
                <strong className="text-[#0D1B2A]">Kolkata and its surrounding growth corridors</strong>.
              </p>
              <p className="text-[#5C4A2E] leading-relaxed">
                Our location-based approach helps clients explore properties based
                on the characteristics that matter to them—from established
                neighbourhoods to emerging development zones.
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="relative h-[400px] rounded-2xl overflow-hidden border border-[rgba(13,27,42,0.08)] shadow-xl"
            >
              {/* Replace with your actual map image or an iframe */}
              <Image
                src="/images/kolkata-map.jpg"
                alt="Kolkata Region Map"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0D1B2A]/80 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <div className="flex items-center gap-2 text-white mb-2">
                  <MapPin className="w-5 h-5 text-[#C9A84C]" />
                  <span className="font-semibold">Kolkata & Surrounding Regions</span>
                </div>
                <p className="text-white/70 text-sm">
                  New Town • Salt Lake • Rajarhat • Joka • Southern Bypass
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          WHY SAMRIDDH
      ═══════════════════════════════════════ */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-1.5 mb-4 text-[11px] font-semibold tracking-[0.22em] uppercase text-[#C9A84C] bg-[rgba(201,168,76,0.1)] border border-[rgba(201,168,76,0.22)] rounded-full">
              Why Samriddh
            </span>
            <h2 className="text-3xl sm:text-4xl font-semibold text-[#0D1B2A] mb-4">
              A More Considered Way to Buy Property.
            </h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 gap-6"
          >
            {values.map((val, i) => (
              <motion.div
                key={val.title}
                variants={fadeUp}
                className="flex gap-5 p-6 rounded-xl bg-[#FAF7F2] border border-[rgba(13,27,42,0.06)]"
              >
                <div className="w-10 h-10 rounded-full bg-[#0D1B2A] text-white flex items-center justify-center text-sm font-semibold shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[#0D1B2A] mb-1">
                    {val.title}
                  </h3>
                  <p className="text-sm text-[#5C4A2E] leading-relaxed">
                    {val.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          VISION + PROMISE
      ═══════════════════════════════════════ */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#FAF7F2]">
        <div className="max-w-5xl mx-auto space-y-16">
          {/* Vision */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center"
          >
            <h2 className="text-3xl sm:text-4xl font-semibold text-[#0D1B2A] mb-6">
              Our Vision
            </h2>
            <p className="text-xl text-[#5C4A2E] leading-relaxed max-w-3xl mx-auto text-justify">
              To build trust into every property decision. We envision Samriddh as
              a modern, trusted real estate consultancy where property discovery is
              supported by meaningful advice, transparent communication and
              professional transaction assistance.
            </p>
          </motion.div>

          {/* Promise */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="relative p-8 md:p-12 rounded-2xl bg-gradient-to-br from-[#0D1B2A] to-[#16324F] text-white text-center overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-full opacity-10">
              <div
                className="w-full h-full"
                style={{
                  backgroundImage: `repeating-linear-gradient(-45deg, #C9A84C 0px, #C9A84C 1px, transparent 1px, transparent 14px)`,
                }}
              />
            </div>
            <div className="relative z-10">
              <h2 className="text-3xl font-semibold mb-4">Our Promise</h2>
              <p className="text-lg text-white/80 max-w-2xl mx-auto mb-6 text-justify">
                We cannot promise that every property will be perfect. What we can
                promise is that we will approach every requirement with
                professionalism, communicate clearly and help you understand your
                options before you make an important property decision.
              </p>
              <p className="text-xl font-semibold text-[#C9A84C]">
                Because finding a property is only the beginning. <br />
                Finding the right one is what matters.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          CTA
      ═══════════════════════════════════════ */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-3xl sm:text-4xl font-semibold text-[#0D1B2A] mb-6">
            Looking for the Right Property?
          </h2>
          <p className="text-lg text-[#5C4A2E] mb-10 max-w-2xl mx-auto">
            Tell us what you are looking for, and our property consultants will
            help you explore suitable opportunities.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/Projects">
              <Button
                size="lg"
                className="bg-[#1a2340] hover:bg-[#0f1726] text-white px-8 h-12 rounded-full text-base"
              >
                Explore Properties
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <a href="tel:+919876543210">
              <Button
                size="lg"
                variant="outline"
                className="border-[#1a2340] text-[#1a2340] hover:bg-[#1a2340] hover:text-white px-8 h-12 rounded-full text-base"
              >
                <Phone className="w-4 h-4 mr-2" />
                Talk to a Consultant
              </Button>
            </a>
          </div>

          <div className="mt-8 flex items-center justify-center gap-6 text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              contact@samriddhrealty.com
            </span>
            <span className="w-1 h-1 rounded-full bg-muted-foreground" />
            <span className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              +91 98765 43210
            </span>
          </div>
        </motion.div>
      </section>

      <Footer />
    </main>
  );
}
