package com.skillbridge.service;

import com.skillbridge.dto.MutualMatchDto;
import com.skillbridge.dto.UserSkillDto;
import com.skillbridge.model.Skill;
import com.skillbridge.model.User;
import com.skillbridge.model.UserSkill;
import com.skillbridge.repository.SkillRepository;
import com.skillbridge.repository.UserRepository;
import com.skillbridge.repository.UserSkillRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class SkillService {

    @Autowired
    private SkillRepository skillRepository;

    @Autowired
    private UserSkillRepository userSkillRepository;

    @Autowired
    private UserRepository userRepository;

    public List<Skill> getAllSkills() {
        return skillRepository.findAll();
    }

    public List<String> getAllCategories() {
        return skillRepository.findAllCategories();
    }

    public List<Skill> searchSkills(String query) {
        if (query == null || query.trim().isEmpty()) {
            return skillRepository.findAll();
        }
        return skillRepository.searchSkills(query.trim());
    }

    public Skill getOrCreateSkill(String name, String category, String description) {
        Optional<Skill> existing = skillRepository.findByNameIgnoreCase(name.trim());
        if (existing.isPresent()) {
            return existing.get();
        }
        Skill skill = new Skill(name.trim(), category != null ? category : "General", description);
        return skillRepository.save(skill);
    }

    public List<UserSkill> getUserSkills(Long userId, String skillType) {
        if (skillType != null && !skillType.isEmpty() && !skillType.equalsIgnoreCase("ALL")) {
            return userSkillRepository.findByUserIdAndSkillType(userId, skillType.toUpperCase());
        }
        return userSkillRepository.findByUserId(userId);
    }

    public UserSkill addUserSkill(UserSkillDto dto) {
        User user = userRepository.findById(dto.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found: " + dto.getUserId()));

        Skill skill;
        if (dto.getSkillId() != null) {
            skill = skillRepository.findById(dto.getSkillId())
                    .orElseThrow(() -> new RuntimeException("Skill not found: " + dto.getSkillId()));
        } else if (dto.getSkillName() != null && !dto.getSkillName().trim().isEmpty()) {
            skill = getOrCreateSkill(dto.getSkillName(), dto.getCategory(), dto.getDescription());
        } else {
            throw new RuntimeException("Skill name or ID must be provided");
        }

        String type = (dto.getSkillType() != null) ? dto.getSkillType().toUpperCase() : "TEACH";
        String proficiency = (dto.getProficiencyLevel() != null) ? dto.getProficiencyLevel().toUpperCase() : "INTERMEDIATE";

        Optional<UserSkill> existing = userSkillRepository.findByUserIdAndSkillIdAndSkillType(user.getId(), skill.getId(), type);
        if (existing.isPresent()) {
            UserSkill us = existing.get();
            us.setProficiencyLevel(proficiency);
            if (dto.getDescription() != null) us.setDescription(dto.getDescription());
            return userSkillRepository.save(us);
        }

        UserSkill userSkill = new UserSkill(user, skill, type, proficiency, dto.getDescription());
        return userSkillRepository.save(userSkill);
    }

    public void removeUserSkill(Long userSkillId) {
        userSkillRepository.deleteById(userSkillId);
    }

    public List<UserSkill> searchPeers(String keyword, String skillType) {
        String type = (skillType != null && !skillType.trim().isEmpty()) ? skillType.toUpperCase() : "TEACH";
        if (keyword == null || keyword.trim().isEmpty()) {
            return userSkillRepository.findAllBySkillType(type);
        }
        return userSkillRepository.searchUserSkills(type, keyword.trim());
    }

    /**
     * Mutual Skill Barter Match:
     * Finds peers where:
     * 1. Peer teaches what User wants to learn
     * 2. User teaches what Peer wants to learn
     */
    public List<MutualMatchDto> findMutualMatches(Long userId) {
        List<UserSkill> userLearning = userSkillRepository.findByUserIdAndSkillType(userId, "LEARN");
        List<UserSkill> userTeaching = userSkillRepository.findByUserIdAndSkillType(userId, "TEACH");

        List<MutualMatchDto> matches = new ArrayList<>();

        if (userLearning.isEmpty() || userTeaching.isEmpty()) {
            return matches;
        }

        List<User> allPeers = userRepository.findAll();

        for (User peer : allPeers) {
            if (peer.getId().equals(userId)) continue;

            List<UserSkill> peerTeaching = userSkillRepository.findByUserIdAndSkillType(peer.getId(), "TEACH");
            List<UserSkill> peerLearning = userSkillRepository.findByUserIdAndSkillType(peer.getId(), "LEARN");

            // Check if peer teaches something user wants to learn
            for (UserSkill ul : userLearning) {
                for (UserSkill pt : peerTeaching) {
                    if (ul.getSkill().getId().equals(pt.getSkill().getId()) || 
                        ul.getSkill().getName().equalsIgnoreCase(pt.getSkill().getName())) {

                        // Now check if user teaches something peer wants to learn
                        for (UserSkill ut : userTeaching) {
                            for (UserSkill pl : peerLearning) {
                                if (ut.getSkill().getId().equals(pl.getSkill().getId()) ||
                                    ut.getSkill().getName().equalsIgnoreCase(pl.getSkill().getName())) {

                                    matches.add(new MutualMatchDto(
                                            peer,
                                            pt.getSkill(),
                                            ut.getSkill(),
                                            "100% Barter Match! They can teach you " + pt.getSkill().getName() +
                                            " and you can teach them " + ut.getSkill().getName()
                                    ));
                                }
                            }
                        }
                    }
                }
            }
        }

        return matches;
    }
}
