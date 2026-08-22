"use client";

import * as Slider from "@radix-ui/react-slider";
import { motion } from "framer-motion";

export const PRICE_MIN = 20;   // ₹20L
export const PRICE_MAX = 200;  // ₹2Cr
export const PRICE_STEP = 5;
export const DEFAULT_PRICE_RANGE: [number, number] = [PRICE_MIN, PRICE_MAX];

interface PriceSliderProps {
  value: number[];
  onChange: (value: number[]) => void;
}

export function formatPrice(v: number) {
  if (v >= 100) {
    const cr = v / 100;
    // avoid "1.0Cr" — show whole numbers cleanly
    return `₹${cr % 1 === 0 ? cr.toFixed(0) : cr.toFixed(1)}Cr`;
  }
  return `₹${v}L`;
}

export default function PriceSlider({ value, onChange }: PriceSliderProps) {
  return (
    <div className="space-y-5">
      {/* Top Labels */}
      <div className="flex justify-between text-sm font-semibold">
        <span>{formatPrice(value[0])}</span>
        <span>{formatPrice(value[1])}</span>
      </div>

      <Slider.Root
        className="relative flex items-center w-full h-8"
        value={value}
        min={PRICE_MIN}
        max={PRICE_MAX}
        step={PRICE_STEP}
        minStepsBetweenThumbs={1}
        onValueChange={onChange}
      >
        <Slider.Track className="relative h-2 w-full rounded-full bg-primary/15 overflow-hidden">
          <Slider.Range className="absolute h-full rounded-full bg-gradient-to-r from-yellow-400 via-yellow-500 to-amber-600" />
        </Slider.Track>

        {value.map((v, i) => (
          <Slider.Thumb
            key={i}
            aria-label={i === 0 ? "Minimum price" : "Maximum price"}
            className="relative outline-none focus-visible:ring-2 focus-visible:ring-primary/50 rounded-full"
          >
            <motion.div
              whileHover={{ scale: 1.18 }}
              whileTap={{ scale: 0.95 }}
              className="h-6 w-6 rounded-full border-[3px] border-yellow-500 bg-white shadow-lg shadow-yellow-500/30"
            />

            {/* Bubble */}
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-primary text-primary-foreground text-xs px-3 py-1 shadow-lg pointer-events-none">
              {formatPrice(v)}
            </div>
          </Slider.Thumb>
        ))}
      </Slider.Root>

      <div className="text-center text-xs text-muted-foreground">
        Drag both handles to select your preferred budget
      </div>
    </div>
  );
}
