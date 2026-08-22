"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check, Loader2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSubmitLead } from "@/hooks/useApi";

interface EnquiryModalProps {
  propName: string;
  onClose: () => void;
  source?: string;
  projectId?: number;
  propertyId?: number;
}

export default function EnquiryModal({
  propName,
  onClose,
  source = "website",
  projectId,
  propertyId,
}: EnquiryModalProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const { mutate: submitLead, isPending: isSubmitting } = useSubmitLead();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;

    const guestPhone = phone.replace(/\D/g, "").slice(-10);
    if (!/^[6-9]\d{9}$/.test(guestPhone)) {
      setError("Enter a valid 10-digit mobile number");
      return;
    }

    const parsedProjectId = Number(projectId);
    const parsedPropertyId = Number(propertyId);
    const trimmedEmail = email.trim();
    const listingNote = propName?.trim()
      ? `Enquiry for ${propName.trim()}`
      : undefined;

    setError("");

    submitLead(
      {
        guestName: name.trim(),
        guestPhone,
        ...(trimmedEmail && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)
          ? { guestEmail: trimmedEmail }
          : {}),
        message: [listingNote, message.trim()].filter(Boolean).join(" — ") || listingNote,
        ...(Number.isInteger(parsedProjectId) && parsedProjectId > 0
          ? { projectId: parsedProjectId }
          : {}),
        ...(Number.isInteger(parsedPropertyId) && parsedPropertyId > 0
          ? { propertyId: parsedPropertyId }
          : {}),
        source,
      },
      {
        onSuccess: () => {
          setSubmitted(true);
          setTimeout(() => onClose(), 2500);
        },
        onError: (err: any) => {
          setError(
            err?.response?.data?.message ||
              "Failed to send. Please try again."
          );
        },
      }
    );
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-[#0D1B2A] to-[#16324F] px-6 py-4 flex items-center justify-between">
            <div>
              <h3 className="text-white font-semibold text-[15px]">Get in Touch</h3>
              <p className="text-white/60 text-xs">{propName}</p>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/80 hover:bg-white/20 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Body */}
          <div className="p-6">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8"
              >
                <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                  <Check className="w-7 h-7 text-green-600" />
                </div>
                <h4 className="text-lg font-semibold text-[#0D1B2A] mb-1">Enquiry Sent!</h4>
                <p className="text-sm text-muted-foreground">
                  Our team will contact you shortly.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* ── HONEYPOT: invisible to humans, traps bots ── */}
                <div
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    left: "-9999px",
                    top: "-9999px",
                    opacity: 0,
                    pointerEvents: "none",
                  }}
                >
                  <input
                    type="text"
                    name="_gotcha"
                    tabIndex={-1}
                    autoComplete="off"
                    value=""
                    onChange={() => {}}
                  />
                </div>

                <div className="space-y-1.5">
                  <Label className="text-sm font-medium">Full Name *</Label>
                  <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
                    required
                    minLength={2}
                    className="h-10"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label className="text-sm font-medium">Phone *</Label>
                  <Input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                    placeholder="98765 43210"
                    required
                    minLength={10}
                    maxLength={15}
                    className="h-10"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label className="text-sm font-medium">Email</Label>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="john@example.com"
                    className="h-10"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label className="text-sm font-medium">Message</Label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="I'm interested in..."
                    rows={3}
                    maxLength={500}
                    className="w-full px-3 py-2 rounded-md border border-input bg-background text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 resize-none"
                  />
                </div>

                {error && (
                  <p className="text-sm text-red-600">{error}</p>
                )}

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-11 bg-[#1a2340] hover:bg-[#0f1726] text-white font-semibold"
                >
                  {isSubmitting ? (
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  ) : (
                    <Send className="w-4 h-4 mr-2" />
                  )}
                  {isSubmitting ? "Sending..." : "Submit Enquiry"}
                </Button>
              </form>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
