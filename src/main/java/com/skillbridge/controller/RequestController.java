package com.skillbridge.controller;

import com.skillbridge.dto.RequestCreateDto;
import com.skillbridge.model.LearningRequest;
import com.skillbridge.service.RequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/requests")
@CrossOrigin(origins = "*")
public class RequestController {

    @Autowired
    private RequestService requestService;

    @PostMapping
    public ResponseEntity<?> createRequest(@RequestBody RequestCreateDto dto) {
        try {
            LearningRequest request = requestService.createRequest(dto);
            return ResponseEntity.ok(request);
        } catch (Exception e) {
            Map<String, String> err = new HashMap<>();
            err.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(err);
        }
    }

    @GetMapping("/incoming/{userId}")
    public ResponseEntity<List<LearningRequest>> getIncoming(@PathVariable Long userId) {
        return ResponseEntity.ok(requestService.getIncomingRequests(userId));
    }

    @GetMapping("/outgoing/{userId}")
    public ResponseEntity<List<LearningRequest>> getOutgoing(@PathVariable Long userId) {
        return ResponseEntity.ok(requestService.getOutgoingRequests(userId));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<LearningRequest>> getAllForUser(@PathVariable Long userId) {
        return ResponseEntity.ok(requestService.getAllRequestsForUser(userId));
    }

    @PutMapping("/{id}/accept")
    public ResponseEntity<LearningRequest> acceptRequest(@PathVariable Long id) {
        return ResponseEntity.ok(requestService.acceptRequest(id));
    }

    @PutMapping("/{id}/reject")
    public ResponseEntity<LearningRequest> rejectRequest(@PathVariable Long id) {
        return ResponseEntity.ok(requestService.rejectRequest(id));
    }

    @PutMapping("/{id}/cancel")
    public ResponseEntity<LearningRequest> cancelRequest(@PathVariable Long id) {
        return ResponseEntity.ok(requestService.cancelRequest(id));
    }
}
