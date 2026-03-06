import { useEffect, useState } from "react";
import type { Task, TaskStatus } from "../type/task";
import ArrowIcon from "../common/ArrowIcon";

interface Props {
  mode: "create" | "update";
  task?: Task | null;
  onClose: () => void;
  onCreate?: (title: string, description: string) => void;
  onUpdate?: (id: string, status: TaskStatus) => void;
}

const TaskModal = ({ mode, task, onClose, onCreate, onUpdate }: Props) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<TaskStatus>("pending");
  const [openStatus, setOpenStatus] = useState(false);

  useEffect(() => {
    if (mode === "update" && task) {
      setTitle(task.title);
      setDescription(task.description || "");
      setStatus(task.status);
    }
  }, [mode, task]);

  const handleSubmit = () => {
    if (mode === "create" && onCreate) {
      if (!title.trim()) return;
      onCreate(title.trim(), description.trim());
    }

    if (mode === "update" && task && onUpdate) {
      onUpdate(task.id, status);
    }
  };

  const statusOptions: TaskStatus[] = ["pending", "in-progress", "completed"];

  const statusColor = (s: TaskStatus) => {
    if (s === "completed") return "green";
    if (s === "in-progress") return "orange";
    return "gray";
  };

  return (
    <div className="task-page">
      {/* HEADER */}
      <div className="task-page-header">
        <span className="back-arrow" onClick={onClose}>
          ←
        </span>
        <span>{mode === "create" ? "Add Task" : "Edit Task"}</span>
      </div>

      <div className="task-page-body">
        {/* TITLE */}
        <input
          className="task-input"
          value={title}
          disabled={false}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter the title"
        />

        {/* DESCRIPTION */}
        <textarea
          className="task-textarea"
          value={description}
          disabled={false}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter the description"
        />

        {/* STATUS SELECT (UPDATE ONLY) */}
        {mode === "update" && (
          <div className="status-dropdown">
            <div
              className="status-selected"
              onClick={() => setOpenStatus(!openStatus)}
            >
              <div className="status-left">
                <span className={`dot ${statusColor(status)}`}></span>
                <span className="status-text">{status.replace("-", " ")}</span>
              </div>

              <ArrowIcon rotated={openStatus} />
            </div>

            {openStatus && (
              <div className="status-options">
                {statusOptions.map((s) => (
                  <div
                    key={s}
                    className={`status-option ${status === s ? "active" : ""}`}
                    onClick={() => {
                      setStatus(s);
                      setOpenStatus(false);
                    }}
                  >
                    <span className={`dot ${statusColor(s)}`}></span>
                    {s.replace("-", " ")}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* BUTTONS */}
        <div className="form-actions">
          <button className="btn-cancel" onClick={onClose}>
            Cancel
          </button>

          <button className="btn-add" onClick={handleSubmit}>
            {mode === "create" ? "ADD" : "UPDATE"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;
