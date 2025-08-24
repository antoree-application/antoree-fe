#!/bin/bash

# Install mkcert if not already installed
if ! command -v mkcert &> /dev/null; then
    echo "Installing mkcert..."
    
    # Check if chocolatey is available (Windows)
    if command -v choco &> /dev/null; then
        choco install mkcert
    # Check if brew is available (macOS/Linux)
    elif command -v brew &> /dev/null; then
        brew install mkcert
    # For Ubuntu/Debian
    elif command -v apt &> /dev/null; then
        sudo apt install libnss3-tools
        curl -JLO "https://dl.filippo.io/mkcert/latest?for=linux/amd64"
        chmod +x mkcert-v*-linux-amd64
        sudo cp mkcert-v*-linux-amd64 /usr/local/bin/mkcert
    else
        echo "Please install mkcert manually from: https://github.com/FiloSottile/mkcert"
        exit 1
    fi
fi

# Create dev-cert directory
mkdir -p dev-cert

# Install the local CA
mkcert -install

# Generate certificates for localhost
mkcert -key-file dev-cert/key.pem -cert-file dev-cert/cert.pem localhost 127.0.0.1 ::1

echo "HTTPS certificates generated successfully!"
echo "You can now run: npm run dev:https"
