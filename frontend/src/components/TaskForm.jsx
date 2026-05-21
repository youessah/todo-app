import { useState } from 'react';
import { taskService } from '../services/api';

export default function TaskForm({ task, onSave, onCancel }) {
  const [form, setForm] = useState({
    title: task?.title || '',
    description: task?.description || '',
    priority: task?.priority || 'MEDIUM',
    status: task?.status || 'TODO',
    dueDate: task?.dueDate ? task.dueDate.substring(0, 10) : '',
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = { ...form, dueDate: form.dueDate ? form.dueDate + 'T00:00:00' : null };
      if (task) await taskService.update(task.id, data);
      else await taskService.create(data);
      onSave();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>{task ? 'Modifier la tâche' : 'Nouvelle tâche'}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Titre *"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
          />
          <textarea
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            rows={3}
          />
          <select value={form.priority} onChange={(e) => setForm({ ...form, priority: e.target.value })}>
            <option value="LOW">Priorité basse</option>
            <option value="MEDIUM">Priorité moyenne</option>
            <option value="HIGH">Priorité haute</option>
          </select>
          {task && (
            <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
              <option value="TODO">À faire</option>
              <option value="IN_PROGRESS">En cours</option>
              <option value="DONE">Terminée</option>
            </select>
          )}
          <input
            type="date"
            value={form.dueDate}
            onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
          />
          <div className="form-actions">
            <button type="button" onClick={onCancel} className="btn-cancel">Annuler</button>
            <button type="submit" disabled={loading}>
              {loading ? 'Sauvegarde...' : 'Sauvegarder'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
