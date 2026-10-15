# Task 002: Support and Legal Pages Implementation

## Status
Completed

## Background

This task continues the work completed in Task 001.

Review the following documentation before proceeding:

- docs/PROJECT_OVERVIEW.md
- docs/SUPPORT_PAGES_PLAN.md
- docs/tasks/001-legacy-website-discovery.md

The Protect Ukraine Now website is a legacy Astro application.

Our objective is to introduce three publicly accessible static pages
to support Apple App Store and Google Play compliance requirements
for the Protect Ukraine Now mobile application.

The implementation must be minimal and follow the existing architecture.

Security improvements, modernization, refactoring, and unrelated
maintenance are explicitly OUT OF SCOPE.

---

## 1. Objective

Create three static pages:

1. Support
2. End User Agreement
3. Privacy Policy

The Support page should contain initial functional content.

The End User Agreement and Privacy Policy pages should contain
only their titles and clearly identifiable placeholders.

The actual legal documents will be supplied in a subsequent task.

---

## 2. Pages and URLs

Use the existing Markdoc content system and routing conventions.

Create the following files under src/content/pages/:

### Support

File: support-en.mdoc
URL: /en/support

### End User Agreement

File: end-user-agreement-en.mdoc
URL: /en/end-user-agreement

Note: originally specified as `terms-en.mdoc` / `/en/terms`; renamed by the product owner
before deployment for consistency with the page name.

### Privacy Policy

File: privacy-en.mdoc
URL: /en/privacy

Use the existing routing mechanism.

Do not introduce new routes, components, or dependencies unless
absolutely necessary.

English-only content is sufficient for this task.

The existing English fallback mechanism should remain unchanged.

---

## 3. Support Page Content

Page title:

Protect Ukraine Now Mobile App Support

The page should clearly identify itself as the support page
for the Protect Ukraine Now mobile application.

Use the following content as the initial version.

### Introduction

Welcome to Protect Ukraine Now Mobile App Support.

If you need assistance with the Protect Ukraine Now mobile application,
have questions about your account, or experience technical difficulties,
please contact our support team.

### Contact Support

For assistance, please email:

support@protectukrainenow.org

Make the email address clickable using a mailto: link.

Include a brief statement encouraging users to describe their issue
when contacting support.

### Account Deletion

Users can delete their Protect Ukraine Now account directly
from the mobile application.

Provide simple instructions:

1. Open the Protect Ukraine Now mobile application.
2. Navigate to your Profile.
3. Select the option to delete your account.
4. Follow the on-screen instructions to confirm the deletion.

Include a statement that users experiencing difficulties with
account deletion can contact support@protectukrainenow.org.

Do not invent additional technical details about account deletion,
data retention, or backend functionality.

Use the above instructions as user-provided requirements.
The mobile application is maintained in a separate repository,
so its implementation cannot be verified from this website.

### Legal Information

Add a section containing links to:

- End User Agreement: /en/end-user-agreement
- Privacy Policy: /en/privacy

Use descriptive link text.

The Support page should serve as the central location for
these mobile application support and legal resources.

---

## 4. End User Agreement Page

Create the page using the existing Markdoc page conventions.

Page title:

End User Agreement

Include a clearly identifiable placeholder indicating that
the legal content will be provided separately.

Do not generate or invent legal language.

Do not use generic third-party legal templates.

The page should be ready to accept the complete agreement
without requiring structural changes.

---

## 5. Privacy Policy Page

Create the page using the existing Markdoc page conventions.

Page title:

Privacy Policy

Include a clearly identifiable placeholder indicating that
the legal content will be provided separately.

Do not generate or invent privacy policy language.

Do not make unsupported statements about data collection,
data processing, data retention, or user rights.

The page should be ready to accept the complete privacy policy
without requiring structural changes.

---

## 6. Design and Presentation

All three pages should:

- Use the existing website layout and styling.
- Follow existing Markdoc content conventions.
- Be responsive using the existing website capabilities.
- Be publicly accessible without authentication.
- Have consistent typography, headings, and spacing.
- Contain working internal links where applicable.

Do not introduce new styling frameworks or dependencies.

Do not redesign existing website elements.

Do not modify the header or footer navigation as part of this task.

The Support page will be accessible through its direct URL.
Links to the legal pages will be available from the Support page.

Do not change global page titles or SEO infrastructure
unless absolutely necessary for these pages to function.

---

## 7. Implementation Constraints

### Minimal Changes

Prefer creating only the three new Markdoc files.

Modify existing application files only if required for functionality.

If additional changes are necessary, explain why.

### No Backend Integration

The website is not currently connected to the PUN backend.

Do not introduce API calls, authentication, account management
functionality, or other backend integration.

Account deletion instructions are informational only.

### No Unrelated Changes

Do not modify:

- Existing website features
- Existing pages
- Application architecture
- Framework or dependency versions
- Build configuration
- Deployment configuration
- Security configuration
- Existing API integrations

### Build Considerations

Task 001 identified that the existing build process may fetch
external data and modify tracked files.

Be careful when executing build or verification commands.

Do not include unrelated generated modifications in this task.

Do not install or upgrade dependencies.

If dependencies are unavailable, perform static verification
and report that runtime validation could not be completed.

---

## 8. Verification

Verify the following:

1. /en/support resolves to the Support page.
2. /en/end-user-agreement resolves to the End User Agreement page.
3. /en/privacy resolves to the Privacy Policy page.
4. Support contact email is correct and uses a mailto: link.
5. Account deletion instructions appear on the Support page.
6. Links to both legal pages are correct.
7. All pages follow existing layout and styling conventions.
8. No unrelated application files were modified.
9. Existing English fallback behavior remains unchanged.

Where runtime testing is available, verify actual rendered content,
not only HTTP status codes.

Task 001 identified that missing pages may return HTTP 200
with blank content.

Do not assume a successful HTTP response proves a page works.

If runtime verification is unavailable, clearly identify
which checks were performed through code inspection only.

---

## 9. Documentation

Update docs/SUPPORT_PAGES_PLAN.md to reflect the actual implementation.

Keep the documentation concise.

Document:

- Pages created
- Final URLs
- Any deviations from the original plan
- Remaining work required to insert the legal documents

Do not make unnecessary documentation changes.

---

## 10. Completion Criteria

This task is complete when:

- All three Markdoc files are created.
- The Support page contains the requested information.
- Both legal pages have titles and content placeholders.
- The Support page links to both legal pages.
- Existing website conventions are preserved.
- No unrelated application changes are introduced.
- Verification is completed to the extent possible.

Update this task's status to Completed.

---

## 11. Completion Report

Provide a concise report containing:

1. Files created or modified.
2. Final page URLs.
3. Summary of implemented Support page content.
4. Verification performed and results.
5. Any issues or limitations encountered.
6. Remaining work for the legal documents.

Do not create a Git commit.

Do not deploy the changes.

Do not proceed with additional functionality without authorization.

IMPORTANT:

The End User Agreement and Privacy Policy pages contain placeholders.

They are NOT ready for publication or submission to Apple or Google
until the actual legal documents have been inserted and reviewed.

Stop after completing this task.
