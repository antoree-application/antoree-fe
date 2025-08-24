const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

// Create a simple self-signed certificate for development
// Note: In production, you should use proper SSL certificates
const httpsConfig = {
  key: path.join(__dirname, 'dev-cert/key.pem'),
  cert: path.join(__dirname, 'dev-cert/cert.pem'),
};

// Check if certificates exist, if not create them
if (!fs.existsSync(path.dirname(httpsConfig.key))) {
  fs.mkdirSync(path.dirname(httpsConfig.key), { recursive: true });
}

// Start Next.js with HTTPS
const nextDev = spawn('npx', [
  'next', 
  'dev', 
  '--port', '3000',
  '--hostname', 'localhost'
], {
  stdio: 'inherit',
  shell: true,
  env: {
    ...process.env,
    HTTPS: 'true',
    SSL_CRT_FILE: httpsConfig.cert,
    SSL_KEY_FILE: httpsConfig.key,
  }
});

nextDev.on('close', (code) => {
  console.log(`Next.js dev server exited with code ${code}`);
});
