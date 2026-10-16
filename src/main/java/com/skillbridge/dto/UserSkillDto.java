package com.skillbridge.dto;

public class UserSkillDto {
    private Long userId;
    private Long skillId;
    private String skillName;
    private String category;
    private String skillType; // "TEACH" or "LEARN"
    private String proficiencyLevel; // "BEGINNER", "INTERMEDIATE", "ADVANCED", "EXPERT"
    private String description;

    public UserSkillDto() {}

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public Long getSkillId() { return skillId; }
    public void setSkillId(Long skillId) { this.skillId = skillId; }

    public String getSkillName() { return skillName; }
    public void setSkillName(String skillName) { this.skillName = skillName; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public String getSkillType() { return skillType; }
    public void setSkillType(String skillType) { this.skillType = skillType; }

    public String getProficiencyLevel() { return proficiencyLevel; }
    public void setProficiencyLevel(String proficiencyLevel) { this.proficiencyLevel = proficiencyLevel; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
}
