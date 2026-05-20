package com.todoapp.backend.dto;

import com.todoapp.backend.entity.Task;
import jakarta.validation.constraints.*;
import lombok.*;

import java.time.LocalDateTime;

public class Dtos {

    // ── Auth ────────────────────────────────────────────────────────────────

    @Data public static class RegisterRequest {
        @NotBlank @Size(min=3, max=50) private String username;
        @NotBlank @Email               private String email;
        @NotBlank @Size(min=6)         private String password;
    }

    @Data public static class LoginRequest {
        @NotBlank private String username;
        @NotBlank private String password;
    }

    @Data @AllArgsConstructor
    public static class AuthResponse {
        private String token;
        private String username;
        private String email;
    }

    // ── Task ─────────────────────────────────────────────────────────────────

    @Data public static class TaskRequest {
        @NotBlank @Size(min=1, max=200) private String title;
        private String description;
        private Task.Priority priority;
        private LocalDateTime dueDate;
    }

    @Data public static class TaskUpdateRequest {
        @Size(min=1, max=200) private String title;
        private String description;
        private Task.Status   status;
        private Task.Priority priority;
        private LocalDateTime dueDate;
    }

    @Data @AllArgsConstructor @NoArgsConstructor @Builder
    public static class TaskResponse {
        private Long          id;
        private String        title;
        private String        description;
        private Task.Status   status;
        private Task.Priority priority;
        private LocalDateTime dueDate;
        private LocalDateTime createdAt;
        private LocalDateTime updatedAt;

        public static TaskResponse from(Task t) {
            return TaskResponse.builder()
                .id(t.getId())
                .title(t.getTitle())
                .description(t.getDescription())
                .status(t.getStatus())
                .priority(t.getPriority())
                .dueDate(t.getDueDate())
                .createdAt(t.getCreatedAt())
                .updatedAt(t.getUpdatedAt())
                .build();
        }
    }

    @Data @AllArgsConstructor @NoArgsConstructor
    public static class StatsResponse {
        private long total;
        private long todo;
        private long inProgress;
        private long done;
    }
}
