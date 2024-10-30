import ColumnManager from "@/components/modal/ColumnManager";
import CreateColumn from "@/components/modal/CreateColumn";
import DashboardInvite from "@/components/modal/DashboardInvite";
import DeleteAllCardsModal from "@/components/modal/DeleteAllCardsModal";
import React, { useState } from "react";

export default function Page() {
  const [isCreateColumnOpen, setIsCreateColumnOpen] = useState(false);
  const [isDeleteAllCardsOpen, setIsDeleteAllCardsOpen] = useState(false);
  const [isDashboardInviteOpen, setIsDashboardInviteOpen] = useState(false);
  const [isColumnManagerOpen, setIsColumnManagerOpen] = useState(false);

  const handleOpenCreateColumn = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsCreateColumnOpen(true);
  };

  const handleCloseCreateColumn = () => {
    setIsCreateColumnOpen(false);
  };

  const handleOpenDeleteAllCards = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsDeleteAllCardsOpen(true);
  };

  const handleCloseDeleteAllCards = () => {
    setIsDeleteAllCardsOpen(false);
  };

  const handleOpenDashboardInvite = (
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    e.preventDefault();
    setIsDashboardInviteOpen(true);
  };

  const handleCloseDashboardInvite = () => {
    setIsDashboardInviteOpen(false);
  };

  const handleOpenColumnManager = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsColumnManagerOpen(true);
  };

  const handleCloseColumnManager = () => {
    setIsColumnManagerOpen(false);
  };

  return (
    <>
      <button onClick={handleOpenCreateColumn}>Open Create Column Modal</button>
      <br />
      <button onClick={handleOpenDeleteAllCards}>
        Open Delete All Cards Modal
      </button>
      <br />
      <button onClick={handleOpenDashboardInvite}>
        Open Dashboard Invite Modal
      </button>
      <br />
      <button onClick={handleOpenColumnManager}>
        Open Column Manager Modal
      </button>
      <br />
      <div>
        <CreateColumn
          isOpen={isCreateColumnOpen}
          onClose={handleCloseCreateColumn}
          dashboardId={12167}
        />
        <DeleteAllCardsModal
          isOpen={isDeleteAllCardsOpen}
          onClose={handleCloseDeleteAllCards}
          columnId={41191}
        />
        <DashboardInvite
          isOpen={isDashboardInviteOpen}
          onClose={handleCloseDashboardInvite}
          dashboardId={12167}
        />
        <ColumnManager
          isOpen={isColumnManagerOpen}
          onClose={handleCloseColumnManager}
          dashboardId={12167}
          columnId={41191}
        />
      </div>
    </>
  );
}
