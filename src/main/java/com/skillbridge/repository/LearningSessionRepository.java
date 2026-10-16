package com.skillbridge.repository;

import com.skillbridge.model.LearningSession;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LearningSessionRepository extends JpaRepository<LearningSession, Long> {

    @Query("SELECT s FROM LearningSession s WHERE s.teacher.id = :userId OR s.learner.id = :userId ORDER BY s.scheduledTime DESC")
    List<LearningSession> findAllForUser(@Param("userId") Long userId);

    @Query("SELECT s FROM LearningSession s WHERE (s.teacher.id = :userId OR s.learner.id = :userId) AND s.status = :status ORDER BY s.scheduledTime ASC")
    List<LearningSession> findForUserByStatus(@Param("userId") Long userId, @Param("status") String status);

    @Query("SELECT COUNT(s) FROM LearningSession s WHERE (s.teacher.id = :userId OR s.learner.id = :userId) AND s.status = 'COMPLETED'")
    long countCompletedSessions(@Param("userId") Long userId);

    @Query("SELECT COUNT(s) FROM LearningSession s WHERE (s.teacher.id = :userId OR s.learner.id = :userId) AND s.status = 'SCHEDULED'")
    long countScheduledSessions(@Param("userId") Long userId);
}
