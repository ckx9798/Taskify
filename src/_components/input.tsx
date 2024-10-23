"use client";

import React, { useState, ChangeEventHandler, SetStateAction } from "react";
import Image from "next/image";

interface InputProps {
  readonly inputId: string;
  readonly inputName: string;
  readonly inputType: "text" | "password" | "calendar" | "tag";
  readonly inputWidth: number | "100%";
  readonly errorMessage?: string | null;
  readonly onChange?: ChangeEventHandler<HTMLInputElement>;

  errorState?: boolean;
  placeholder?: string; // 추가된 부분
  dueDateValue?: string | null | undefined;
  tagInputValue?: string[] | null | undefined;
  setDueDateValue?: React.Dispatch<SetStateAction<string | null | undefined>>;
  setTagInputValue?: React.Dispatch<
    SetStateAction<string[] | null | undefined>
  >;
}

const Input: React.FC<InputProps> = ({
  inputId,
  inputName,
  inputType,
  inputWidth,
  errorMessage = null,
  errorState,
  placeholder, // 여기 추가
  onChange, // 여기 추가
}) => {
  const INVISIBLE_ICON_SRC = "../public/svg/Invisible.svg";
  const VISIBLE_ICON_SRC = "../public/svg/Visible.svg";

  const [visibilityIcon, setVisibilityIcon] = useState(true);

  const toggleIcon = () => {
    setVisibilityIcon(!visibilityIcon);
  };

  const getInputType = () => {
    if (inputType === "text") return "text";
    return visibilityIcon ? "password" : "text";
  };

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={inputId} className="text-lg font-medium text-gray-900">
        {inputName}
      </label>
      <div className="relative" style={{ width: inputWidth }}>
        <input
          id={inputId}
          className={`w-full h-12 px-4 py-2 border rounded-lg text-gray-900 
          ${errorState ? "border-red-500" : "border-gray-300"} 
          focus:outline-none focus:border-purple-600`}
          type={getInputType()}
          placeholder={placeholder} // 여기에 추가
          onChange={onChange} // 여기에 추가
        />
        {inputType === "password" && (
          <Image
            className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer"
            src={visibilityIcon ? INVISIBLE_ICON_SRC : VISIBLE_ICON_SRC}
            alt="visibility-icon"
            width={24}
            height={24}
            onClick={toggleIcon}
          />
        )}
      </div>
      {errorState && errorMessage && (
        <p className="text-sm text-red-500">{errorMessage}</p>
      )}
    </div>
  );
};

export default Input;
