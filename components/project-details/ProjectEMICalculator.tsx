"use client";

import { useState } from "react";
import styles from "@/app/page.module.css";
import { calcEmi, fmtINR } from "@/utils/emi";

interface Props {
  openModal?: (name: string) => void;
}

export default function ProjectEMICalculator({
  openModal,
}: Props) {
  const [loanAmt, setLoanAmt] =
    useState(5440000);

  const [loanRate, setLoanRate] =
    useState(8.5);

  const [loanTenure, setLoanTenure] =
    useState(20);

  const {
    emi,
    interest,
    total,
  } = calcEmi(
    loanAmt,
    loanRate,
    loanTenure
  );

  return (
    <section
      className={styles.card}
      id="emi"
    >
      <div className={styles.cardHead}>
        EMI Calculator
      </div>

      <div className={styles.loanWrap}>
        <div>
          <div className={styles.loanField}>
            <div className={styles.loanLabel}>
              <span>Loan Amount</span>
              <span>
                {fmtINR(loanAmt)}
              </span>
            </div>

            <input
              type="range"
              min={2000000}
              max={12000000}
              step={100000}
              value={loanAmt}
              className={styles.rangeInput}
              onChange={(e) =>
                setLoanAmt(
                  Number(e.target.value)
                )
              }
            />
          </div>

          <div className={styles.loanField}>
            <div className={styles.loanLabel}>
              <span>Interest</span>
              <span>
                {loanRate.toFixed(1)}%
              </span>
            </div>

            <input
              type="range"
              min={6}
              max={15}
              step={0.1}
              value={loanRate}
              className={styles.rangeInput}
              onChange={(e) =>
                setLoanRate(
                  Number(e.target.value)
                )
              }
            />
          </div>

          <div className={styles.loanField}>
            <div className={styles.loanLabel}>
              <span>Tenure</span>
              <span>
                {loanTenure} Years
              </span>
            </div>

            <input
              type="range"
              min={5}
              max={30}
              value={loanTenure}
              className={styles.rangeInput}
              onChange={(e) =>
                setLoanTenure(
                  Number(e.target.value)
                )
              }
            />
          </div>
        </div>

        <div className={styles.emiResult}>
          <div className={styles.emiLabel}>
            Monthly EMI
          </div>

          <div className={styles.emiValue}>
            {fmtINR(emi)}
          </div>

          <button
            className={`${styles.btn} ${styles.btnGold} ${styles.btnFull}`}
            onClick={() =>
              openModal?.(
                "Home Loan Assistance"
              )
            }
          >
            Get Loan Assistance
          </button>

          <div
            className={styles.emiBreakdown}
          >
            <div className={styles.emiRow}>
              <span>Principal</span>
              <span>
                {fmtINR(loanAmt)}
              </span>
            </div>

            <div className={styles.emiRow}>
              <span>Interest</span>
              <span>
                {fmtINR(interest)}
              </span>
            </div>

            <div className={styles.emiRow}>
              <span>Total</span>
              <span>
                {fmtINR(total)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
