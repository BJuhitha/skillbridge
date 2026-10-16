package com.skillbridge.controller;

import com.skillbridge.dto.DashboardSummaryDto;
import com.skillbridge.model.User;
import com.skillbridge.model.UserSkill;
import com.skillbridge.repository.LearningRequestRepository;
import com.skillbridge.repository.LearningSessionRepository;
import com.skillbridge.service.RequestService;
import com.skillbridge.service.SessionService;
import com.skillbridge.service.SkillService;
import com.skillbridge.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/dashboard")
@CrossOrigin(origins = "*")
public class DashboardController {

    @Autowired
    private UserService userService;

    @Autowired
    private SkillService skillService;

    @Autowired
    private RequestService requestService;

    @Autowired
    private SessionService sessionService;

    @Autowired
    private LearningRequestRepository requestRepository;

    @Autowired
    private LearningSessionRepository sessionRepository;

    @GetMapping("/{userId}")
    public ResponseEntity<DashboardSummaryDto> getDashboardSummary(@PathVariable Long userId) {
        User user = userService.getUserById(userId);

        List<UserSkill> teaching = skillService.getUserSkills(userId, "TEACH");
        List<UserSkill> learning = skillService.getUserSkills(userId, "LEARN");

        DashboardSummaryDto dto = new DashboardSummaryDto();
        dto.setSkillsTeachingCount(teaching.size());
        dto.setSkillsLearningCount(learning.size());
        dto.setPendingIncomingRequestsCount(requestRepository.countByReceiverIdAndStatus(userId, "PENDING"));
        dto.setPendingOutgoingRequestsCount(requestRepository.countBySenderIdAndStatus(userId, "PENDING"));
        dto.setScheduledSessionsCount(sessionRepository.countScheduledSessions(userId));
        dto.setCompletedSessionsCount(sessionRepository.countCompletedSessions(userId));
        dto.setUserRating(user.getRating() != null ? user.getRating() : 5.0);

        dto.setTeachingSkills(teaching);
        dto.setLearningSkills(learning);
        dto.setRecentRequests(requestService.getAllRequestsForUser(userId));
        dto.setUpcomingSessions(sessionService.getUpcomingSessions(userId));

        return ResponseEntity.ok(dto);
    }
}
