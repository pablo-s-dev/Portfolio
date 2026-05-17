## Git Commit Guidelines

You must always use the Conventional Commits specification for every commit message you generate. Do not use generic or vague messages.

### Format
<type>(<optional scope>): <description>

[optional body]

[optional footer(s)]

### Allowed Types
* **feat**: A new feature
* **fix**: A bug fix
* **docs**: Documentation-only changes
* **style**: Changes that do not affect the meaning of the code (formatting, missing semi-colons, etc.)
* **refactor**: A code change that neither fixes a bug nor adds a feature
* **perf**: A code change that improves performance
* **test**: Adding missing tests or correcting existing tests
* **build**: Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)
* **ci**: Changes to CI configuration files and scripts (example scopes: Travis, Circle, GitHub Actions)
* **chore**: Other changes that don't modify src or test files
* **revert**: Reverts a previous commit

### Rules
* The type and scope must always be lowercase.
* The description must be written in the imperative, present tense (e.g., "add" instead of "added" or "adds").
* Do not capitalize the first letter of the description.
* Do not end the description line with a period.
* For breaking changes, append a `!` immediately after the type/scope, or include `BREAKING CHANGE:` at the start of the footer space.

### Examples
feat(auth): add JWT validation middleware
fix(api): resolve memory leak in user fetch endpoint
docs(readme): update installation steps
chore: update lodash to version 4.17.21
feat(ui)!: rewrite button component to use CSS grid