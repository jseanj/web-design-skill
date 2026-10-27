#!/usr/bin/env python3
"""Synchronize the readable skill snapshot and hash the releasable files.

This is an integrity inventory, not a signed provenance attestation.
"""
from pathlib import Path
from datetime import datetime, timezone
import hashlib
import json

root = Path(__file__).resolve().parent.parent
(root / 'docs/skill.txt').write_bytes((root / 'SKILL.md').read_bytes())
excluded = {'.git', 'node_modules', '__pycache__', '.DS_Store', 'dist', 'test-results', 'playwright-report'}
files = []
for file in sorted(root.rglob('*')):
    relative = file.relative_to(root)
    if not file.is_file() or any(part in excluded for part in relative.parts):
        continue
    if relative.as_posix() == 'docs/manifest.json':
        continue
    data = file.read_bytes()
    files.append({'path': relative.as_posix(), 'bytes': len(data), 'sha256': hashlib.sha256(data).hexdigest()})
payload = {
    'schemaVersion': 1,
    'generatedAt': datetime.now(timezone.utc).isoformat(),
    'purpose': 'unsigned artifact integrity inventory; not causal proof or independent reproduction',
    'skillSha256': hashlib.sha256((root / 'SKILL.md').read_bytes()).hexdigest(),
    'files': files
}
(root / 'docs/manifest.json').write_text(json.dumps(payload, ensure_ascii=False, indent=2) + '\n')
print(f'Wrote integrity inventory for {len(files)} files.')
