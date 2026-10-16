#!/bin/bash
echo "===================================================================="
echo "  SKILLBRIDGE - STUDENT SKILL EXCHANGE PLATFORM"
echo "  Backend: Java Spring Boot 3"
echo "  Frontend: HTML5, CSS3, JavaScript (REST API)"
echo "===================================================================="

if ! command -v mvn &> /dev/null; then
    echo "[WARNING] Maven 'mvn' command was not found in PATH."
    echo "Please run via IntelliJ IDEA / VS Code: Run SkillBridgeApplication.java"
    exit 1
fi

echo "[INFO] Starting Spring Boot Application on port 8080..."
mvn spring-boot:run
