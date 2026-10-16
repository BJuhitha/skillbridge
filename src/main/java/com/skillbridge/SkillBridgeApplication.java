package com.skillbridge;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class SkillBridgeApplication {

    public static void main(String[] args) {
        SpringApplication.run(SkillBridgeApplication.class, args);
        System.out.println("=================================================");
        System.out.println(" SkillBridge Platform Started Successfully!");
        System.out.println(" Open your browser at: http://localhost:8080");
        System.out.println(" H2 Console (if used): http://localhost:8080/h2-console");
        System.out.println("=================================================");
    }
}
