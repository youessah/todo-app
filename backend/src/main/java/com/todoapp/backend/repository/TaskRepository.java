package com.todoapp.backend.repository;

import com.todoapp.backend.entity.Task;
import com.todoapp.backend.entity.Task.Status;
import com.todoapp.backend.entity.Task.Priority;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {

    List<Task> findByUserIdOrderByCreatedAtDesc(Long userId);

    List<Task> findByUserIdAndStatusOrderByCreatedAtDesc(Long userId, Status status);

    List<Task> findByUserIdAndPriorityOrderByCreatedAtDesc(Long userId, Priority priority);

    Optional<Task> findByIdAndUserId(Long id, Long userId);

    @Query("SELECT COUNT(t) FROM Task t WHERE t.user.id = :userId AND t.status = :status")
    long countByUserIdAndStatus(Long userId, Status status);
}
