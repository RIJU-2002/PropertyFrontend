"use client";

import styles from "./ArticleGrid.module.css";

export default function ArticleCardSkeleton() {
  return (
    <div className={styles.card}>
      <div
        className={styles.skeleton}
        style={{
          height: 220,
          borderRadius: 16,
        }}
      />

      <div className={styles.cardBody}>
        <div
          className={styles.skeleton}
          style={{
            width: "40%",
            height: 14,
            marginBottom: 12,
          }}
        />

        <div
          className={styles.skeleton}
          style={{
            width: "90%",
            height: 24,
            marginBottom: 10,
          }}
        />

        <div
          className={styles.skeleton}
          style={{
            width: "100%",
            height: 14,
            marginBottom: 8,
          }}
        />

        <div
          className={styles.skeleton}
          style={{
            width: "80%",
            height: 14,
          }}
        />
      </div>
    </div>
  );
}
