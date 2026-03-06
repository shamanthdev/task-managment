import type { Task } from '../type/task';

interface Props {
  tasks: Task[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

const TaskList = ({ tasks, onToggle, onDelete }: Props) => {
  return (
    <div className="table-wrapper">
      <table className="data-table">
        <thead>
          <tr>
            <th>Task Name</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map(task => (
            <tr key={task.id}>
              <td>{task.title}</td>
              <td>
                <span
                  className={
                    task.status === 'completed'
                      ? 'status active'
                      : 'status inactive'
                  }
                >
                  {task.status === 'completed' ? 'Completed' : 'Pending'}
                </span>
              </td>
              <td>
                <button
                  className="link-btn"
                  onClick={() => onToggle(task.id)}
                >
                  Update
                </button>
                <button
                  className="link-btn danger"
                  onClick={() => onDelete(task.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {tasks.length === 0 && (
        <p className="empty">No tasks found</p>
      )}
    </div>
  );
};

export default TaskList;

