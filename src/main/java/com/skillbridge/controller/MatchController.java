package com.skillbridge.controller;

import com.skillbridge.dto.MatchDto;
import com.skillbridge.service.MatchService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/matches")
@CrossOrigin(origins = "*")
public class MatchController {

    private final MatchService matchService;

    public MatchController(MatchService matchService) {
        this.matchService = matchService;
    }

    @GetMapping("/{userId}")
    public ResponseEntity<List<MatchDto>> getMatchesForUser(@PathVariable Long userId) {
        return ResponseEntity.ok(matchService.findMatchesForUser(userId));
    }
}
