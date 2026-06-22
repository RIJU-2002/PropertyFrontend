"use client";

import { useEffect } from "react";
import styles from "@/app/page.module.css";

interface ToastProps {
  message: string;
  onDone: () => void;
}

export default function Toast({
  message,
  onDone,
}: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onDone, 3500);

    return () => clearTimeout(timer);
  }, [onDone]);

  return (
    <div className={styles.toast}>
      {message}
    </div>
  );
}