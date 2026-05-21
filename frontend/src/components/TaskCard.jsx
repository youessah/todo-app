import { taskService } from '../services/api';

const priorityColors = { LOW: '#28a745', MEDIUM: '#ffc107', HIGH: '#dc3545' };
const statusLabels = { TODO: 'À faire', IN_PROGRESS: 'En cours', DONE: 'Terminée' };

export default function TaskCard({ task, onEdit, onDelete, onStatusChange }) {
  const handleStatus = async (status) => {
    await taskService.update(task.id, { status });
    onStatusChange();
  };

  return (
    <div className={`task-card ${task.status.toLowerCase()}`}>
      <div className="task-header">
        <span className="priority-badge" style={{ background: priorityColors[task.priority] }}>
          {task.priority}
        </span>
        <span className="status-badge">{statusLabels[task.status]}</span>
      </div>
      <h3>{task.title}</h3>
      {task.description && <p>{task.description}</p>}
      {task.dueDate && (
        <p className="due-date">📅 {new Date(task.dueDate).toLocaleDateString('fr-FR')}</p>
      )}
      <div className="task-actions">
        {task.status !== 'IN_PROGRESS' && task.status !== 'DONE' && (
          <button onClick={() => handleStatus('IN_PROGRESS')} className="btn-status">▶ Démarrer</button>
        )}
        {task.status !== 'DONE' && (
          <button onClick={() => handleStatus('DONE')} className="btn-done">✓ Terminer</button>
        )}
        {task.status === 'DONE' && (
          <button onClick={() => handleStatus('TODO')} className="btn-status">↩ Rouvrir</button>
        )}
        <button onClick={onEdit} className="btn-edit">✏️</button>
        <button onClick={onDelete} className="btn-delete">🗑️</button>
      </div>
    </div>
  );
}
