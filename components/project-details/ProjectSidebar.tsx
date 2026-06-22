"use client";

import styles from "@/app/page.module.css";
import { CONTACTS } from "@/data/projectData";

interface Props {
  showToast: (
    message: string
  ) => void;
}

export default function ProjectSidebar({
  showToast,
}: Props) {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.sidebarEnq}>
        <h3
          className={styles.sidebarTitle}
        >
          Interested?
        </h3>

        <input
          className={styles.formInput}
          placeholder="Name"
        />

        <input
          className={styles.formInput}
          placeholder="Phone"
        />

        <button
          className={`${styles.btn} ${styles.btnGold} ${styles.btnFull}`}
          onClick={() =>
            showToast(
              "Enquiry Submitted!"
            )
          }
        >
          Request Callback
        </button>
      </div>

      <div
        className={styles.sidebarContact}
      >
        <div className={styles.scHead}>
          Direct Contact
        </div>

        {CONTACTS.map((contact) => (
          <div
            key={contact.label}
            className={
              styles.scContact
            }
            onClick={() =>
              showToast(
                contact.toast
              )
            }
          >
            <div
              className={styles.scIcon}
            >
              {contact.icon}
            </div>

            <div>
              <div
                className={
                  styles.scLabel
                }
              >
                {contact.label}
              </div>

              <div
                className={
                  styles.scVal
                }
              >
                {contact.value}
              </div>
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}