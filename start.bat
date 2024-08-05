@echo off
setlocal

:: Check if PowerShell is installed
where powershell >nul 2>&1
if %errorlevel% neq 0 (
    echo PowerShell is not installed. Please install PowerShell to proceed.
    exit /b 1
)

:: Define the path to the PowerShell script
set "psScript=generator.ps1"

:: Check if the PowerShell script exists
if not exist "%psScript%" (
    echo PowerShell script "%psScript%" not found.
    exit /b 1
)

:: Execute the PowerShell script
powershell -NoProfile -ExecutionPolicy Bypass -File "%psScript%"
endlocal
