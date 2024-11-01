import React from "react";

interface ModalProps {
  message: string;
  onClose: () => void;
}

export default function oneButton({ message, onClose }: ModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div
        className="flex flex-col items-center justify-center rounded-lg bg-white p-6 text-lg text-black shadow-md"
        style={{
          width: window.innerWidth > 520 ? "368px" : "327px",
          height: window.innerWidth > 520 ? "192px" : "220px",
        }}
      >
        <span className="mb-4 text-center">{message}</span>
        <button
          className="h-[48px] w-full max-w-[240px] rounded-md bg-[#5534da] text-white md:h-[48px] md:w-[240px]"
          onClick={onClose}
        >
          확인
        </button>
      </div>
    </div>
  );
}
