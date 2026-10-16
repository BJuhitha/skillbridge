package com.skillbridge.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "learning_sessions")
public class LearningSession {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "request_id")
    private LearningRequest request;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "teacher_id", nullable = false)
    private User teacher;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "learner_id", nullable = false)
    private User learner;

    @Column(name = "skill_name", nullable = false, length = 100)
    private String skillName;

    @Column(name = "scheduled_time", nullable = false)
    private LocalDateTime scheduledTime;

    @Column(name = "duration_minutes")
    private Integer durationMinutes = 60;

    @Column(name = "meeting_type", nullable = false, length = 20)
    private String meetingType = "ONLINE"; // ONLINE or IN_PERSON

    @Column(name = "meeting_link_or_location", nullable = false)
    private String meetingLinkOrLocation;

    @Column(columnDefinition = "TEXT")
    private String notes;

    @Column(nullable = false, length = 20)
    private String status = "SCHEDULED"; // SCHEDULED, COMPLETED, CANCELLED

    @Column(name = "feedback_rating")
    private Integer feedbackRating;

    @Column(name = "feedback_comments", columnDefinition = "TEXT")
    private String feedbackComments;

    public LearningSession() {}

    public LearningSession(LearningRequest request, User teacher, User learner, String skillName,
                           LocalDateTime scheduledTime, Integer durationMinutes, String meetingType,
                           String meetingLinkOrLocation, String notes) {
        this.request = request;
        this.teacher = teacher;
        this.learner = learner;
        this.skillName = skillName;
        this.scheduledTime = scheduledTime;
        this.durationMinutes = durationMinutes != null ? durationMinutes : 60;
        this.meetingType = meetingType != null ? meetingType : "ONLINE";
        this.meetingLinkOrLocation = meetingLinkOrLocation;
        this.notes = notes;
        this.status = "SCHEDULED";
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public LearningRequest getRequest() { return request; }
    public void setRequest(LearningRequest request) { this.request = request; }

    public User getTeacher() { return teacher; }
    public void setTeacher(User teacher) { this.teacher = teacher; }

    public User getLearner() { return learner; }
    public void setLearner(User learner) { this.learner = learner; }

    public User getStudent() { return learner; }
    public void setStudent(User student) { this.learner = student; }

    public String getSkillName() { return skillName; }
    public void setSkillName(String skillName) { this.skillName = skillName; }

    public String getTopic() { return skillName; }
    public void setTopic(String topic) { this.skillName = topic; }

    public LocalDateTime getScheduledTime() { return scheduledTime; }
    public void setScheduledTime(LocalDateTime scheduledTime) { this.scheduledTime = scheduledTime; }

    public Integer getDurationMinutes() { return durationMinutes; }
    public void setDurationMinutes(Integer durationMinutes) { this.durationMinutes = durationMinutes; }

    public String getMeetingType() { return meetingType; }
    public void setMeetingType(String meetingType) { this.meetingType = meetingType; }

    public String getMeetingLinkOrLocation() { return meetingLinkOrLocation; }
    public void setMeetingLinkOrLocation(String meetingLinkOrLocation) { this.meetingLinkOrLocation = meetingLinkOrLocation; }

    public String getMeetingLink() { return meetingLinkOrLocation; }
    public void setMeetingLink(String meetingLink) { this.meetingLinkOrLocation = meetingLink; }

    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public Integer getFeedbackRating() { return feedbackRating; }
    public void setFeedbackRating(Integer feedbackRating) { this.feedbackRating = feedbackRating; }

    public String getFeedbackComments() { return feedbackComments; }
    public void setFeedbackComments(String feedbackComments) { this.feedbackComments = feedbackComments; }
}
