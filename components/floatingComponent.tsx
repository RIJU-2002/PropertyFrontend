"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Mail, Phone, X, HelpCircle } from "lucide-react";
import EnquiryModal from "@/components/project-details/EnquiryModal";

interface FloatingContactProps {
  whatsappNumber?: string;  // e.g., "919876543210" (with country code, no +)
  email?: string;
}

export default function FloatingContact({
  whatsappNumber = "919876543210",
  email = "contact@samriddhrealty.com",
}: FloatingContactProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);

  const handleWhatsApp = () => {
    const text = encodeURIComponent("Hi, I'm interested in a property. Can you help?");
    window.open(`https://wa.me/${whatsappNumber}?text=${text}`, "_blank");
  };

  const handleEmail = () => {
    const subject = encodeURIComponent("Property Enquiry");
    const body = encodeURIComponent("Hi,\n\nI'm interested in learning more about your properties.\n\nRegards");
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
  };

  const actions = [
    {
      label: "WhatsApp",
      icon: <MessageCircle className="w-5 h-5" />,
      color: "bg-green-500 hover:bg-green-600 text-white",
      onClick: handleWhatsApp,
    },
    {
      label: "Email",
      icon: <Mail className="w-5 h-5" />,
      color: "bg-blue-500 hover:bg-blue-600 text-white",
      onClick: handleEmail,
    },
    {
      label: "Enquiry",
      icon: <Phone className="w-5 h-5" />,
      color: "bg-[#1a2340] hover:bg-[#0f1726] text-white",
      onClick: () => {
        setIsOpen(false);
        setIsEnquiryOpen(true);
      },
    },
  ];

  return (
    <>
      {/* Floating Actions */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.8 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="flex flex-col gap-3 items-end"
            >
              {actions.map((action, index) => (
                <motion.button
                  key={action.label}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={action.onClick}
                  className={`
                    flex items-center gap-3 pl-4 pr-2 py-2 rounded-full shadow-lg
                    ${action.color}
                    transition-all duration-200
                    hover:shadow-xl hover:-translate-y-0.5
                  `}
                >
                  <span className="text-sm font-medium">{action.label}</span>
                  <span className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                    {action.icon}
                  </span>
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Toggle Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(!isOpen)}
          className={`
            w-14 h-14 rounded-full shadow-2xl flex items-center justify-center
            transition-all duration-300
            ${isOpen 
              ? "bg-red-500 hover:bg-red-600 text-white rotate-0" 
              : "bg-[#1a2340] hover:bg-[#0f1726] text-white"
            }
          `}
        >
          <motion.div
            animate={{ rotate: isOpen ? 90 : 0 }}
            transition={{ duration: 0.2 }}
          >
            {isOpen ? <X className="w-6 h-6" /> : <HelpCircle className="w-6 h-6" />}
          </motion.div>
        </motion.button>
      </div>

      {/* Enquiry Modal */}
      {isEnquiryOpen && (
        <EnquiryModal
          propName="General Enquiry"
          source="floating_fab"
          onClose={() => setIsEnquiryOpen(false)}
        />
      )}
    </>
  );
}
