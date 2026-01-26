const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

function getLocalAppData() {
  if (process.env.LOCALAPPDATA) return process.env.LOCALAPPDATA;
  if (process.env.USERPROFILE) return path.join(process.env.USERPROFILE, 'AppData', 'Local');
  return null;
}

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function removePath(p) {
  if (!fs.existsSync(p)) return;
  // Use cmd.exe because Windows reparse points in OneDrive can make Node's rm/link handling flaky.
  execSync(`cmd /c rmdir /s /q "${p}"`, { stdio: 'ignore' });
}

function main() {
  if (process.platform !== 'win32') return;

  const projectRoot = path.resolve(__dirname, '..');
  const nextPath = path.join(projectRoot, '.next');

  const localAppData = getLocalAppData();
  if (!localAppData) return;

  const target = path.join(localAppData, 'TINT_Cultural_next');
  ensureDir(target);

  // Always recreate .next as a junction pointing outside OneDrive.
  removePath(nextPath);

  try {
    fs.symlinkSync(target, nextPath, 'junction');
  } catch (e) {
    // If symlink creation fails for any reason, fall back to a normal directory so Next can still run.
    try {
      ensureDir(nextPath);
    } catch (_) {
      // ignore
    }
    // Re-throw to make failures visible in CI/dev.
    throw e;
  }
}

main();
