@echo off
echo Starting Quantum Job Dashboard...
echo.

echo Starting Django backend server...
start cmd /k "cd /d %~dp0 && python manage.py runserver"

echo Waiting for backend to start...
timeout /t 5 /nobreak > nul

echo Starting React frontend server...
start cmd /k "cd /d %~dp0\frontend && npm start"

echo.
echo Both servers are starting...
echo Backend: http://localhost:8000
echo Frontend: http://localhost:3000
echo.
pause
