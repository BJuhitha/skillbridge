package com.skillbridge.dto;

import com.skillbridge.model.Skill;
import com.skillbridge.model.User;

public class MutualMatchDto {
    private User peer;
    private Skill theyTeachYouWant;
    private Skill youTeachTheyWant;
    private String matchReason;

    public MutualMatchDto() {}

    public MutualMatchDto(User peer, Skill theyTeachYouWant, Skill youTeachTheyWant, String matchReason) {
        this.peer = peer;
        this.theyTeachYouWant = theyTeachYouWant;
        this.youTeachTheyWant = youTeachTheyWant;
        this.matchReason = matchReason;
    }

    public User getPeer() { return peer; }
    public void setPeer(User peer) { this.peer = peer; }

    public Skill getTheyTeachYouWant() { return theyTeachYouWant; }
    public void setTheyTeachYouWant(Skill theyTeachYouWant) { this.theyTeachYouWant = theyTeachYouWant; }

    public Skill getYouTeachTheyWant() { return youTeachTheyWant; }
    public void setYouTeachTheyWant(Skill youTeachTheyWant) { this.youTeachTheyWant = youTeachTheyWant; }

    public String getMatchReason() { return matchReason; }
    public void setMatchReason(String matchReason) { this.matchReason = matchReason; }
}
