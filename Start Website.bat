@echo off
title Tami Futuristic Portfolio
cd /d "%~dp0"
set "PATH=%ProgramFiles%\nodejs;%PATH%"
if not exist node_modules (
  echo Installing packages, one moment...
  call npm.cmd install
)
echo Starting the website... your browser will open shortly.
echo Keep this window open while you view the site. Close it to stop.
call npm.cmd run dev -- --open
pause
