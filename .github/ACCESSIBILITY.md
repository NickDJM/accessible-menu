# Accessibility policy

## Our commitment

Accessible Menu helps people who may use the web differently than we do. We want people with disabilities, including people who use assistive technology, to be able to use our components, read our documentation, and contribute to our projects.

Accessibility is our highest priority. That includes the people reading our code. We aim to write plainly enough for someone entering the field to follow, with the detail experienced developers need to understand and maintain the work.

We work toward [Web Content Accessibility Guidelines 2.2 Level AA](https://www.w3.org/TR/WCAG22/) for our web content and examples. Components that implement an interaction pattern are designed to follow the relevant [ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/) pattern and [WAI-ARIA](https://www.w3.org/TR/wai-aria/) requirements.

These are our accessibility goals. They are not a claim of verified conformance across every project or example. We use automated checks and human review to assess our work. Contributors remain responsible for what they submit, including work created with AI assistance.

## Supported environments

Accessible Menu provides JavaScript behavior for menus built with your HTML. The markup, styling, content, and integration in your website also affect the accessibility of the result.

Accessible Menu targets the last two versions of Chrome, Firefox, Safari, Edge, Chromium, and WebKit, as described in our [browser support documentation](../docs/browser-support.md). This browser policy does not establish verified compatibility with every browser and assistive-technology combination. We do not currently publish a comprehensive assistive-technology test matrix.

If you encounter an issue in your browser or assistive technology, please report it. You do not need to establish that your environment is officially supported before asking for help.

## Known limitations

- Accessible Menu does not provide CSS or visual styling. Your website must provide visible focus indicators, sufficient contrast, and usable layouts.
- Using the library alone does not establish that a complete website conforms to WCAG.
- Browser support targets do not mean every assistive-technology combination has been verified.

Automated tests cannot establish that an interaction works for every person or assistive technology. A passing test suite is not a guarantee of accessibility.

Confirmed issues and available workarounds are tracked in [the project's issues](https://github.com/NickDJM/accessible-menu/issues). A limitation that has not been reported or documented may still exist.

## Report an accessibility issue

[Open an accessibility issue](https://github.com/NickDJM/accessible-menu/issues/new?template=accessibility_violation.md) to report an issue in Accessible Menu or its documentation. For another Accessible Ecosystem project, use that project's issue tracker.

Tell us what you were trying to do and what made it difficult or prevented you from continuing. The following details can help, if you have them:

- A link to the affected page, component, or example.
- What happened and what you expected instead.
- Steps to reproduce the problem.
- Your package version, browser, operating system, and assistive technology, including versions where available.
- Any workaround you found.

You do not need to provide a diagnosis, identify a standard, write code, or propose a fix. An incomplete technical report is still useful. Screenshots and recordings are optional.

GitHub issues are public. Share only information you are comfortable making public.

## How we respond

Project maintainers are responsible for reviewing accessibility reports and keeping this policy current. We treat reports as evidence of a person's experience and an opportunity to improve the project.

We prioritize issues that prevent people from completing tasks, while considering impact and available workarounds. We explain relevant dependencies and limitations, share workarounds when available, and update the issue as work progresses. We may ask whether a proposed fix resolves the issue you reported.

Resolution time depends on the problem and maintainer availability. When we can provide an expected timeline, we share it in the issue and update it if circumstances change.

## Attribution

This policy is based on the [Accessibility Toolkit accessibility policy](https://github.com/open-source-accessibility/accessibility-toolkit/blob/main/ACCESSIBILITY.md) by Open Source Accessibility, adapted for Accessible Ecosystem.

This document is based on [Accessible Ecosystem Core](https://github.com/Accessible-Ecosystem/core), adapted from its [corresponding document](https://github.com/Accessible-Ecosystem/core/blob/1.x/.github/ACCESSIBILITY.md).
