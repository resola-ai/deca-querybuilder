## Checklist for publishing

1. Update [CHANGELOG.md](CHANGELOG.md) with changes per [Keep a Changelog format](https://keepachangelog.com/).
2. Update documentation in [`website/docs`](website/docs) (and the latest version in [`website/versioned_docs`](website/versioned_docs) if not releasing a new major version).
3. Run `npx lerna version [major|minor|patch|prerelease]` (this automatically runs the `version` script in [`./package.json`](package.json) before committing and tagging).
4. Run `npx lerna publish from-git` (add ` --dist-tag next` if version was `prerelease` in previous step).
