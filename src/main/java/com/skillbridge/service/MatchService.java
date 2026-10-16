package com.skillbridge.service;

import com.skillbridge.dto.MatchDto;
import com.skillbridge.model.User;
import com.skillbridge.model.UserSkill;
import com.skillbridge.repository.UserRepository;
import com.skillbridge.repository.UserSkillRepository;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class MatchService {

    private final UserRepository userRepository;
    private final UserSkillRepository skillRepository;

    public MatchService(UserRepository userRepository, UserSkillRepository skillRepository) {
        this.userRepository = userRepository;
        this.skillRepository = skillRepository;
    }

    public List<MatchDto> findMatchesForUser(Long userId) {
        // Current user's skills
        List<UserSkill> mySkills = skillRepository.findByUserId(userId);

        Set<String> myLearnSkills = mySkills.stream()
                .filter(s -> "LEARN".equalsIgnoreCase(s.getSkillType()))
                .map(s -> s.getSkillName().trim().toLowerCase())
                .collect(Collectors.toSet());

        Set<String> myTeachSkills = mySkills.stream()
                .filter(s -> "TEACH".equalsIgnoreCase(s.getSkillType()))
                .map(s -> s.getSkillName().trim().toLowerCase())
                .collect(Collectors.toSet());

        List<User> allUsers = userRepository.findAll();
        List<MatchDto> matches = new ArrayList<>();

        for (User peer : allUsers) {
            if (peer.getId().equals(userId)) continue;

            List<UserSkill> peerSkills = skillRepository.findByUserId(peer.getId());

            // Peer teaches what I want to learn
            List<String> peerCanTeachYou = peerSkills.stream()
                    .filter(s -> "TEACH".equalsIgnoreCase(s.getSkillType()))
                    .filter(s -> matchesAny(s.getSkillName(), myLearnSkills))
                    .map(UserSkill::getSkillName)
                    .distinct()
                    .collect(Collectors.toList());

            // I teach what peer wants to learn
            List<String> youCanTeachPeer = peerSkills.stream()
                    .filter(s -> "LEARN".equalsIgnoreCase(s.getSkillType()))
                    .filter(s -> matchesAny(s.getSkillName(), myTeachSkills))
                    .map(UserSkill::getSkillName)
                    .distinct()
                    .collect(Collectors.toList());

            // Check if there is any connection
            if (!peerCanTeachYou.isEmpty() || !youCanTeachPeer.isEmpty()) {
                boolean isMutual = !peerCanTeachYou.isEmpty() && !youCanTeachPeer.isEmpty();
                int score = (isMutual ? 100 : 0) + (peerCanTeachYou.size() * 20) + (youCanTeachPeer.size() * 10);

                matches.add(new MatchDto(peer, peerCanTeachYou, youCanTeachPeer, isMutual, score));
            }
        }

        // Sort: Mutual matches first, then by score descending
        matches.sort((a, b) -> Integer.compare(b.getMatchScore(), a.getMatchScore()));
        return matches;
    }

    private boolean matchesAny(String skill, Set<String> targetSet) {
        if (skill == null) return false;
        String normalized = skill.trim().toLowerCase();
        for (String target : targetSet) {
            if (normalized.contains(target) || target.contains(normalized)) {
                return true;
            }
        }
        return false;
    }
}
