import { useEffect, useMemo, useState } from "react";
import {
  Check, ClipboardList, Hourglass, PartyPopper, Plus, Trash2,
  CheckCircle2, Circle, ListTodo, Sparkles
} from "lucide-react";
import "./App.css";

const STORAGE_KEY = "taskmate-tasks-v1";

export default function App() {
  const [tasks, setTasks] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [newTask, setNewTask] = useState("");
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  const completedCount = tasks.filter((task) => task.completed).length;
  const remainingCount = tasks.length - completedCount;
  const visibleTasks = useMemo(() => {
    if (filter === "Active") return tasks.filter((task) => !task.completed);
    if (filter === "Completed") return tasks.filter((task) => task.completed);
    return tasks;
  }, [tasks, filter]);

  function addTask(event) {
    event.preventDefault();
    const title = newTask.trim();
    if (!title) return;
    setTasks((current) => [
      { id: `${Date.now()}-${Math.random()}`, title, completed: false, createdAt: new Date().toISOString() },
      ...current
    ]);
    setNewTask("");
  }

  function toggleTask(id) {
    setTasks((current) =>
      current.map((task) => task.id === id ? { ...task, completed: !task.completed } : task)
    );
  }

  function deleteTask(id) {
    setTasks((current) => current.filter((task) => task.id !== id));
  }

  return (
    <div className="app">
      <header className="navbar">
        <a className="brand" href="#" aria-label="TaskMate home">
          <span className="brand-check"><Check size={19} strokeWidth={3} /></span>
          <span>TaskMate</span>
        </a>
        <span className="nav-label">MY TASK MANAGER</span>
      </header>

      <main className="container">
        <section className="hero">
          <p className="eyebrow">YOUR PERSONAL WORKSPACE</p>
          <h1>Make today <span>count.</span></h1>
          <p className="hero-subtitle">Small steps every day lead to big results.</p>
        </section>

        <section className="stats-grid" aria-label="Task summary">
          <StatCard icon={<ClipboardList />} label="Total Tasks" value={tasks.length} tone="blue" />
          <StatCard icon={<Hourglass />} label="Remaining" value={remainingCount} tone="amber" />
          <StatCard icon={<PartyPopper />} label="Completed" value={completedCount} tone="purple" />
        </section>

        <section className="tasks-panel">
          <div className="panel-heading">
            <div>
              <h2>My Tasks</h2>
              <p>Keep track of what matters today.</p>
            </div>
            <span className="tiny-sparkle"><Sparkles size={18} /></span>
          </div>

          <form className="add-form" onSubmit={addTask}>
            <label className="sr-only" htmlFor="task-input">What do you need to do?</label>
            <input
              id="task-input"
              value={newTask}
              onChange={(event) => setNewTask(event.target.value)}
              placeholder="What do you need to do?"
              maxLength={180}
            />
            <button className="add-button" type="submit"><Plus size={18} /> Add Task</button>
          </form>

          <div className="task-toolbar">
            <div className="filters" role="group" aria-label="Filter tasks">
              {["All", "Active", "Completed"].map((name) => (
                <button
                  type="button"
                  key={name}
                  className={`filter-button ${filter === name ? "selected" : ""}`}
                  onClick={() => setFilter(name)}
                  aria-pressed={filter === name}
                >
                  {name}
                </button>
              ))}
            </div>
            <span className="task-count">{visibleTasks.length} {visibleTasks.length === 1 ? "task" : "tasks"}</span>
          </div>

          {visibleTasks.length > 0 ? (
            <ul className="task-list">
              {visibleTasks.map((task) => (
                <li className={`task-item ${task.completed ? "is-completed" : ""}`} key={task.id}>
                  <button
                    className="complete-button"
                    type="button"
                    onClick={() => toggleTask(task.id)}
                    aria-label={task.completed ? `Mark ${task.title} active` : `Complete ${task.title}`}
                  >
                    {task.completed ? <CheckCircle2 size={22} /> : <Circle size={22} />}
                  </button>
                  <span className="task-title">{task.title}</span>
                  <span className={`status-pill ${task.completed ? "done" : "pending"}`}>
                    {task.completed ? "Completed" : "Active"}
                  </span>
                  <button className="delete-button" type="button" onClick={() => deleteTask(task.id)} aria-label={`Delete ${task.title}`}>
                    <Trash2 size={17} />
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <div className="empty-state">
              <div className="empty-icon"><ListTodo size={27} /></div>
              <h3>{filter === "Completed" ? "Nothing completed yet" : filter === "Active" ? "You're all caught up!" : "Your task list is empty"}</h3>
              <p>{filter === "Completed" ? "Finish a task and it will show up here." : filter === "Active" ? "All your tasks are complete. Nice work!" : "Add your first task above and make today count."}</p>
            </div>
          )}
        </section>

        <footer className="footer">
          <span>Made for your everyday wins</span>
          <span><CheckCircle2 size={14} /> One step at a time</span>
        </footer>
      </main>
    </div>
  );
}

function StatCard({ icon, label, value, tone }) {
  return (
    <article className="stat-card">
      <div className={`stat-icon ${tone}`}>{icon}</div>
      <div className="stat-copy">
        <p>{label}</p>
        <strong>{value}</strong>
      </div>
    </article>
  );
}