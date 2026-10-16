package com.skillbridge.repository;

import com.skillbridge.model.LearningRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LearningRequestRepository extends JpaRepository<LearningRequest, Long> {

    List<LearningRequest> findByReceiverIdOrderByCreatedAtDesc(Long receiverId);

    List<LearningRequest> findBySenderIdOrderByCreatedAtDesc(Long senderId);

    List<LearningRequest> findBySenderIdOrReceiverIdOrderByCreatedAtDesc(Long senderId, Long receiverId);

    long countByReceiverIdAndStatus(Long receiverId, String status);

    long countBySenderIdAndStatus(Long senderId, String status);
}
