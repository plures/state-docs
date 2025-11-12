# GitHub Labels Configuration

This file documents the labels used in this repository for issue and PR management.

## Label Categories

### Type Labels (what kind of item this is)

- **`bug`** (🔴 #d73a4a) - Something isn't working
- **`feature`** / **`enhancement`** (🟢 #a2eeef) - New feature or request
- **`documentation`** (📘 #0075ca) - Improvements or additions to documentation
- **`question`** (💬 #d876e3) - Further information is requested
- **`maintenance`** (🔧 #fbca04) - Maintenance tasks and refactoring

### Priority Labels (how urgent)

- **`priority: high`** (🔥 #b60205) - High priority, needs immediate attention
- **`priority: medium`** (📊 #fbca04) - Medium priority
- **`priority: low`** (📉 #0e8a16) - Low priority, nice to have

### Difficulty Labels (how hard)

- **`good first issue`** (🎓 #7057ff) - Good for newcomers
- **`help wanted`** (🙋 #008672) - Extra attention is needed
- **`difficulty: easy`** (🟢 #c2e0c6) - Easy to implement
- **`difficulty: medium`** (🟡 #fef2c0) - Moderate complexity
- **`difficulty: hard`** (🔴 #f9d0c4) - Complex implementation required

### Status Labels (what's happening)

- **`blocked`** (🚫 #b60205) - Blocked by other work or decisions
- **`wontfix`** (⛔ #ffffff) - This will not be worked on
- **`duplicate`** (👯 #cfd3d7) - This issue or pull request already exists
- **`invalid`** (❌ #e4e669) - This doesn't seem right
- **`needs-triage`** (🏷️ #d93f0b) - Needs to be reviewed and categorized

### Area Labels (what part of the project)

- **`area: cli`** (💻 #bfdadc) - Command-line interface
- **`area: parser`** (🔍 #c5def5) - State machine parsing
- **`area: generator`** (📝 #d4c5f9) - Documentation generation
- **`area: templates`** (🎨 #f9c5d1) - Template rendering
- **`area: ci/cd`** (⚙️ #bfd4f2) - CI/CD and automation
- **`area: examples`** (📚 #e99695) - Example state machines

### Special Labels

- **`breaking change`** (💥 #e99695) - Introduces a breaking change
- **`security`** (🔒 #ee0701) - Security-related issue
- **`dependencies`** (📦 #0366d6) - Pull requests that update dependencies
- **`roadmap`** (🗺️ #1d76db) - Related to the project roadmap

## Using Labels

### For Contributors

When creating an issue:
1. The maintainers will add the appropriate labels
2. If you're unsure, just leave it untagged

When looking for issues to work on:
- Look for **`good first issue`** if you're new
- Check **`help wanted`** for issues seeking contributors
- Filter by **`area:`** labels to find issues in your area of interest

### For Maintainers

When triaging issues:
1. Add a **type** label (bug, feature, documentation, etc.)
2. Add an **area** label if applicable
3. Add **`good first issue`** or **`help wanted`** if appropriate
4. Add priority if urgent
5. Remove **`needs-triage`** once categorized

## Creating Labels

To create these labels in a new repository or update existing ones, use the GitHub CLI:

```bash
# Install GitHub CLI if needed
# https://cli.github.com/

# Type labels
gh label create "bug" --color "d73a4a" --description "Something isn't working"
gh label create "enhancement" --color "a2eeef" --description "New feature or request"
gh label create "documentation" --color "0075ca" --description "Improvements or additions to documentation"
gh label create "question" --color "d876e3" --description "Further information is requested"
gh label create "maintenance" --color "fbca04" --description "Maintenance tasks and refactoring"

# Priority labels
gh label create "priority: high" --color "b60205" --description "High priority, needs immediate attention"
gh label create "priority: medium" --color "fbca04" --description "Medium priority"
gh label create "priority: low" --color "0e8a16" --description "Low priority, nice to have"

# Difficulty labels
gh label create "good first issue" --color "7057ff" --description "Good for newcomers"
gh label create "help wanted" --color "008672" --description "Extra attention is needed"
gh label create "difficulty: easy" --color "c2e0c6" --description "Easy to implement"
gh label create "difficulty: medium" --color "fef2c0" --description "Moderate complexity"
gh label create "difficulty: hard" --color "f9d0c4" --description "Complex implementation required"

# Status labels
gh label create "blocked" --color "b60205" --description "Blocked by other work or decisions"
gh label create "needs-triage" --color "d93f0b" --description "Needs to be reviewed and categorized"

# Area labels
gh label create "area: cli" --color "bfdadc" --description "Command-line interface"
gh label create "area: parser" --color "c5def5" --description "State machine parsing"
gh label create "area: generator" --color "d4c5f9" --description "Documentation generation"
gh label create "area: templates" --color "f9c5d1" --description "Template rendering"
gh label create "area: ci/cd" --color "bfd4f2" --description "CI/CD and automation"
gh label create "area: examples" --color "e99695" --description "Example state machines"

# Special labels
gh label create "breaking change" --color "e99695" --description "Introduces a breaking change"
gh label create "security" --color "ee0701" --description "Security-related issue"
gh label create "roadmap" --color "1d76db" --description "Related to the project roadmap"
```

Note: The `dependencies` label is automatically created by Dependabot.
