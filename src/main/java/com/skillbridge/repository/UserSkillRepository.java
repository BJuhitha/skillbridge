package com.skillbridge.repository;

import com.skillbridge.model.UserSkill;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserSkillRepository extends JpaRepository<UserSkill, Long> {

    List<UserSkill> findByUserId(Long userId);

    List<UserSkill> findByUserIdAndSkillType(Long userId, String skillType);

    List<UserSkill> findBySkillIdAndSkillType(Long skillId, String skillType);

    boolean existsByUserIdAndSkillIdAndSkillType(Long userId, Long skillId, String skillType);

    Optional<UserSkill> findByUserIdAndSkillIdAndSkillType(Long userId, Long skillId, String skillType);

    @Query("SELECT us FROM UserSkill us WHERE us.skillType = :skillType AND " +
           "(LOWER(us.skill.name) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           " LOWER(us.skill.category) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           " LOWER(us.user.name) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           " LOWER(us.user.department) LIKE LOWER(CONCAT('%', :keyword, '%')))")
    List<UserSkill> searchUserSkills(@Param("skillType") String skillType, @Param("keyword") String keyword);

    @Query("SELECT us FROM UserSkill us WHERE us.skillType = :skillType")
    List<UserSkill> findAllBySkillType(@Param("skillType") String skillType);
}
