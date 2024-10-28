import CreateColumn from "@/components/modal/CreateColumn";
import { useState } from "react";

export default function Page() {
  const [isOpen, setIsOpen] = useState(false);
  const handleOpenModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    // Open the modal
    e.preventDefault();
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    // Close the modal
    setIsOpen(false);
  };

  return (
    <>
      <button onClick={handleOpenModal}>Open Modal</button>
      <div>
        <CreateColumn
          isOpen={isOpen}
          onClose={handleCloseModal}
          dashboardId={12167}
        />
      </div>
    </>
  );
}
