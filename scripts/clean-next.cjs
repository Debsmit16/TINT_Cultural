const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

function removeNextDir(projectRoot) {
  const nextPath = path.join(projectRoot, '.next');
  if (!fs.existsSync(nextPath)) return;

  if (process.platform === 'win32') {
    // `rmdir` handles OneDrive placeholder/reparse-point files more reliably than Node fs APIs.
    execSync(`cmd /c rmdir /s /q "${nextPath}"`, { stdio: 'ignore' });
    return;
  }

  fs.rmSync(nextPath, { recursive: true, force: true });
}

function main() {
  const projectRoot = path.resolve(__dirname, '..');
  removeNextDir(projectRoot);
}

main();
