package com.skillbridge.controller;

import com.skillbridge.dto.MutualMatchDto;
import com.skillbridge.dto.UserSkillDto;
import com.skillbridge.model.Skill;
import com.skillbridge.model.UserSkill;
import com.skillbridge.service.SkillService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class SkillController {

    @Autowired
    private SkillService skillService;

    @GetMapping("/skills")
    public ResponseEntity<List<Skill>> getAllSkills() {
        return ResponseEntity.ok(skillService.getAllSkills());
    }

    @GetMapping("/skills/categories")
    public ResponseEntity<List<String>> getCategories() {
        return ResponseEntity.ok(skillService.getAllCategories());
    }

    @GetMapping("/skills/search")
    public ResponseEntity<List<Skill>> searchSkills(@RequestParam(value = "query", required = false) String query) {
        return ResponseEntity.ok(skillService.searchSkills(query));
    }

    @PostMapping("/skills")
    public ResponseEntity<Skill> createSkill(@RequestBody Skill skill) {
        return ResponseEntity.ok(skillService.getOrCreateSkill(skill.getName(), skill.getCategory(), skill.getDescription()));
    }

    @GetMapping("/user-skills/user/{userId}")
    public ResponseEntity<List<UserSkill>> getUserSkills(
            @PathVariable Long userId,
            @RequestParam(value = "type", required = false) String skillType) {
        return ResponseEntity.ok(skillService.getUserSkills(userId, skillType));
    }

    @PostMapping("/user-skills")
    public ResponseEntity<?> addUserSkill(@RequestBody UserSkillDto dto) {
        try {
            UserSkill saved = skillService.addUserSkill(dto);
            return ResponseEntity.ok(saved);
        } catch (Exception e) {
            Map<String, String> err = new HashMap<>();
            err.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(err);
        }
    }

    @DeleteMapping("/user-skills/{id}")
    public ResponseEntity<?> deleteUserSkill(@PathVariable Long id) {
        skillService.removeUserSkill(id);
        Map<String, Object> resp = new HashMap<>();
        resp.put("success", true);
        resp.put("message", "Skill removed from profile");
        return ResponseEntity.ok(resp);
    }

    @GetMapping("/peers/search")
    public ResponseEntity<List<UserSkill>> searchPeers(
            @RequestParam(value = "keyword", required = false) String keyword,
            @RequestParam(value = "type", defaultValue = "TEACH") String type) {
        return ResponseEntity.ok(skillService.searchPeers(keyword, type));
    }

    @GetMapping("/matches/mutual/{userId}")
    public ResponseEntity<List<MutualMatchDto>> getMutualMatches(@PathVariable Long userId) {
        return ResponseEntity.ok(skillService.findMutualMatches(userId));
    }
}
