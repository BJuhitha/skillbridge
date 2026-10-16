package com.skillbridge.dto;

import com.skillbridge.model.LearningRequest;
import com.skillbridge.model.LearningSession;
import com.skillbridge.model.UserSkill;

import java.util.List;

public class DashboardSummaryDto {
    private long skillsTeachingCount;
    private long skillsLearningCount;
    private long pendingIncomingRequestsCount;
    private long pendingOutgoingRequestsCount;
    private long scheduledSessionsCount;
    private long completedSessionsCount;
    private double userRating;

    private List<UserSkill> teachingSkills;
    private List<UserSkill> learningSkills;
    private List<LearningRequest> recentRequests;
    private List<LearningSession> upcomingSessions;

    public DashboardSummaryDto() {}

    public long getSkillsTeachingCount() { return skillsTeachingCount; }
    public void setSkillsTeachingCount(long skillsTeachingCount) { this.skillsTeachingCount = skillsTeachingCount; }

    public long getSkillsLearningCount() { return skillsLearningCount; }
    public void setSkillsLearningCount(long skillsLearningCount) { this.skillsLearningCount = skillsLearningCount; }

    public long getPendingIncomingRequestsCount() { return pendingIncomingRequestsCount; }
    public void setPendingIncomingRequestsCount(long pendingIncomingRequestsCount) { this.pendingIncomingRequestsCount = pendingIncomingRequestsCount; }

    public long getPendingOutgoingRequestsCount() { return pendingOutgoingRequestsCount; }
    public void setPendingOutgoingRequestsCount(long pendingOutgoingRequestsCount) { this.pendingOutgoingRequestsCount = pendingOutgoingRequestsCount; }

    public long getScheduledSessionsCount() { return scheduledSessionsCount; }
    public void setScheduledSessionsCount(long scheduledSessionsCount) { this.scheduledSessionsCount = scheduledSessionsCount; }

    public long getCompletedSessionsCount() { return completedSessionsCount; }
    public void setCompletedSessionsCount(long completedSessionsCount) { this.completedSessionsCount = completedSessionsCount; }

    public double getUserRating() { return userRating; }
    public void setUserRating(double userRating) { this.userRating = userRating; }

    public List<UserSkill> getTeachingSkills() { return teachingSkills; }
    public void setTeachingSkills(List<UserSkill> teachingSkills) { this.teachingSkills = teachingSkills; }

    public List<UserSkill> getLearningSkills() { return learningSkills; }
    public void setLearningSkills(List<UserSkill> learningSkills) { this.learningSkills = learningSkills; }

    public List<LearningRequest> getRecentRequests() { return recentRequests; }
    public void setRecentRequests(List<LearningRequest> recentRequests) { this.recentRequests = recentRequests; }

    public List<LearningSession> getUpcomingSessions() { return upcomingSessions; }
    public void setUpcomingSessions(List<LearningSession> upcomingSessions) { this.upcomingSessions = upcomingSessions; }
}
