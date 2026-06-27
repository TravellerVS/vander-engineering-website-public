# AGENTS

## Codex Skills Bootstrap
- Before starting Codex work on this project, verify the shared custom skills are installed from the private GitHub repo `TravellerVS/codex-skills`.
- On a new machine, or when skills appear missing, run:
  ```bash
  git clone https://github.com/TravellerVS/codex-skills.git ~/codex-skills
  cd ~/codex-skills
  ./scripts/install.sh
  ```
- If `~/codex-skills` already exists, update it first with `git pull --ff-only`, then rerun `./scripts/install.sh`.
- Do not copy `~/.codex/auth.json`, `~/.codex/config.toml`, plugin caches, tokens, sessions, or temporary Codex runtime files into this repo.
- Reinstall Codex plugins/apps through Codex on each machine instead of copying plugin cache directories.
- If project-local skills are ever added for the public Vander Engineering website, store them under `.codex/skills/` here and mirror them into `~/codex-skills/project-skills/VanderEngineeringWebsitePublic/.codex/skills/`.

## Working Checklist
- Start by checking `git status --short --branch` and identifying existing user or automation changes before editing.
- Keep automation-owned changes isolated from user-authored changes; do not revert unrelated dirty work.

## Required Behavior
- Prefer `documentation/reviews/`, `documentation/plans/`, and `documentation/logs/` for new Codex-generated artifacts if this repo grows documentation folders.
- Do not commit generated secrets, OAuth files, local environment files, Codex auth/config files, or plugin caches.
