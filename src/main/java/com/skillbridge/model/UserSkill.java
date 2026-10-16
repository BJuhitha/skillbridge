package com.skillbridge.model;

import jakarta.persistence.*;

@Entity
@Table(name = "user_skills")
public class UserSkill {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "skill_id", nullable = false)
    private Skill skill;

    @Column(name = "skill_type", nullable = false, length = 20)
    private String skillType; // "TEACH" or "LEARN"

    @Column(name = "proficiency_level", nullable = false, length = 30)
    private String proficiencyLevel; // "BEGINNER", "INTERMEDIATE", "ADVANCED", "EXPERT"

    @Column(columnDefinition = "TEXT")
    private String description;

    public UserSkill() {}

    public UserSkill(User user, Skill skill, String skillType, String proficiencyLevel, String description) {
        this.user = user;
        this.skill = skill;
        this.skillType = skillType;
        this.proficiencyLevel = proficiencyLevel;
        this.description = description;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

    public Skill getSkill() { return skill; }
    public void setSkill(Skill skill) { this.skill = skill; }

    public String getSkillName() {
        return skill != null ? skill.getName() : "";
    }

    public void setSkillName(String name) {
        if (this.skill == null) this.skill = new Skill();
        this.skill.setName(name);
    }

    public String getSkillType() { return skillType; }
    public void setSkillType(String skillType) { this.skillType = skillType; }

    public String getProficiencyLevel() { return proficiencyLevel; }
    public void setProficiencyLevel(String proficiencyLevel) { this.proficiencyLevel = proficiencyLevel; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
}
