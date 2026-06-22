"use client";

import { useState } from "react";
import styles from "@/app/page.module.css";

interface EnquiryModalProps {
  propName: string;
  onClose: () => void;
}

export default function EnquiryModal({
  propName,
  onClose,
}: EnquiryModalProps) {
  const [submitted, setSubmitted] =
    useState(false);

  return (
    <div
      className={styles.modalOverlay}
      onClick={(e) =>
        e.target === e.currentTarget && onClose()
      }
    >
      <div className={styles.modal}>
        <button
          className={styles.modalClose}
          onClick={onClose}
        >
          ✕
        </button>

        {!submitted ? (
          <>
            <h3 className={styles.modalTitle}>
              Get Free Callback
            </h3>

            <p className={styles.modalSub}>
              Our advisor will call you back
              within 30 minutes
            </p>

            <span className={styles.propNameTag}>
              {propName}
            </span>

            <div className={styles.formGroup}>
              <label>Your Name *</label>

              <input
                type="text"
                placeholder="Enter your full name"
                className={styles.formInput}
              />
            </div>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label>Phone *</label>

                <input
                  type="tel"
                  placeholder="+91 XXXXX XXXXX"
                  className={styles.formInput}
                />
              </div>

              <div className={styles.formGroup}>
                <label>Email</label>

                <input
                  type="email"
                  placeholder="your@email.com"
                  className={styles.formInput}
                />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label>Configuration</label>

              <select className={styles.formSelect}>
                <option>
                  2 BHK (₹68L–₹85L)
                </option>
                <option>
                  3 BHK (₹98L–₹1.18Cr)
                </option>
                <option>
                  3 BHK+ (₹1.18Cr–₹1.35Cr)
                </option>
                <option>Not Sure</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label>Budget Range</label>

              <select className={styles.formSelect}>
                <option>₹60L – ₹1Cr</option>
                <option>₹1Cr – ₹1.5Cr</option>
                <option>₹1.5Cr+</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label>
                Message (optional)
              </label>

              <textarea
                rows={3}
                placeholder="Any specific requirements..."
                className={styles.formInput}
              />
            </div>

            <button
              className={`${styles.btn} ${styles.btnGold} ${styles.btnFull} ${styles.btnLg}`}
              onClick={() =>
                setSubmitted(true)
              }
            >
              📞 Request Free Callback
            </button>
          </>
        ) : (
          <div className={styles.successMsg}>
            <div
              className={
                styles.successCheckmark
              }
            >
              ✅
            </div>

            <h4
              className={
                styles.successTitle
              }
            >
              Enquiry Submitted!
            </h4>

            <p
              className={
                styles.successSub
              }
            >
              Our advisor will call you
              within 30 minutes.
            </p>

            <button
              className={`${styles.btn} ${styles.btnGold} ${styles.btnFull} ${styles.btnLg}`}
              onClick={onClose}
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
}