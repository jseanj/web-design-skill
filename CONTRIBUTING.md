# Contributing

Please open an issue or pull request with a concrete problem and a small, reviewable change. English and Chinese contributions are welcome.

## Method or skill changes

Include a realistic brief, the observed failure, the relevant design decision and the improved result. Keep the main `SKILL.md` concise; put substantial guidance in the relevant reference. Preserve the user's actual content and project constraints.

## Example changes

Run the gallery locally, inspect the affected desktop and mobile page, and exercise its main controls. If changing page markup, edit `scripts/build-examples.py` and regenerate the pages with `npm run render`. Do not edit generated HTML alone. Case copy and gallery metadata live in `docs/cases.js`; update the corresponding case study when the design changes.

For browser checks, install the development dependencies and Chromium as described in the README. Run `npm run verify`, optionally rebuild the overview with `python3 scripts/overview.py` (Pillow required), then run `npm run manifest` and `python3 scripts/check_repo.py`. Include actual results and any checks you could not run. The CI workflow runs the browser checks again.

## Reproduction reports

Follow [the reproduction protocol](docs/REPRODUCIBILITY.md). Record the skill revision, actual input, model and tool configuration, output, screenshots and human revisions. Keep first-pass and revised results distinguishable. A screenshot or a file hash alone does not establish causal improvement.

## Assets and scope

Use assets you have permission to contribute and document their source or generation process. Label fictional product or business data. Do not include credentials, private conversation logs or personal file paths. Describe any new dependency and why it is needed.

Contributions are offered under the repository's [MIT license](LICENSE).
