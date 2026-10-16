package com.skillbridge.service;

import com.skillbridge.dto.LoginRequest;
import com.skillbridge.dto.RegisterRequest;
import com.skillbridge.model.User;
import com.skillbridge.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User register(RegisterRequest req) {
        if (userRepository.existsByEmail(req.getEmail())) {
            throw new RuntimeException("Email already registered: " + req.getEmail());
        }

        User user = new User();
        user.setName(req.getName());
        user.setEmail(req.getEmail());
        user.setPassword(req.getPassword()); // In a production system, hash with BCrypt
        user.setDepartment(req.getDepartment() != null ? req.getDepartment() : "Computer Science");
        user.setCollegeYear(req.getCollegeYear() != null ? req.getCollegeYear() : "3rd Year");
        user.setBio(req.getBio() != null ? req.getBio() : "Eager student ready to share skills and learn from peers.");
        user.setContactInfo(req.getContactInfo() != null ? req.getContactInfo() : req.getEmail());
        user.setAvatarUrl(req.getAvatarUrl() != null && !req.getAvatarUrl().isEmpty() 
                ? req.getAvatarUrl() 
                : "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80");
        user.setRating(5.0);
        user.setCreatedAt(LocalDateTime.now());

        return userRepository.save(user);
    }

    public User login(LoginRequest req) {
        Optional<User> optionalUser = userRepository.findByEmail(req.getEmail());
        if (optionalUser.isEmpty() || !optionalUser.get().getPassword().equals(req.getPassword())) {
            throw new RuntimeException("Invalid email or password");
        }
        return optionalUser.get();
    }

    public User getUserById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + id));
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User updateUser(Long id, User updated) {
        User existing = getUserById(id);
        if (updated.getName() != null) existing.setName(updated.getName());
        if (updated.getDepartment() != null) existing.setDepartment(updated.getDepartment());
        if (updated.getCollegeYear() != null) existing.setCollegeYear(updated.getCollegeYear());
        if (updated.getBio() != null) existing.setBio(updated.getBio());
        if (updated.getContactInfo() != null) existing.setContactInfo(updated.getContactInfo());
        if (updated.getAvatarUrl() != null) existing.setAvatarUrl(updated.getAvatarUrl());
        return userRepository.save(existing);
    }
}
