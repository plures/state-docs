# 0001. Adopt Architectural Decision Records

Date: 2025-11-03

## Status

Accepted

## Context

The state-docs project is growing in complexity and will benefit from better governance and documentation of architectural decisions. As the project evolves, we need a systematic way to:

1. **Capture important technical decisions** and their rationale
2. **Preserve institutional knowledge** that might otherwise be lost in chat logs or tribal knowledge
3. **Facilitate collaboration** by making decision-making processes transparent
4. **Help onboarding** by providing context for why things are built the way they are
5. **Enable better future decisions** by learning from past choices

Without a structured approach to documenting decisions, we risk:
- Repeating past mistakes
- Spending time re-litigating already-decided issues
- Losing context when team members change
- Making inconsistent choices across different parts of the project

## Decision

We will adopt Architectural Decision Records (ADRs) as our standard practice for documenting significant architectural and technical decisions.

ADRs will:
- Be stored in the `docs/adr/` directory
- Follow a consistent template (see `template.md`)
- Be numbered sequentially (e.g., `0001-adopt-adr-process.md`)
- Be written in Markdown for easy versioning and review
- Be submitted via pull requests for team discussion
- Cover decisions about architecture, design patterns, technology choices, and processes

## Consequences

### Positive

- **Better documentation**: Architectural decisions are explicitly documented with context
- **Knowledge preservation**: Important context is captured in version control
- **Transparency**: Decision-making process is visible to all team members
- **Easier onboarding**: New contributors can understand why things are built the way they are
- **Historical record**: We can look back and understand the evolution of the project
- **Reduced bike-shedding**: Decisions are documented, reducing redundant discussions
- **Improved collaboration**: Pull request reviews create opportunities for team input

### Negative

- **Additional overhead**: Writing ADRs takes time
- **Discipline required**: Team needs to remember to write ADRs for significant decisions
- **Maintenance burden**: ADR index needs to be kept up-to-date
- **Learning curve**: Team needs to learn the ADR process and template

### Risks

- **Under-adoption**: Team might forget to write ADRs for important decisions
  - *Mitigation*: Make ADR writing part of PR templates and code review process
- **Over-documentation**: Team might write ADRs for trivial decisions
  - *Mitigation*: Provide clear guidance on when to write an ADR
- **Outdated ADRs**: ADRs might become stale if not updated
  - *Mitigation*: Treat ADRs as living documents; mark deprecated/superseded as needed

## Alternatives Considered

- **No formal documentation**: Continue with informal decision documentation
  - *Why not chosen*: Leads to knowledge loss and inconsistent decisions
  
- **Wiki or separate documentation site**: Use external documentation platform
  - *Why not chosen*: Separates decisions from code, harder to version and review
  
- **Inline code comments**: Document decisions in code comments
  - *Why not chosen*: Scattered across codebase, hard to discover and maintain
  
- **Design documents in Google Docs/Confluence**: Use document management tools
  - *Why not chosen*: Not version controlled, harder to integrate with development workflow

## References

- [Architectural Decision Records](https://adr.github.io/)
- [Michael Nygard's blog post](https://cognitect.com/blog/2011/11/15/documenting-architecture-decisions)
- [GitHub issue #5: Add ADP to help govern project](https://github.com/plures/state-docs/issues/5)
