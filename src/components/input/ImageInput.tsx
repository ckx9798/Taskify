import Image from "next/image";
import { useState } from "react";

export default function ImageInput(temptImg: string | null) {
  const [, setTemptImage] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files;
    if (file && file[0]) {
      setTemptImage(URL.createObjectURL(file[0]));
    }
  };

  return (
    <div className="size-full">
      {temptImg === null ? (
        <label htmlFor="name">
          <Image
            src="/svg/plus.svg"
            alt="이미지 추가 버튼"
            className="h-full w-full rounded-lg object-cover"
            width={40}
            height={40}
          />
        </label>
      ) : (
        // 이미지 추가 시 렌더링
        <label htmlFor="name">
          <Image
            src={temptImg}
            alt="추가된 이미지"
            className="h-full w-full rounded-lg object-cover"
            width={160}
            height={160}
          />
        </label>
      )}
      <input
        className="hidden"
        id="name"
        type="file"
        accept="image/jpeg, image/png"
        onChange={handleImageChange}
      />
    </div>
  );
}
