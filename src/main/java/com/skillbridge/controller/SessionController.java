package com.skillbridge.controller;

import com.skillbridge.dto.CompleteSessionDto;
import com.skillbridge.dto.SessionCreateDto;
import com.skillbridge.model.LearningSession;
import com.skillbridge.service.SessionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/sessions")
@CrossOrigin(origins = "*")
public class SessionController {

    @Autowired
    private SessionService sessionService;

    @PostMapping
    public ResponseEntity<?> createSession(@RequestBody SessionCreateDto dto) {
        try {
            LearningSession session = sessionService.createSession(dto);
            return ResponseEntity.ok(session);
        } catch (Exception e) {
            Map<String, String> err = new HashMap<>();
            err.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(err);
        }
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<LearningSession>> getSessionsForUser(@PathVariable Long userId) {
        return ResponseEntity.ok(sessionService.getSessionsForUser(userId));
    }

    @GetMapping("/upcoming/{userId}")
    public ResponseEntity<List<LearningSession>> getUpcomingSessions(@PathVariable Long userId) {
        return ResponseEntity.ok(sessionService.getUpcomingSessions(userId));
    }

    @PutMapping("/{id}/complete")
    public ResponseEntity<?> completeSession(@PathVariable Long id, @RequestBody(required = false) CompleteSessionDto feedback) {
        try {
            LearningSession session = sessionService.completeSession(id, feedback);
            return ResponseEntity.ok(session);
        } catch (Exception e) {
            Map<String, String> err = new HashMap<>();
            err.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(err);
        }
    }

    @PutMapping("/{id}/cancel")
    public ResponseEntity<LearningSession> cancelSession(@PathVariable Long id) {
        return ResponseEntity.ok(sessionService.cancelSession(id));
    }
}
