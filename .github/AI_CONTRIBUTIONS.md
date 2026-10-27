# AI contribution policy

AI assistance is welcome in Accessible Menu. The person submitting a contribution remains responsible for everything they submit, including code, tests, documentation, issues, and review comments.

This project supports people who depend on accessible interactions. Every contribution requires human judgment and care.

This policy applies alongside the [contribution guidelines](CONTRIBUTING.md).

## Disclose AI use in every pull request

Every pull request must state whether AI tools assisted with or generated any part of the contribution, including code, tests, and documentation. If you did not use AI, say so explicitly.

If you used AI, briefly describe how you used it and which parts of the contribution it assisted with or generated. Keep this disclosure current when adding changes to the pull request.

Disclosure does not replace the human review and verification required by this policy.

## Follow the project instructions

All AI-assisted contributions must follow the [project's AGENTS.md instructions](../AGENTS.md), including any instructions that apply to the files being changed.

Read the instructions yourself and provide them to the AI tools you use. You are responsible for checking that the finished contribution follows them.

## Review and verify before submitting

A human must review and verify every AI-assisted contribution before a pull request is submitted. The contributor may perform that review. The requirement also applies to later updates to the pull request.

Before submitting, you must:

- Read and understand the complete change, including generated tests and documentation.
- Check that it addresses the intended problem and follows the project's conventions.
- Run the relevant tests and checks, inspect their results, and manually verify affected behavior where needed.
- Check factual claims, API descriptions, references, and accessibility guidance against the relevant sources.
- Remove or correct anything you cannot explain or verify.

An AI tool's review or claim that the work is correct does not replace human review. Passing tests does not replace checking that the tests exercise the intended behavior.

Describe what you verified in the pull request, including the checks you ran and their results. State any remaining limitations. Do not present checks you did not run as passing.

If you cannot complete the necessary verification, ask for help before opening a pull request.

## Maintainer enforcement

Maintainers reserve the right to immediately close any pull request they suspect does not follow the contribution guidelines, including this policy.

Contributors who repeatedly disregard these requirements will have all future pull requests rejected immediately.

Using AI does not reduce the standard of care expected from a contribution or transfer responsibility to the tool or the maintainers.

## Attribution

This document is based on [Accessible Ecosystem Core](https://github.com/Accessible-Ecosystem/core), adapted from its [corresponding document](https://github.com/Accessible-Ecosystem/core/blob/1.x/.github/AI_CONTRIBUTIONS.md).
