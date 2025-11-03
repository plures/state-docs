# Architectural Decision Records (ADR)

This directory contains Architectural Decision Records (ADRs) for the state-docs project.

## What is an ADR?

An Architectural Decision Record (ADR) is a document that captures an important architectural decision made along with its context and consequences.

ADRs help us:
- **Document** key technical decisions and their rationale
- **Communicate** architectural choices to current and future team members
- **Preserve** institutional knowledge
- **Enable** better decision-making by learning from past choices
- **Facilitate** onboarding of new contributors

## When to Write an ADR

Create an ADR when making decisions about:

- Project structure and organization
- Technology stack choices
- Design patterns and architectural patterns
- API designs and contracts
- Build and deployment processes
- Testing strategies
- Dependencies and libraries
- Performance optimizations
- Security approaches

## How to Create an ADR

1. **Copy the template**: Use `template.md` as your starting point
2. **Number sequentially**: Name your file `NNNN-title-with-dashes.md` (e.g., `0001-adopt-adr-process.md`)
3. **Fill in all sections**: Provide context, decision, consequences, and alternatives
4. **Submit for review**: Create a pull request for team discussion
5. **Update status**: Mark as "Accepted" once merged

## ADR Lifecycle

ADRs follow this lifecycle:

- **Proposed**: Initial draft, under discussion
- **Accepted**: Decision has been made and documented
- **Deprecated**: Decision is no longer relevant but kept for historical context
- **Superseded**: Replaced by a newer ADR (link to the new ADR)

## File Naming Convention

ADRs should be named using the following pattern:

```
NNNN-short-descriptive-title.md
```

Where:
- `NNNN` is a sequential number (e.g., 0001, 0002, 0003)
- `short-descriptive-title` uses kebab-case
- Always use lowercase letters

Examples:
- `0001-adopt-adr-process.md`
- `0002-choose-deno-runtime.md`
- `0003-use-mermaid-for-diagrams.md`

## Structure

Each ADR should follow the template structure:

1. **Title and Number**: Clear, concise title with sequential number
2. **Date**: When the decision was made
3. **Status**: Current state of the decision
4. **Context**: Background and problem statement
5. **Decision**: The chosen solution
6. **Consequences**: Positive and negative outcomes
7. **Alternatives Considered**: Other options that were evaluated
8. **References**: Links to related documents, issues, or discussions

## Tips for Writing Good ADRs

- **Be concise**: Focus on the essential information
- **Be specific**: Avoid vague statements
- **Be honest**: Document both pros and cons
- **Be timely**: Write the ADR when making the decision, not months later
- **Be collaborative**: Invite team discussion before finalizing
- **Use plain language**: Avoid unnecessary jargon
- **Link context**: Reference issues, PRs, or discussions that led to the decision

## Resources

- [Michael Nygard's ADR template](https://cognitect.com/blog/2011/11/15/documenting-architecture-decisions)
- [ADR GitHub Organization](https://adr.github.io/)
- [MADR (Markdown ADR)](https://github.com/adr/madr)

## Index of ADRs

| Number | Title | Status | Date |
|--------|-------|--------|------|
| [0001](0001-adopt-adr-process.md) | Adopt ADR Process | Accepted | 2025-11-03 |

---

*Last updated: 2025-11-03*
