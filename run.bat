@echo off
title SkillBridge - Student Skill Exchange Platform
echo ====================================================================
echo   SKILLBRIDGE - STUDENT SKILL EXCHANGE PLATFORM
echo   Backend: Java Spring Boot 3
echo   Frontend: HTML5, CSS3, JavaScript (REST API)
echo ====================================================================
echo.

where mvn >nul 2>&1
if %ERRORLEVEL% neq 0 (
    echo [WARNING] Maven 'mvn' was not found in your system PATH.
    echo If you are using VS Code or IntelliJ IDEA:
    echo   1. Open the 'skillbridge' folder in your IDE.
    echo   2. Right-click 'SkillBridgeApplication.java' and select 'Run'.
    echo.
    echo If you have Maven installed, ensure its bin directory is in your PATH.
    echo.
    pause
    exit /b 1
)

echo [INFO] Starting Spring Boot Application...
echo [INFO] By default, it runs with in-memory H2 database (Zero setup needed!)
echo [INFO] To run with MySQL, use: mvn spring-boot:run -Dspring-boot.run.profiles=mysql
echo.
mvn spring-boot:run

pause
