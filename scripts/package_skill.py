#!/usr/bin/env python3
"""Package the portable skill without website assets; Python standard library only."""
import argparse
from pathlib import Path
import zipfile
from install_skill import ROOT, NAME, skill_files


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--output", type=Path, default=ROOT / "dist" / f"{NAME}.zip")
    args = parser.parse_args()
    output = args.output.expanduser().absolute()
    sources = list(skill_files())
    if output in sources:
        parser.error("Output must not overwrite a skill source file.")
    output.parent.mkdir(parents=True, exist_ok=True)
    with zipfile.ZipFile(output, "w", compression=zipfile.ZIP_DEFLATED) as archive:
        for source in sources:
            archive.write(source, (Path(NAME) / source.relative_to(ROOT)).as_posix())
    print(f"Created {output} ({output.stat().st_size:,} bytes; {len(sources)} files).")


if __name__ == "__main__":
    main()
