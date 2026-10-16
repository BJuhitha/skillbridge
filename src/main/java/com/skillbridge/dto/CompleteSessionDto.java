package com.skillbridge.dto;

public class CompleteSessionDto {
    private Integer feedbackRating;
    private String feedbackComments;

    public CompleteSessionDto() {}

    public Integer getFeedbackRating() { return feedbackRating; }
    public void setFeedbackRating(Integer feedbackRating) { this.feedbackRating = feedbackRating; }

    public String getFeedbackComments() { return feedbackComments; }
    public void setFeedbackComments(String feedbackComments) { this.feedbackComments = feedbackComments; }
}
