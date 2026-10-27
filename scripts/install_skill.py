#!/usr/bin/env python3
"""Install only the portable skill files, without gallery assets or dependencies."""
import argparse
from pathlib import Path
import shutil
import tempfile

ROOT = Path(__file__).resolve().parent.parent
NAME = "web-design-skill"
FILES = ("SKILL.md", "references", "agents", "LICENSE")
TARGETS = {"codex": ".codex/skills", "claude": ".claude/skills", "gemini": ".gemini/skills"}


def skill_files():
    for name in FILES:
        item = ROOT / name
        if item.is_dir():
            yield from sorted(p for p in item.rglob("*") if p.is_file() and p.name != ".DS_Store")
        else:
            yield item


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    choice = parser.add_mutually_exclusive_group()
    choice.add_argument("--target", choices=TARGETS, help="Personal agent directory (default: codex)")
    choice.add_argument("--destination", type=Path, help="Complete custom skill folder")
    args = parser.parse_args()
    destination = (args.destination.expanduser().absolute() if args.destination else Path.home() / TARGETS[args.target or "codex"] / NAME)
    sources = list(skill_files())
    if destination.exists() or destination.is_symlink():
        if not destination.is_symlink() and destination.is_dir():
            installed = {p.relative_to(destination) for p in destination.rglob("*") if p.is_file()}
            wanted = {p.relative_to(ROOT) for p in sources}
            if installed == wanted and all((destination / p.relative_to(ROOT)).read_bytes() == p.read_bytes() for p in sources):
                print(f"Already installed: {destination}")
                return
        parser.error(f"Destination already exists; nothing changed: {destination}. Choose another destination or move the old installation first.")
    destination.parent.mkdir(parents=True, exist_ok=True)
    staging = Path(tempfile.mkdtemp(prefix=f".{NAME}-", dir=destination.parent))
    try:
        for source in sources:
            target = staging / source.relative_to(ROOT)
            target.parent.mkdir(parents=True, exist_ok=True)
            shutil.copy2(source, target)
        staging.rename(destination)
    finally:
        if staging.exists():
            shutil.rmtree(staging)
    print(f"Installed {len(sources)} skill files: {destination}")
    print("Start a new agent session to discover web-design-skill.")


if __name__ == "__main__":
    main()
