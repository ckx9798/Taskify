import React from "react";
import ReactDOM from "react-dom";
import Image from "next/image";
import cross from "../../../public/svg/cross.svg";

interface CommonModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  hideCloseButton?: boolean; // 새로운 prop 추가
}

const CommonModal: React.FC<CommonModalProps> = ({
  isOpen,
  onClose,
  children,
  hideCloseButton,
}) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div
      className="fixed inset-0 z-20 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose}
    >
      <div
        className="relative m-4 w-[520px] rounded-lg bg-white p-6"
        onClick={(e) => e.stopPropagation()}
      >
        {!hideCloseButton && ( // hideCloseButton이 true가 아닐 때만 버튼 표시
          <button className="absolute right-2 top-2 text-xl" onClick={onClose}>
            <Image src={cross} alt="close" />
          </button>
        )}
        {children}
      </div>
    </div>,
    document.body,
  );
};

export default CommonModal;
