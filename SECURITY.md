# Security Policy

## Supported Versions

We take security seriously and provide security updates for the following versions:

| Version | Supported          | Status |
| ------- | ------------------ | ------ |
| 1.x.x   | :white_check_mark: | Alpha - Active development |
| < 1.0   | :x:                | Pre-release, no support |

**Note**: As we're currently in alpha (v1.0.x), we may introduce breaking changes. Security fixes will be backported to the latest minor version within the current major version.

## Security Considerations

### What state-docs Does

state-docs is a **static documentation generator** that:
- ✅ Reads TypeScript/JavaScript files from your codebase
- ✅ Parses state machine definitions
- ✅ Generates Markdown documentation files
- ✅ Creates Mermaid diagram files

### What state-docs Doesn't Do

- ❌ Does not execute arbitrary code from your state machines
- ❌ Does not make network requests (fully offline)
- ❌ Does not modify your source code
- ❌ Does not store or transmit your data

### Security by Design

1. **No code execution**: We parse, we don't execute
2. **File system only**: Only reads source files and writes documentation
3. **No network**: Completely offline operation
4. **Transparent**: Open source - you can audit the code
5. **Minimal dependencies**: Small dependency tree to reduce attack surface

## Reporting a Vulnerability

We appreciate responsible disclosure of security vulnerabilities.

### How to Report

**🚨 DO NOT create a public issue for security vulnerabilities**

Instead:

1. **Email**: Send details to the maintainers (see [CODEOWNERS](./CODEOWNERS) or repository settings)
2. **GitHub Security Advisory**: Use GitHub's private vulnerability reporting feature
   - Go to the Security tab
   - Click "Report a vulnerability"
   - Fill in the details

### What to Include

Please include:

- **Description**: Clear description of the vulnerability
- **Impact**: What could an attacker do?
- **Steps to reproduce**: How to trigger the vulnerability
- **Affected versions**: Which versions are affected?
- **Mitigation**: If you know of any workarounds
- **Credit**: How you'd like to be credited (if desired)

### Response Timeline

- **Initial response**: Within 48 hours
- **Triage**: Within 1 week
- **Fix timeline**: Depends on severity
  - **Critical**: Within 1-7 days
  - **High**: Within 1-2 weeks
  - **Medium**: Within 1 month
  - **Low**: Next minor release

### After Disclosure

Once a fix is available:
1. We'll publish a security advisory
2. Release a patched version
3. Update CHANGELOG.md with security fix details
4. Credit the reporter (if desired)

## Security Best Practices for Users

### When Using state-docs

1. **Validate input**: Ensure you trust the source code being documented
2. **Review output**: Check generated documentation before publishing
3. **Keep updated**: Update to the latest version for security fixes
4. **Limit permissions**: Run with minimal file system permissions when possible
5. **CI/CD**: Use in isolated CI environments for additional safety

### Recommended Workflow

```bash
# Use npx to avoid global installation
npx statedoc gen --config=.stateDoc.json

# Or use Deno with explicit permissions
deno run --allow-read=. --allow-write=./docs cli.ts gen
```

### File System Permissions

state-docs needs:
- **Read access**: To your source directory (`source` in config)
- **Write access**: To your documentation directory (`target` in config)

When using Deno, you can be explicit:
```bash
deno run \
  --allow-read=./src \
  --allow-write=./docs \
  cli.ts gen --config=.stateDoc.json
```

## Known Security Considerations

### File Path Traversal

- **Issue**: Configuration could potentially specify paths outside intended directories
- **Mitigation**: We validate and normalize paths, but users should review `.stateDoc.json`
- **Best practice**: Use relative paths within your project

### Dependency Security

- We use Deno's secure-by-default runtime
- Dependencies are pinned in `deno.json`
- We regularly update dependencies
- Automated security scanning via GitHub Dependabot

### Template Injection

- **Issue**: Custom templates could potentially be used maliciously
- **Mitigation**: Templates only control output format, not code execution
- **Best practice**: Review custom templates before using

## Security Updates

Security updates will be released:
- As patch versions (1.0.x) for minor issues
- As minor versions (1.x.0) if significant changes are needed
- Announced via GitHub Security Advisories
- Documented in CHANGELOG.md

## Acknowledgments

We appreciate security researchers and users who help keep state-docs secure. Security reports are eligible for acknowledgment in:
- Security advisory credits
- CHANGELOG.md
- Project documentation

Thank you for helping keep state-docs and its users safe!

---

**Last Updated**: 2025-01-XX  
**Policy Version**: 1.0  
**Next Review**: Q2 2025
