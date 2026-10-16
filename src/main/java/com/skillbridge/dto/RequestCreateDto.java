package com.skillbridge.dto;

public class RequestCreateDto {
    private Long senderId;
    private Long receiverId;
    private Long skillId;
    private Long offeredSkillId;
    private String message;

    public RequestCreateDto() {}

    public Long getSenderId() { return senderId; }
    public void setSenderId(Long senderId) { this.senderId = senderId; }

    public Long getReceiverId() { return receiverId; }
    public void setReceiverId(Long receiverId) { this.receiverId = receiverId; }

    public Long getSkillId() { return skillId; }
    public void setSkillId(Long skillId) { this.skillId = skillId; }

    public Long getOfferedSkillId() { return offeredSkillId; }
    public void setOfferedSkillId(Long offeredSkillId) { this.offeredSkillId = offeredSkillId; }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }
}
