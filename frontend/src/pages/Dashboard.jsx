import { useState, useEffect } from 'react';
import { taskService } from '../services/api';
import { useAuth } from '../context/AuthContext';
import TaskCard from '../components/TaskCard';
import TaskForm from '../components/TaskForm';

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [stats, setStats] = useState(null);
  const [filter, setFilter] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editTask, setEditTask] = useState(null);
  const { user, logout } = useAuth();

  const loadTasks = async () => {
    try {
      const params = filter ? { status: filter } : {};
      const res = await taskService.getAll(params);
      setTasks(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const loadStats = async () => {
    try {
      const res = await taskService.getStats();
      setStats(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadTasks();
    loadStats();
  }, [filter]);

  const handleDelete = async (id) => {
    if (!confirm('Supprimer cette tâche ?')) return;
    await taskService.delete(id);
    loadTasks();
    loadStats();
  };

  const handleSave = () => {
    setShowForm(false);
    setEditTask(null);
    loadTasks();
    loadStats();
  };

  return (
    <div className="dashboard">
      <header className="header">
        <h1>📝 Todo App</h1>
        <div className="header-right">
          <span>Bonjour, {user?.username} 👋</span>
          <button className="btn-logout" onClick={logout}>Déconnexion</button>
        </div>
      </header>

      {stats && (
        <div className="stats">
          <div className="stat-card">
            <span className="stat-number">{stats.total}</span>
            <span className="stat-label">Total</span>
          </div>
          <div className="stat-card todo">
            <span className="stat-number">{stats.todo}</span>
            <span className="stat-label">À faire</span>
          </div>
          <div className="stat-card in-progress">
            <span className="stat-number">{stats.inProgress}</span>
            <span className="stat-label">En cours</span>
          </div>
          <div className="stat-card done">
            <span className="stat-number">{stats.done}</span>
            <span className="stat-label">Terminées</span>
          </div>
        </div>
      )}

      <div className="toolbar">
        <div className="filters">
          {['', 'TODO', 'IN_PROGRESS', 'DONE'].map((s) => (
            <button
              key={s}
              className={`filter-btn ${filter === s ? 'active' : ''}`}
              onClick={() => setFilter(s)}
            >
              {s === '' ? 'Toutes' : s === 'TODO' ? 'À faire' : s === 'IN_PROGRESS' ? 'En cours' : 'Terminées'}
            </button>
          ))}
        </div>
        <button className="btn-add" onClick={() => { setEditTask(null); setShowForm(true); }}>
          + Nouvelle tâche
        </button>
      </div>

      {showForm && (
        <TaskForm
          task={editTask}
          onSave={handleSave}
          onCancel={() => { setShowForm(false); setEditTask(null); }}
        />
      )}

      <div className="tasks-grid">
        {tasks.length === 0 ? (
          <div className="empty">Aucune tâche. Créez-en une !</div>
        ) : (
          tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onEdit={() => { setEditTask(task); setShowForm(true); }}
              onDelete={() => handleDelete(task.id)}
              onStatusChange={loadTasks}
            />
          ))
        )}
      </div>
    </div>
  );
}
