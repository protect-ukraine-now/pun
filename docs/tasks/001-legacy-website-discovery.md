# Task 001: Legacy Website Discovery and Documentation

## Status
Completed

## Background

This repository contains the existing Protect Ukraine Now (PUN) website.

The broader Protect Ukraine Now ecosystem consists of three independent components:

1. Website — this repository, considered a legacy application.
2. Backend — a separate API-only application.
3. Mobile application — developed and maintained separately.

IMPORTANT: The existing website is NOT connected to the backend application.
There is currently no integration between the website and the backend.

The website has not received significant development attention recently.
Its original implementation and maintenance were handled by another developer.

We need to understand the existing application before making any changes.

A complete website rewrite may eventually happen, but that is not a current priority.

Our immediate objective is to introduce three static pages required for
Apple App Store and Google Play compliance:

1. Support
2. End User Agreement
3. Privacy Policy

These pages will be publicly accessible and hosted on the existing website.

This task is strictly for discovery and documentation.
Implementation will be handled separately.

---

## Objective

Examine the existing repository and produce concise technical documentation
that explains how the application works and how it can be safely maintained.

The documentation should be useful to both human developers and AI coding
assistants working with this project in the future.

Focus on practical information rather than exhaustive documentation.

Do not modify application code.

---

## 1. Repository Discovery

Examine the repository and identify the following.

### Technology Stack

- Programming languages
- Frameworks and versions
- Major dependencies
- Package management
- Build tools
- Rendering architecture
- Development tooling

### Application Architecture

- Application entry points
- Directory structure
- Routing implementation
- Pages and components
- Shared layouts
- Navigation and footer
- Styling approach
- Static assets
- Internationalization and localization, if present

### Configuration and Deployment

- Environment variables and their purposes
- Development and production configuration
- Local development procedures
- Build commands
- Hosting and deployment configuration
- CI/CD pipelines, if present
- External services or dependencies

Do not expose secrets or sensitive configuration values.

### Testing

- Existing test frameworks
- Available test commands
- Linting and formatting tools
- Existing test structure
- Any obvious testing gaps

Do not install dependencies or modify existing tests.

---

## 2. Page Architecture Analysis

Pay particular attention to how existing pages are implemented.

Determine:

- How routes are defined
- How new pages are added
- How layouts are applied
- How navigation links are configured
- How static content is rendered
- How page titles and metadata are configured
- Whether existing informational or legal pages can serve as examples
- Whether multilingual functionality affects new pages

Identify the simplest existing pattern for introducing additional static pages.

Do not propose new architectural patterns when existing ones are sufficient.

---

## 3. Upcoming Support Pages

The next development task will introduce three pages.

### Support Page

The Support page will contain:

1. Information about how users can obtain support.
2. Instructions for requesting account deletion.
3. A link to the End User Agreement.
4. A link to the Privacy Policy.

The support contact information and account deletion instructions
will be provided separately.

Do not assume an automated account deletion mechanism currently exists.

### End User Agreement

A publicly accessible static page containing the application's
End User Agreement.

The legal content will be supplied separately.

### Privacy Policy

A publicly accessible static page containing the application's
Privacy Policy.

The legal content will be supplied separately.

### Requirements

All three pages must:

- Be publicly accessible without authentication.
- Have stable URLs suitable for App Store Connect and Google Play Console.
- Follow the existing website's design and conventions.
- Reuse existing components wherever practical.
- Avoid new dependencies.
- Avoid changes to unrelated functionality.

No backend integration is required for these static pages.

Do not implement these pages as part of this task.

---

## 4. Documentation Deliverables

Create the following files under the existing docs directory.

### docs/PROJECT_OVERVIEW.md

Document:

1. Application purpose and architecture
2. Technology stack
3. Directory structure
4. Important files and components
5. Routing and page rendering
6. Layouts, navigation, and styling
7. Configuration and environment variables
8. Local development instructions
9. Build and deployment procedures
10. Testing and verification procedures
11. Known technical limitations or maintenance concerns

Include actual file paths and commands wherever practical.

Clearly distinguish confirmed findings from assumptions.

Keep the documentation concise and useful as a future development reference.

### docs/SUPPORT_PAGES_PLAN.md

Prepare an implementation plan for adding the three static pages.

Include:

1. Recommended URL paths
2. New files required
3. Existing files requiring modification
4. Components and layouts to reuse
5. Navigation or footer changes, if appropriate
6. Localization considerations
7. Potential implementation risks
8. Recommended testing and verification steps

Identify the approach requiring the fewest modifications to the existing codebase.

Do not implement the plan.

---

## 5. Development Constraints

The following principles apply to this task and future maintenance work.

### Minimal Changes

The existing website is considered legacy software.

Preserve its architecture and behavior.

Make only changes explicitly required by an approved task.

### No Modernization

Do not upgrade frameworks, dependencies, or build tools merely
because newer versions are available.

### No Unrelated Refactoring

Do not restructure or improve existing code outside the approved scope.

### Reuse Existing Patterns

Follow existing project conventions.

Prefer existing components, libraries, and implementation approaches.

### Avoid Dependencies

Do not introduce additional dependencies unless absolutely necessary
for an explicitly approved requirement.

### Preserve Existing Functionality

Future changes must not unintentionally affect current routes,
pages, features, or deployment behavior.

### Documentation

Use the documentation created by this task as a reference for
subsequent development work.

Keep documentation synchronized with meaningful future changes.

### No Premature Implementation

Do not create support pages, legal pages, or modify application behavior
during this task.

---

## 6. Execution Instructions

1. Inspect the repository structure.
2. Review the relevant application and configuration files.
3. Identify and document the current architecture.
4. Examine how existing pages are implemented.
5. Identify the minimal approach for adding the three static pages.
6. Create docs/PROJECT_OVERVIEW.md.
7. Create docs/SUPPORT_PAGES_PLAN.md.
8. Review both documents for technical accuracy.
9. Report your findings.

Do not modify application code, tests, dependencies, or configuration.

Do not install or upgrade dependencies.

Do not create a Git commit.

If existing documentation is found, use it where appropriate and
avoid unnecessary duplication.

---

## 7. Completion Report

Upon completion, provide:

1. A brief summary of the application's technology stack.
2. A high-level overview of its architecture.
3. The recommended approach for introducing the three static pages.
4. Any significant technical risks or maintenance concerns.
5. Any unresolved questions requiring clarification.
6. A list of files created or modified.

Update this task's status to Completed when finished.

Stop after completing the documentation and presenting your findings.

Do not proceed with implementation until explicitly authorized.
