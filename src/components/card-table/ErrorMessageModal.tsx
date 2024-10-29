import BoxButton from "../BoxButton";

export default function ErrorMessageModal({
  errorMessage,
  width,
  height,
  modalClose,
}) {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      onClick={modalClose}
    >
      <div
        className="flex flex-col items-center justify-center rounded-2xl bg-white p-9 shadow-lg"
        style={{ width, height }}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <p className="mb-7 text-lg font-medium text-black">{errorMessage}</p>
        <BoxButton
          backgroundColor="purple"
          radius="8"
          paddingTopBottom="12"
          paddingRightLeft="99"
          fontSize="16"
          onClick={modalClose}
        >
          확인
        </BoxButton>
      </div>
    </div>
  );
}
