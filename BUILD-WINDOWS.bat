@echo off
setlocal
cd /d %~dp0
echo ========================================
echo BoreLog 2 - Windows Build
echo ========================================
where node >nul 2>nul
if errorlevel 1 (
  echo Node.js is not installed.
  echo Install Node.js 24 LTS from https://nodejs.org/
  pause
  exit /b 1
)
where npm >nul 2>nul
if errorlevel 1 (
  echo npm is not available.
  pause
  exit /b 1
)
echo Installing/verifying dependencies...
call npm install
if errorlevel 1 (
  echo Dependency installation failed.
  pause
  exit /b 1
)
echo Building installer and portable EXE...
call npm run dist:all
if errorlevel 1 (
  echo Build failed.
  pause
  exit /b 1
)
echo.
echo ========================================
echo Build complete. Check the dist folder.
echo ========================================
dir dist
pause
