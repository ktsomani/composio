import { describe, expect, test } from 'bun:test';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const repoRoot = join(import.meta.dir, '..', '..', '..');
const windowsInstaller =
  'irm https://raw.githubusercontent.com/ComposioHQ/composio/next/install.ps1 | iex';

describe('CLI install commands agents copy', () => {
  test('the public skill and README include the experimental Windows installer', () => {
    for (const file of [
      'skills/composio/references/for-you.md',
      'skills/composio/references/platform.md',
      'README.md',
    ]) {
      const text = readFileSync(join(repoRoot, file), 'utf8');
      expect(text, file).toContain(windowsInstaller);
      expect(text, file).toContain('curl -fsSL https://composio.dev/install | sh');
      expect(text, file).not.toContain('curl -fsSL https://composio.dev/install | bash');
    }
  });
});
