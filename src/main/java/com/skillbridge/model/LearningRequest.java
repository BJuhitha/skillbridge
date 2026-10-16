package com.skillbridge.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "learning_requests")
public class LearningRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "sender_id", nullable = false)
    private User sender;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "receiver_id", nullable = false)
    private User receiver;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "skill_id", nullable = false)
    private Skill skill;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "offered_skill_id")
    private Skill offeredSkill;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String message;

    @Column(nullable = false, length = 20)
    private String status = "PENDING"; // PENDING, ACCEPTED, REJECTED, CANCELLED

    @Column(name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(name = "updated_at")
    private LocalDateTime updatedAt = LocalDateTime.now();

    public LearningRequest() {}

    public LearningRequest(User sender, User receiver, Skill skill, Skill offeredSkill, String message) {
        this.sender = sender;
        this.receiver = receiver;
        this.skill = skill;
        this.offeredSkill = offeredSkill;
        this.message = message;
        this.status = "PENDING";
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public User getSender() { return sender; }
    public void setSender(User sender) { this.sender = sender; }

    public User getReceiver() { return receiver; }
    public void setReceiver(User receiver) { this.receiver = receiver; }

    public Skill getSkill() { return skill; }
    public void setSkill(Skill skill) { this.skill = skill; }

    public Skill getOfferedSkill() { return offeredSkill; }
    public void setOfferedSkill(Skill offeredSkill) { this.offeredSkill = offeredSkill; }

    public String getSkillToLearn() {
        return skill != null ? skill.getName() : "";
    }

    public void setSkillToLearn(String s) {
        if (this.skill == null) this.skill = new Skill();
        this.skill.setName(s);
    }

    public String getSkillOffered() {
        return offeredSkill != null ? offeredSkill.getName() : "";
    }

    public void setSkillOffered(String s) {
        if (this.offeredSkill == null) this.offeredSkill = new Skill();
        this.offeredSkill.setName(s);
    }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}
