#!/usr/bin/env python3
"""Check local document/asset links, skill identity and the saved SHA-256 inventory."""
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit, unquote
import hashlib
import json
import re
import sys

ROOT = Path(__file__).resolve().parent.parent
EXCLUDED = {'.git', 'node_modules', '__pycache__', '.DS_Store', 'dist', 'test-results', 'playwright-report'}
errors = []
checked = 0


def local_link(source, value):
    global checked
    value = value.strip().split(' "', 1)[0]
    parsed = urlsplit(value)
    if parsed.scheme or parsed.netloc or not parsed.path:
        return
    target = (ROOT / 'docs' / unquote(parsed.path).lstrip('/') if parsed.path.startswith('/') else source.parent / unquote(parsed.path)).resolve()
    checked += 1
    if not target.is_relative_to(ROOT) or not target.exists():
        errors.append(f'{source.relative_to(ROOT)}: missing or external local path {value}')


class Links(HTMLParser):
    def __init__(self, source):
        super().__init__()
        self.source = source

    def handle_starttag(self, tag, attrs):
        for name, value in attrs:
            if name in {'href', 'src'} and value:
                local_link(self.source, value)


files = [p for p in sorted(ROOT.rglob('*')) if p.is_file() and not any(x in EXCLUDED for x in p.relative_to(ROOT).parts)]
for source in files:
    if source.suffix == '.md':
        # Drop fenced code examples before checking real Markdown links.
        body = re.sub(r'```.*?```', '', source.read_text(), flags=re.S)
        for value in re.findall(r'!?\[[^\]]*\]\(([^)]+)\)', body):
            local_link(source, value)
    elif source.suffix == '.html':
        Links(source).feed(source.read_text())
    elif source.suffix == '.css':
        for value in re.findall(r'url\([\s\"\']*([^\)\"\']+)', source.read_text()):
            local_link(source, value.strip())

skill = (ROOT / 'SKILL.md').read_bytes()
if (ROOT / 'docs/skill.txt').read_bytes() != skill:
    errors.append('The gallery skill snapshot is stale; run scripts/manifest.py.')
if not re.search(r'^name: web-design-skill$', skill.decode(), re.M):
    errors.append('Skill name does not match the install/package folder.')
manifest = json.loads((ROOT / 'docs/manifest.json').read_text())
recorded = {item['path'] for item in manifest['files']}
actual = {p.relative_to(ROOT).as_posix() for p in files if p.relative_to(ROOT).as_posix() != 'docs/manifest.json'}
if recorded != actual:
    errors.append(f'Inventory file list is stale: missing={sorted(actual-recorded)}, obsolete={sorted(recorded-actual)}')
for item in manifest['files']:
    source = ROOT / item['path']
    if not source.is_file() or len(source.read_bytes()) != item['bytes'] or hashlib.sha256(source.read_bytes()).hexdigest() != item['sha256']:
        errors.append(f'Integrity mismatch: {item["path"]}')
if hashlib.sha256(skill).hexdigest() != manifest['skillSha256']:
    errors.append('Skill digest does not match the manifest.')
report = json.loads((ROOT / 'docs/verification.json').read_text())
if report.get('status') != 'passed' or len(report.get('cases', [])) != 10 or report.get('errors'):
    errors.append('Saved browser verification is incomplete or failed.')
if errors:
    print('\n'.join(errors), file=sys.stderr)
    raise SystemExit(1)
print(f'PASS: {checked} local links, {len(recorded)} file hashes, skill identity/snapshot and saved 10-page browser report.')
print('This checks repository integrity and recorded results; it does not rerun the browser or evaluate design quality.')
