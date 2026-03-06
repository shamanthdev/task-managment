import { useState } from "react";
import type { Task } from "../type/task";
import ArrowIcon from "../common/ArrowIcon";

interface Props {
  tasks: Task[];
  onDelete: (id: string) => void;
  onUpdateStatus: (task: Task) => void;
}

const TaskList = ({ tasks, onDelete, onUpdateStatus }: Props) => {
  const [openSection, setOpenSection] = useState<string | null>(null);

  const inProgressTasks = tasks.filter((t) => t.status === "in-progress");
  const pendingTasks = tasks.filter((t) => t.status === "pending");
  const completedTasks = tasks.filter((t) => t.status === "completed");

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };
  const LogoIcon = () => (
  <svg width="30" height="30" viewBox="0 0 30 30">
    <circle cx="15" cy="15" r="14.5" fill="white" />
    <g transform="translate(11.5,9.5)">
      <path d="M0 0H1.36V9.92H5.76V11.2H0V0Z" fill="#034EA2"/>
    </g>
  </svg>
);

  const renderTasks = (taskList: Task[]) =>
    taskList.map((task) => (
      <div className={`task-item ${task.status}`} key={task.id}>
        <div className="task-icon">
          <div className="icon-circle">
            <LogoIcon />
          </div>
        </div>

        <div className="task-details">
          <div className="task-title">{task.title}</div>

          {task.description && (
            <div className="task-desc">{task.description}</div>
          )}

          {task.date && <div className="task-date">{task.date}</div>}
        </div>

        <div className="task-right">
          <div
            className={`task-status ${task.status
              .replace("-", " ")
              .replace(/\b\w/g, (c) => c.toUpperCase())}`}
          >
            <span className="status-dot"></span>
            {task.status
              .replace("-", " ")
              .replace(/\b\w/g, (c) => c.toUpperCase())}
          </div>

          <div className="task-actions">
            {task.status !== "completed" && (
              <button
                className="icon-btn edit"
                onClick={() => onUpdateStatus(task)}
              >
                <svg
                  className="edit-icon"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zm2.92 2.33H5v-.92l9.06-9.06.92.92L5.92 19.58zM20.71 7.04a1.003 1.003 0 000-1.42L18.37 3.29a1.003 1.003 0 00-1.42 0l-1.83 1.83 3.75 3.75 1.84-1.83z"
                  />
                </svg>
              </button>
            )}

            <button
              className="icon-btn delete"
              onClick={() => onDelete(task.id)}
            >
              <svg
                className="trash-icon"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M6 7h12v2H6V7zm2 3h8l-1 9H9L8 10zm3-5h2l1 1h5v2H5V6h5l1-1z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    ));

  return (
    <div className="task-list">
      {/* In Progress */}
      <div className="task-section">
        <div
          className="section-header"
          onClick={() => toggleSection("in-progress")}
        >
          <span>In Progress ({inProgressTasks.length})</span>
          <ArrowIcon rotated={openSection === "in-progress"} />
        </div>

        {openSection === "in-progress" && renderTasks(inProgressTasks)}
      </div>

      {/* Pending */}
      <div className="task-section">
        <div
          className="section-header"
          onClick={() => toggleSection("pending")}
        >
          <span>Pending ({pendingTasks.length})</span>
          <ArrowIcon rotated={openSection === "pending"} />
          {/* <span className="arrow">
            {openSection === "pending" ? "⌃" : "⌄"}
          </span> */}
        </div>

        {openSection === "pending" && renderTasks(pendingTasks)}
      </div>

      {/* Completed */}
      <div className="task-section">
        <div
          className="section-header"
          onClick={() => toggleSection("completed")}
        >
          <span>Completed ({completedTasks.length})</span>
          <ArrowIcon rotated={openSection === "completed"} />
        </div>

        {openSection === "completed" && renderTasks(completedTasks)}
      </div>
    </div>
  );
};

export default TaskList;
