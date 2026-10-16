package com.skillbridge.service;

import com.skillbridge.dto.RequestCreateDto;
import com.skillbridge.model.LearningRequest;
import com.skillbridge.model.Skill;
import com.skillbridge.model.User;
import com.skillbridge.repository.LearningRequestRepository;
import com.skillbridge.repository.SkillRepository;
import com.skillbridge.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class RequestService {

    @Autowired
    private LearningRequestRepository requestRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private SkillRepository skillRepository;

    public LearningRequest createRequest(RequestCreateDto dto) {
        if (dto.getSenderId().equals(dto.getReceiverId())) {
            throw new RuntimeException("You cannot send a learning request to yourself!");
        }

        User sender = userRepository.findById(dto.getSenderId())
                .orElseThrow(() -> new RuntimeException("Sender not found"));
        User receiver = userRepository.findById(dto.getReceiverId())
                .orElseThrow(() -> new RuntimeException("Receiver not found"));

        Skill skill = skillRepository.findById(dto.getSkillId())
                .orElseThrow(() -> new RuntimeException("Skill not found"));

        Skill offeredSkill = null;
        if (dto.getOfferedSkillId() != null) {
            offeredSkill = skillRepository.findById(dto.getOfferedSkillId()).orElse(null);
        }

        LearningRequest request = new LearningRequest(sender, receiver, skill, offeredSkill, dto.getMessage());
        return requestRepository.save(request);
    }

    public List<LearningRequest> getIncomingRequests(Long userId) {
        return requestRepository.findByReceiverIdOrderByCreatedAtDesc(userId);
    }

    public List<LearningRequest> getOutgoingRequests(Long userId) {
        return requestRepository.findBySenderIdOrderByCreatedAtDesc(userId);
    }

    public List<LearningRequest> getAllRequestsForUser(Long userId) {
        return requestRepository.findBySenderIdOrReceiverIdOrderByCreatedAtDesc(userId, userId);
    }

    public LearningRequest acceptRequest(Long requestId) {
        LearningRequest req = requestRepository.findById(requestId)
                .orElseThrow(() -> new RuntimeException("Request not found"));
        req.setStatus("ACCEPTED");
        req.setUpdatedAt(LocalDateTime.now());
        return requestRepository.save(req);
    }

    public LearningRequest rejectRequest(Long requestId) {
        LearningRequest req = requestRepository.findById(requestId)
                .orElseThrow(() -> new RuntimeException("Request not found"));
        req.setStatus("REJECTED");
        req.setUpdatedAt(LocalDateTime.now());
        return requestRepository.save(req);
    }

    public LearningRequest cancelRequest(Long requestId) {
        LearningRequest req = requestRepository.findById(requestId)
                .orElseThrow(() -> new RuntimeException("Request not found"));
        req.setStatus("CANCELLED");
        req.setUpdatedAt(LocalDateTime.now());
        return requestRepository.save(req);
    }
}
