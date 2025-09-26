"use client";
import { useState, useEffect } from "react";

interface AlertPopupProps {
  message: string;
  type: "success" | "error" | "warning";
  autoClose?: boolean;
  duration?: number; // ms
}

export default function CustomPopup({
  message,
  type,
  autoClose = false,
  duration = 3000,
}: AlertPopupProps) {
  const [open, setOpen] = useState(true);

  useEffect(() => {
    if (autoClose) {
      const timer = setTimeout(() => setOpen(false), duration);
      return () => clearTimeout(timer);
    }
  }, [autoClose, duration]);

  if (!open) return null;

  const colors = {
    success: "bg-green-100 text-green-800 border-green-500",
    error: "bg-red-100 text-red-800 border-red-500",
    warning: "bg-yellow-100 text-yellow-800 border-yellow-500",
  };
  const styles = {
    success: "bg-green-600 hover:bg-green-700",
    error: "bg-red-600 hover:bg-red-700",
    warning: "bg-yellow-500 hover:bg-yellow-600",
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div
        className={`w-[400px] max-w-[90%] rounded-2xl border-2 shadow-2xl p-6 text-center ${colors[type]}`}
      >
        <h2 className="text-xl font-bold mb-3 capitalize">{type} Alert</h2>
        <p className="text-base mb-6">{message}</p>
        <button
          onClick={() => setOpen(false)}
          className={`rounded-lg text-white px-5 py-2 ${styles[type]}`}
        >
          Close
        </button>
      </div>
    </div>
  );
}
