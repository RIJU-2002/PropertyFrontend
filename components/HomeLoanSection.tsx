"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Calculator, PiggyBank, ShieldCheck, TrendingDown } from "lucide-react";
import ProjectEMICalculator from "@/components/project-details/ProjectEMICalculator";
import EnquiryModal from "@/components/project-details/EnquiryModal";

const benefits = [
  {
    icon: PiggyBank,
    title: "Compare Rates",
    desc: "Find the best interest rates from leading banks and NBFCs instantly.",
  },
  {
    icon: Calculator,
    title: "Accurate Planning",
    desc: "Know your exact EMI, total interest, and repayment schedule upfront.",
  },
  {
    icon: ShieldCheck,
    title: "Trusted Guidance",
    desc: "Our loan experts assist you from application to disbursement.",
  },
  {
    icon: TrendingDown,
    title: "Save More",
    desc: "Discover prepayment strategies to reduce your total interest outgo.",
  },
];

export default function HomeLoanSection() {
  const [open, setOpen] = useState(false);

  return (
    <section
      id="home-loan"
      className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#FAF7F2]"
    >
      {/* ── Background: Diagonal hatch pattern (architectural feel) ── */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.035]"
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

      {/* Soft gold glow — top-left */}
      <div
        className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(201,168,76,0.12) 0%, transparent 65%)",
        }}
      />

      {/* Soft navy glow — bottom-right */}
      <div
        className="absolute -bottom-40 -right-40 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(13,27,42,0.07) 0%, transparent 65%)",
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* ── Section Header ───────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 mb-4 text-[11px] font-semibold tracking-[0.22em] uppercase text-[#C9A84C] bg-[rgba(201,168,76,0.1)] border border-[rgba(201,168,76,0.22)] rounded-full">
            Financial Planning
          </span>

          <h2 className="font-serif text-4xl sm:text-5xl font-semibold text-[#0D1B2A] mb-5 leading-tight">
            Plan Your Dream Home
          </h2>

          <p className="text-lg text-[#5C4A2E] max-w-2xl mx-auto leading-relaxed">
            Calculate your EMIs in seconds and explore tailored home loan options
            that align with your budget. Zero paperwork, instant estimates.
          </p>
        </motion.div>

        {/* ── Content Grid ─────────────────────────────────────── */}
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left: Value props */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-5 space-y-5"
          >
            {benefits.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.08 * idx }}
                className="flex items-start gap-4 p-5 rounded-xl bg-white/70 backdrop-blur-md border border-[rgba(13,27,42,0.06)] shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="flex-shrink-0 w-11 h-11 flex items-center justify-center rounded-lg bg-gradient-to-br from-[#C9A84C] to-[#8B6F2E] text-white shadow-sm">
                  <item.icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#0D1B2A] mb-0.5 text-[15px]">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[#5C4A2E]/90 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Right: Calculator Card ─────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-7"
          >
            <div className="relative">
              {/* Gold accent line above card */}
              <div className="absolute -top-2 left-10 right-10 h-[2px] rounded-full bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent opacity-50" />

              <div className="relative bg-white rounded-2xl border border-[rgba(13,27,42,0.08)] shadow-2xl shadow-[rgba(13,27,42,0.05)] overflow-hidden">
                {/* Card Header */}
                <div className="bg-gradient-to-r from-[#0D1B2A] to-[#16324F] px-6 py-4 flex items-center gap-3 border-b border-[rgba(201,168,76,0.15)]">
                  <div className="w-8 h-8 rounded-md bg-[rgba(201,168,76,0.15)] flex items-center justify-center">
                    <Calculator className="w-4 h-4 text-[#C9A84C]" />
                  </div>
                  <h3 className="text-white font-semibold text-[15px] tracking-wide">
                    EMI Calculator
                  </h3>
                </div>

                {/* Calculator Body */}
                <div className="p-6 sm:p-8">
                  <ProjectEMICalculator
                    openModal={() => setOpen(true)}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Modal ────────────────────────────────────────────── */}
      {open && (
        <EnquiryModal
          propName="Home Loan Assistance"
          onClose={() => setOpen(false)}
          source="emi_calculator"
        />
      )}
    </section>
  );
}
