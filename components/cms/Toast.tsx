'use client';

import { useEffect } from 'react';

interface ToastProps {
  message: string;
  visible: boolean;
  onHide: () => void;
}

export default function Toast({ message, visible, onHide }: ToastProps) {
  useEffect(() => {
    if (visible) {
      const timer = setTimeout(onHide, 3000);
      return () => clearTimeout(timer);
    }
  }, [visible, onHide]);

  return (
    <div className={`toast ${visible ? 'toast--visible' : ''}`}>
      {message}

      <style jsx>{`
        .toast {
          position: fixed;
          bottom: 28px;
          right: 28px;
          background: #0D1B2A;
          color: #fff;
          padding: 13px 22px;
          border-radius: 8px;
          font-size: 13px;
          font-weight: 500;
          box-shadow: 0 8px 32px rgba(13, 27, 42, 0.28);
          border-left: 3px solid #C9A84C;
          z-index: 9999;
          opacity: 0;
          transform: translateY(12px);
          pointer-events: none;
          transition: opacity 0.25s, transform 0.25s;
        }

        .toast--visible {
          opacity: 1;
          transform: translateY(0);
          pointer-events: auto;
        }
      `}</style>
    </div>
  );
}
