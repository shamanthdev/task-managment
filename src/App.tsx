import { useEffect, useState } from "react";
import type { Task, TaskStatus } from "./type/task";
import { loadTasks, saveTasks } from "./utils/storage";
import TaskList from "./components/TaskList";
import TaskModal from "./components/TaskModal";
import "./index.css";

type Page = "list" | "create" | "update";

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [page, setPage] = useState<Page>("list");
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setTasks(loadTasks());
  }, []);

  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  // CREATE
  const addTask = (title: string, description: string) => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      title,
      description,
      status: "pending",
      date: new Date().toDateString(),
    };

    setTasks((prev) => [...prev, newTask]);
    setPage("list");
  };

  // UPDATE STATUS
  const updateStatus = (id: string, status: TaskStatus) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, status } : task
      )
    );

    setPage("list");
    setSelectedTask(null);
  };

  // DELETE
  const deleteTask = (id: string) => {
    const confirmDelete = window.confirm("Do you want to delete this task?");
    if (!confirmDelete) return;

    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  // OPEN PAGES
  const openCreate = () => {
    setPage("create");
    setSelectedTask(null);
  };

  const openUpdate = (task: Task) => {
    setSelectedTask(task);
    setPage("update");
  };

  // SEARCH
  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(search.toLowerCase())
  );

  // CREATE / UPDATE PAGE
  if (page === "create" || page === "update") {
    return (
      <TaskModal
        mode={page}
        task={selectedTask}
        onClose={() => setPage("list")}
        onCreate={addTask}
        onUpdate={updateStatus}
      />
    );
  }

  // MAIN TODO PAGE
  return (
    <div className="app-container">

      {/* HEADER */}
      <div className="app-header">
        TO-DO APP
      </div>

      {/* SEARCH */}
  <div className="search-wrapper">
  <div className="search-box">

    <svg
      className="search-icon"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      <path d="M18 17.3723L14.6479 14.0202C15.4534 13.0532 15.8551 11.8129 15.7693 10.5573C15.6836 9.30166 15.1171 8.12742 14.1877 7.27884C13.2583 6.43026 12.0375 5.97267 10.7792 6.00126C9.52103 6.02986 8.32227 6.54243 7.43235 7.43235C6.54243 8.32227 6.02986 9.52103 6.00126 10.7792C5.97267 12.0375 6.43026 13.2583 7.27884 14.1877C8.12742 15.1171 9.30166 15.6836 10.5573 15.7693C11.8129 15.8551 13.0532 15.4534 14.0202 14.6479L17.3723 18L18 17.3723Z" />
    </svg>

    <input
      className="search-input"
      placeholder="Search To-Do"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />

  </div>
</div>

      {/* TASK LIST */}
      <TaskList
        tasks={filteredTasks}
        onDelete={deleteTask}
        onUpdateStatus={openUpdate}
      />

      {/* FLOATING BUTTON */}
      <button className="fab" onClick={openCreate}>
        +
      </button>

    </div>
  );
}

export default App;