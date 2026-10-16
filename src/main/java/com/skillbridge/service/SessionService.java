package com.skillbridge.service;

import com.skillbridge.dto.CompleteSessionDto;
import com.skillbridge.dto.SessionCreateDto;
import com.skillbridge.model.LearningRequest;
import com.skillbridge.model.LearningSession;
import com.skillbridge.model.User;
import com.skillbridge.repository.LearningRequestRepository;
import com.skillbridge.repository.LearningSessionRepository;
import com.skillbridge.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class SessionService {

    @Autowired
    private LearningSessionRepository sessionRepository;

    @Autowired
    private LearningRequestRepository requestRepository;

    @Autowired
    private UserRepository userRepository;

    public LearningSession createSession(SessionCreateDto dto) {
        User teacher = userRepository.findById(dto.getTeacherId())
                .orElseThrow(() -> new RuntimeException("Teacher not found"));
        User learner = userRepository.findById(dto.getLearnerId())
                .orElseThrow(() -> new RuntimeException("Learner not found"));

        LearningRequest request = null;
        if (dto.getRequestId() != null) {
            request = requestRepository.findById(dto.getRequestId()).orElse(null);
        }

        LocalDateTime scheduledTime = dto.getScheduledTime() != null ? dto.getScheduledTime() : LocalDateTime.now().plusDays(1);

        LearningSession session = new LearningSession(
                request,
                teacher,
                learner,
                dto.getSkillName(),
                scheduledTime,
                dto.getDurationMinutes(),
                dto.getMeetingType(),
                dto.getMeetingLinkOrLocation() != null ? dto.getMeetingLinkOrLocation() : "Google Meet: meet.google.com/abc-defg-hij",
                dto.getNotes()
        );

        return sessionRepository.save(session);
    }

    public List<LearningSession> getSessionsForUser(Long userId) {
        return sessionRepository.findAllForUser(userId);
    }

    public List<LearningSession> getUpcomingSessions(Long userId) {
        return sessionRepository.findForUserByStatus(userId, "SCHEDULED");
    }

    public LearningSession completeSession(Long sessionId, CompleteSessionDto feedback) {
        LearningSession session = sessionRepository.findById(sessionId)
                .orElseThrow(() -> new RuntimeException("Session not found"));

        session.setStatus("COMPLETED");
        if (feedback != null) {
            if (feedback.getFeedbackRating() != null) {
                session.setFeedbackRating(feedback.getFeedbackRating());
                
                // Recalculate teacher's average rating
                User teacher = session.getTeacher();
                double currentRating = teacher.getRating() != null ? teacher.getRating() : 5.0;
                double newRating = Math.round(((currentRating + feedback.getFeedbackRating()) / 2.0) * 10.0) / 10.0;
                teacher.setRating(newRating);
                userRepository.save(teacher);
            }
            if (feedback.getFeedbackComments() != null) {
                session.setFeedbackComments(feedback.getFeedbackComments());
            }
        }

        return sessionRepository.save(session);
    }

    public LearningSession cancelSession(Long sessionId) {
        LearningSession session = sessionRepository.findById(sessionId)
                .orElseThrow(() -> new RuntimeException("Session not found"));
        session.setStatus("CANCELLED");
        return sessionRepository.save(session);
    }
}
