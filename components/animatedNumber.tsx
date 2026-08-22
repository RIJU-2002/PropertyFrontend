"use client";

import { useEffect } from "react";
import {
  animate,
  motion,
  useMotionValue,
  useTransform,
} from "framer-motion";

export function AnimatedNumber({
  value,
  suffix = "",
}: {
  value: number;
  suffix?: string;
}) {
  const count = useMotionValue(0);

  const rounded = useTransform(count, (latest) =>
    Math.floor(latest)
  );

  useEffect(() => {
    const controls = animate(count, value, {
      duration: 2,
      ease: "easeOut",
    });

    return controls.stop;
  }, [value]);

  return (
    <motion.span className="text-3xl font-semibold text-foreground">
      <motion.span>{rounded}</motion.span>
      {suffix}
    </motion.span>
  );
}
