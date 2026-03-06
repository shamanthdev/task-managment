import { useState } from "react";

interface Props {
  onAdd: (title: string, description: string) => void;
  onCancel: () => void;
}

const TaskForm = ({ onAdd, onCancel }: Props) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) return;

    onAdd(title.trim(), description.trim());

    setTitle("");
    setDescription("");
  };

  return (
    <div className="add-task-page">
      
      {/* HEADER */}
      <div className="add-task-header">
        <span className="back-arrow" onClick={onCancel}>←</span>
        <span>Add Task</span>
      </div>

      {/* FORM */}
      <form onSubmit={handleSubmit} className="task-form">

        <input
          className="task-input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter the title"
        />

        <textarea
          className="task-textarea"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter the description"
        />

        <div className="form-actions">
          <button
            type="button"
            className="btn-cancel"
            onClick={onCancel}
          >
            Cancel
          </button>

          <button
            type="submit"
            className="btn-add"
          >
            ADD
          </button>
        </div>

      </form>
    </div>
  );
};

export default TaskForm;