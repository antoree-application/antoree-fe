@echo off
echo Setting up HTTPS for development...

REM Check if mkcert is installed
mkcert -version >nul 2>&1
if %errorlevel% neq 0 (
    echo Installing mkcert...
    choco install mkcert -y
    if %errorlevel% neq 0 (
        echo Please install Chocolatey first, then run: choco install mkcert
        echo Or download mkcert from: https://github.com/FiloSottile/mkcert
        pause
        exit /b 1
    )
)

REM Create dev-cert directory
if not exist "dev-cert" mkdir dev-cert

REM Install the local CA
mkcert -install

REM Generate certificates for localhost
mkcert -key-file dev-cert/key.pem -cert-file dev-cert/cert.pem localhost 127.0.0.1 ::1

echo.
echo HTTPS certificates generated successfully!
echo You can now run: npm run dev:https
pause
