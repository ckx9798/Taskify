import React, { useState } from "react";
import TaskFormModal from "@/components/modal/TaskFormModal";
import { PostResponse } from "@/libs/api/cards";

const ParentComponent: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tasks, setTasks] = useState<PostResponse[]>([]);

  const handleCreate = (newTask: PostResponse) => {
    setTasks((prevTasks) => [...prevTasks, newTask]);
    setIsModalOpen(false); // 모달 닫기
  };

  return (
    <div>
      <button onClick={() => setIsModalOpen(true)}>할 일 추가</button>
      <TaskFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        column={41185}
        dashboardId={12174}
        onCreate={handleCreate}
      />
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>{task.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default ParentComponent;
