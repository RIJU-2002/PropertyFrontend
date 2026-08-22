"use client";

import { useState } from "react";
import styles from "@/app/page.module.css";
import { CONTACTS } from "@/data/projectData";
import { useSubmitLead } from "@/hooks/useApi";

interface Props {
  showToast: (message: string) => void;
  projectId?: number;
  projectName?: string;
}

export default function ProjectSidebar({
  showToast,
  projectId,
  projectName,
}: Props) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const { mutate: submitLead, isPending } = useSubmitLead();

  const handleSubmit = () => {
    const guestPhone = phone.replace(/\D/g, "").slice(-10);
    if (!name.trim() || name.trim().length < 2) {
      setError("Please enter your name");
      return;
    }
    if (!/^[6-9]\d{9}$/.test(guestPhone)) {
      setError("Enter a valid 10-digit mobile number");
      return;
    }

    setError("");
    const parsedProjectId = Number(projectId);

    submitLead(
      {
        guestName: name.trim(),
        guestPhone,
        message: projectName
          ? `Enquiry for ${projectName}`
          : "Project callback request",
        ...(Number.isInteger(parsedProjectId) && parsedProjectId > 0
          ? { projectId: parsedProjectId }
          : {}),
        source: "project_sidebar",
      },
      {
        onSuccess: () => {
          setName("");
          setPhone("");
          showToast("Enquiry submitted! We will call you shortly.");
        },
        onError: (err: any) => {
          setError(
            err?.response?.data?.message ||
              "Failed to submit enquiry. Please try again."
          );
        },
      }
    );
  };

  return (
    <aside className={styles.sidebar}>
      <div className={styles.sidebarEnq}>
        <h3 className={styles.sidebarTitle}>Interested?</h3>

        <input
          className={styles.formInput}
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className={styles.formInput}
          placeholder="Phone"
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
        />

        {error && (
          <p style={{ color: "#A32D2D", fontSize: 12, margin: "0 0 8px" }}>
            {error}
          </p>
        )}

        <button
          className={`${styles.btn} ${styles.btnGold} ${styles.btnFull}`}
          onClick={handleSubmit}
          disabled={isPending}
        >
          {isPending ? "Submitting..." : "Request Callback"}
        </button>
      </div>

      <div className={styles.sidebarContact}>
        <div className={styles.scHead}>Direct Contact</div>

        {CONTACTS.map((contact) => (
          <div
            key={contact.label}
            className={styles.scContact}
            onClick={() => showToast(contact.toast)}
          >
            <div className={styles.scIcon}>{contact.icon}</div>
            <div>
              <div className={styles.scLabel}>{contact.label}</div>
              <div className={styles.scVal}>{contact.value}</div>
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}
