package com.todoapp.backend.service;

import com.todoapp.backend.dto.Dtos.*;
import com.todoapp.backend.entity.Task;
import com.todoapp.backend.entity.Task.Status;
import com.todoapp.backend.entity.User;
import com.todoapp.backend.repository.TaskRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class TaskService {

    private final TaskRepository taskRepository;

    public List<TaskResponse> getAllTasks(User user, String status, String priority) {
        if (status != null) {
            return taskRepository
                .findByUserIdAndStatusOrderByCreatedAtDesc(user.getId(), Status.valueOf(status))
                .stream().map(TaskResponse::from).toList();
        }
        if (priority != null) {
            return taskRepository
                .findByUserIdAndPriorityOrderByCreatedAtDesc(user.getId(), Task.Priority.valueOf(priority))
                .stream().map(TaskResponse::from).toList();
        }
        return taskRepository
            .findByUserIdOrderByCreatedAtDesc(user.getId())
            .stream().map(TaskResponse::from).toList();
    }

    public TaskResponse createTask(User user, TaskRequest request) {
        Task task = Task.builder()
            .title(request.getTitle())
            .description(request.getDescription())
            .priority(request.getPriority() != null ? request.getPriority() : Task.Priority.MEDIUM)
            .dueDate(request.getDueDate())
            .user(user)
            .build();
        return TaskResponse.from(taskRepository.save(task));
    }

    public TaskResponse getTask(User user, Long id) {
        return taskRepository.findByIdAndUserId(id, user.getId())
            .map(TaskResponse::from)
            .orElseThrow(() -> new IllegalArgumentException("Tâche non trouvée"));
    }

    public TaskResponse updateTask(User user, Long id, TaskUpdateRequest request) {
        Task task = taskRepository.findByIdAndUserId(id, user.getId())
            .orElseThrow(() -> new IllegalArgumentException("Tâche non trouvée"));

        if (request.getTitle()       != null) task.setTitle(request.getTitle());
        if (request.getDescription() != null) task.setDescription(request.getDescription());
        if (request.getStatus()      != null) task.setStatus(request.getStatus());
        if (request.getPriority()    != null) task.setPriority(request.getPriority());
        if (request.getDueDate()     != null) task.setDueDate(request.getDueDate());

        return TaskResponse.from(taskRepository.save(task));
    }

    public void deleteTask(User user, Long id) {
        Task task = taskRepository.findByIdAndUserId(id, user.getId())
            .orElseThrow(() -> new IllegalArgumentException("Tâche non trouvée"));
        taskRepository.delete(task);
    }

    @Transactional(readOnly = true)
    public StatsResponse getStats(User user) {
        long total      = taskRepository.countByUserIdAndStatus(user.getId(), Status.TODO)
                        + taskRepository.countByUserIdAndStatus(user.getId(), Status.IN_PROGRESS)
                        + taskRepository.countByUserIdAndStatus(user.getId(), Status.DONE);
        long todo       = taskRepository.countByUserIdAndStatus(user.getId(), Status.TODO);
        long inProgress = taskRepository.countByUserIdAndStatus(user.getId(), Status.IN_PROGRESS);
        long done       = taskRepository.countByUserIdAndStatus(user.getId(), Status.DONE);
        return new StatsResponse(total, todo, inProgress, done);
    }
}
