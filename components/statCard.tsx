import { motion, useMotionValue, useTransform } from "framer-motion";
import {AnimatedNumber}from "@/components/animatedNumber"
interface StatCardProps {
  icon: React.ReactNode;
  value: number;
  suffix?: string;
  label: string;
}

export function StatCard({
  icon,
  value,
  suffix = "",
  label,
}: StatCardProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-50, 50], [8, -8]);
  const rotateY = useTransform(x, [-50, 50], [-8, 8]);

  const handleMouseMove = (
    e: React.MouseEvent<HTMLDivElement>
  ) => {
    const rect = e.currentTarget.getBoundingClientRect();

    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 800,
      }}
      whileHover={{
        scale: 1.04,
      }}
      className="bg-card border border-border rounded-xl p-6 space-y-3 shadow-sm"
    >
      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
        {icon}
      </div>

      <AnimatedNumber value={value} suffix={suffix} />

      <div className="text-muted-foreground">
        {label}
      </div>
    </motion.div>
  );
}
