# Project instructions

Accessibility includes the people reading this project's code and documentation. Write so that someone learning the library can follow it, while giving experienced developers the details they need.

## Scope of these instructions

These instructions cover Core and the Accessible Ecosystem projects that use it. General guidance applies to components, utilities, tests, and documentation. Rules that name Accessible Menu or a menu class apply when working on that project or its integrations.

Core provides shared component classes and utilities. Keep those APIs useful to different kinds of components. Put behavior that belongs to a particular interaction pattern in the project that implements it.

## Follow the contribution guidelines

All agents working on this project must read and follow the [contribution guidelines](.github/CONTRIBUTING.md), [AI contribution policy](.github/AI_CONTRIBUTIONS.md), and [accessibility policy](.github/ACCESSIBILITY.md).

## Follow the ARIA APG

Accessibility is the project's highest priority. Components that implement an interaction pattern must follow the relevant ARIA Authoring Practices Guide (APG) pattern. Core's base classes and utilities support those components without defining a complete interaction pattern themselves.

- Use the relevant APG pattern and examples when implementing or reviewing component behavior, including keyboard interactions, focus management, roles, states, and properties.
- Check current official W3C sources for [APG](https://www.w3.org/WAI/ARIA/apg/), [WCAG](https://www.w3.org/WAI/standards-guidelines/wcag/), and [WAI-ARIA](https://www.w3.org/WAI/standards-guidelines/aria/) when implementing or reviewing accessibility behavior and documentation. Use the latest published Recommendations for conformance requirements, and keep up with APG updates. Review newer drafts for upcoming changes, but identify them as drafts rather than treating them as settled requirements.
- Always ensure authored HTML and the HTML produced by components are valid, including documentation examples, demo and test fixtures, and DOM built through JavaScript. Check element nesting, permitted content, attributes, and unique IDs. Treat invalid HTML as an immediate project accessibility defect to fix, even if a browser repairs it. Browser rendering or successful component initialization does not establish HTML validity.
- Any deviation from the APG needs a strong, specific reason. Identify the difference and explain why it is necessary. Do not introduce or accept a deviation for convenience, code simplification, or personal preference.
- If the implementation and APG differ, flag the discrepancy and investigate it. Do not assume the implementation is correct or rewrite the documentation to make the difference appear intentional.
- Preserve APG reference links, list structure, and the APG's specific wording in API keyboard tables. Do not paraphrase or simplify that wording. Explain library-specific differences in separate notes rather than rewriting the APG descriptions.
- Valid HTML alone does not establish an accessible interaction pattern. Check the relevant APG pattern before recommending markup, and distinguish ordinary navigation from ARIA menus, menubars, and treeviews. Do not turn an incidental example in an issue into project guidance without a supported purpose and structure.

## Use Unslop

Always read and apply [the Unslop skill](skills/unslop/SKILL.md) when working on this project. Apply it to documentation, code comments, and explanations to the user. Preserve the author's natural wording and tone when editing existing text.

## Approach to changes

- Read the relevant implementation, tests, and documentation before choosing a fix. Follow the project's established patterns instead of introducing a new structure by default.
- When working through an agreed list, finish the current item without folding in unrelated cleanup, refactoring, or documentation work. Carry the user's corrections forward to subsequent items.
- Choose the smallest change that solves the actual problem. A documentation issue can need only a documentation correction, and existing tests can already provide sufficient coverage.
- Keep issue-driven documentation focused on the agreed solution. Read the issue discussion to distinguish the actual request from examples or ideas mentioned along the way. Do not add adjacent patterns just because the same configuration could support them.
- Check compatibility beyond the final result. Preserve focus timing, event propagation, parent synchronization, and other existing side effects unless the requested change requires otherwise.

## Documentation and comments

- Write API documentation so a junior developer can understand what an API does and how to use it. Include enough detail that a senior developer does not need to read the source to understand its contract.
- Explain parameters, defaults, null handling, meaningful return values, side effects, and validation where relevant. Distinguish constructor options, protected fields, getters, and method arguments.
- Avoid documentation noise. Include details that help someone use or understand the API, not incidental JavaScript behavior. Do not add "returns undefined" for methods with no explicit return value, or repeat obvious details just to make an entry look complete.
- Preserve the author's explanations and reference notation when correcting inaccuracies. Class-qualified snippets such as Component.initialize() or BaseMenu.focus() can identify a class member in the API reference; do not convert them into instance-based tutorials unless requested.
- Match the existing API format. Show getters and setters in labelled code-group tabs, use the established access badges, and put types in separate Type sections. Keep inherited members in the normal property, getter/setter, and method categories with an inherited badge, rather than creating a separate inherited API section. Explain the badge before the reference begins.
- Use small, practical examples. Explain what the example changes and what a reader needs to configure, such as selectors or CSS.
- Write doc comments with the same care as API documentation. Explain the behavior in plain language rather than replacing the explanation with internal property names or technical shorthand.
- Use inline comments to explain the purpose of a step or a decision that is not obvious from the code. Follow the surrounding comment style.
- Use consistent API terminology in documentation, comments, and test names. For menus, use "expand" and "collapse" for actions, and "expanded" and "collapsed" for states. Preserve the APG's wording in its keyboard tables, even where it uses different terms. Refer to options by their actual names, such as expandClass and expandDuration. Preserve custom CSS class values used in examples and tests.
- Use parallel wording when comparing related behavior. For example, explain pointerenter and pointerleave delays together rather than mixing an event name with an expansion action. Distinguish whether a method can run from whether its focus updates, events, or transitions require initialization.
- Write regular guides for readers who may not be developers. A reader might be a student or someone working in communications or another web-adjacent field. Introduce unfamiliar terms and explain the markup, options, and expected result.
- Describe the current version as it works. Keep comparisons with earlier versions, migration instructions, and wording such as "now uses" or "no longer" in the upgrade guides.
- Check the previous version's source before describing migration changes. Distinguish a change in internal ownership from a change in observable behavior. Keep upgrade guidance focused on changes that affect users or custom subclasses, rather than listing every implementation or validation detail.
- Keep documentation focused. Explain shared behavior in the base class API rather than repeating it in every subclass page, guide, and constructor comment. Readers extending a class are expected to read its base class documentation first.
- Explain why an unusual setup step is needed, then give the shortest useful example. Avoid expanding a small change into a detailed guide unless that detail is needed to use it.
- Update the documentation and comments affected by a behavior change. Add subclass-specific explanations only where the subclass behaves differently. Respect requests to defer broader documentation work.
- Accessible Menu does not provide CSS or visual styling. Explain how classes, attributes, and CSS custom properties are applied, and leave styling decisions to the user's project.
- Use VitePress info, tip, and warning containers selectively to make useful requirements or caveats stand out. Preserve the existing explanation and examples; do not turn routine reference text into callouts or add warnings just for emphasis.

## Code organization and readability

- Follow the existing formatting, naming, spacing, blank lines, and JSDoc alignment. Preserve the file's organization when adding code.
- Keep fields with fields, getters and setters with the other getters and setters, and methods in the appropriate section. Combine imports from the same module instead of adding separate imports for individual members.
- Prefer clear steps, descriptive names, and straightforward conditions. Avoid dense loops, nested ternaries, and long chains that require readers to mentally unpack several operations at once.
- Share code when it makes the behavior easier to follow. Do not introduce an abstraction or combine several responsibilities just to reduce the line count.
- Put shared component behavior in the appropriate base class. Put generic lifecycle utilities, such as tracking animation frames, in Core. In Accessible Menu, put shared menu behavior in the appropriate base menu, item, or toggle class.
- In Accessible Menu, collect menu elements with explicit contexts and `strict: true`. Menu items belong directly to their menu, submenu controllers and submenus belong directly to their menu item, and separate triggers belong directly to their controller. Preserve this structure instead of collecting descendants and filtering out child-menu elements afterward.
- Use inherited Core helpers directly when no component-specific behavior is needed. When removing an override, check every caller for differences in defaults and required arguments, and update the affected API reference and upgrade guidance.
- Keep lifecycle cleanup with the component that owns the work. Core owns responsive listener replacement when its query settings change. A component that delegates settings to another component should read its live values and let it manage its own listeners. In Accessible Menu, menu accessors can pass settings through to the root controller without registering another listener. Read the controller's live values so direct controller changes remain visible through the menu API.
- In Accessible Menu, the root menu owns currentEvent and the shouldFocus decision. Submenus, items, and toggles use the root's values, and writes to currentEvent update the root.
- Choose performance improvements when they address a real need. Keep ordinary code simple and readable rather than optimizing speculatively.
- Use fields or getters for stable class configuration. Use method arguments for data that belongs to an individual call. Read calculated configuration when it is needed rather than storing values before constructor setup is complete.
- Preserve each component's default behavior unless the user explicitly requests a change. Make optional features opt-in and document their defaults.
- Validate inputs before changing component state, stored data, selection, or focus. Invalid input should leave the previous state intact. Preserve established behavior for valid inputs, including index clamping.
- For deferred work, capture the intended target and check that the action still applies when the callback runs. Cancel outdated requests and use Core's tracked animation-frame methods so disposal also cancels pending work.
- When sharing an implementation, keep each caller's existing timing and behavior. Use parameters for actual per-call choices, such as a child index, instead of a boolean that only supports the first or last item.

## Core components and utilities

- Read the relevant base classes and callers in dependent projects before changing a shared API. Keep pattern-specific keyboard handling and component relationships out of generic helpers.
- Preserve the order of bootstrapping, validation, initialization, and disposal. Check which operations work before initialization and which side effects require an initialized component.
- Keep listeners, timers, animation frames, and stored component references with the component that owns them. Use Core's tracking and cleanup helpers so disposal cancels its pending work and removes its registrations.
- Preserve event names, targets, event details, and dispatch order. Check event filtering when lifecycle events can reach parent components.
- Keep requested state and committed state distinct. For TransactionalValue and components that use it, preserve when values change, commit, or reset, and how those changes affect DOM updates and events.
- Preserve StorageManager's scope, type, and key boundaries. Check which data an operation reads, replaces, or clears, including during disposal.
- For DOM, event, and validation helpers, preserve defaults, context boundaries, null handling, return values, and side effects. Check callers before changing a helper's contract.

## Tests

- Follow the existing directories and files for the component or utility under test. In Accessible Menu, keep tests with the relevant base menu, concrete menu type, item, or toggle. Add keyboard tests to the existing keyboard.unit.test.js file rather than creating a separate file for each keyboard feature.
- Use the existing sections within each suite. Tests for a property or method belong under its existing section. In Accessible Menu, tests for currentEvent belong under currentEvent and tests for shouldFocus belong under shouldFocus. Use direct names such as "should inherit the root menu's value" and "should update the root menu's value" for those menu tests. Merge duplicate sections for the same method or property. Put lifecycle and deferred-work tests with the methods they exercise instead of creating separate feature-wide sections or files.
- Explicitly test one component, utility, or menu type per file. Keep multiple types together only when the test requires their interaction or comparison, such as combined package exports. Supporting fixtures and base-class imports for inheritance checks are appropriate.
- Write concrete tests for the type in that file. Avoid a single suite that loops through unrelated classes or hides type-specific expectations behind conditional branches.
- Use parameter tables when each row follows the same setup, actions, and assertions. Split cases with different actions or timing into direct tests instead of choosing behavior through conditions. Write expected values explicitly rather than calculating them with the same logic the implementation uses.
- Test shared behavior in the base class that owns it, such as Component, ResponsiveComponent, or CollapsibleComponent in Core, or BaseMenu, BaseMenuItem, or BaseMenuToggle in Accessible Menu. Concrete subclasses should check that they inherit the relevant implementation rather than repeat its behavior tests. Before removing duplicate tests, confirm that the base tests cover every relevant assertion and that the subclass has the necessary inheritance checks. Keep concrete tests for constructor option forwarding, ARIA, and other subclass-specific interactions.
- In Accessible Menu, use the existing demo menu fixtures. Add custom markup only when those fixtures cannot represent the case being tested, such as an empty menu or a specific alternate structure. Core's generic component and helper tests can use small, valid HTML examples or direct DOM construction without depending on menu fixtures.
- Name fixtures for the markup and behavior they actually contain. Check nesting depth, control types, and where links and toggles are separate. In Accessible Menu's `demo/menus.js`, keep only interactive demo fixtures in the default export and use named exports for test-only fixtures.
- Keep each fixture tied to a distinct current need. Usage alone does not justify keeping an experimental fixture or its dedicated tests after the approach has been dropped. Remove them when agreed, while preserving relevant behavior coverage with existing fixtures.
- Create fresh components for each test. Do not share initialized components between tests that change their state. When generating cases from demo markup, read the case data without initializing a shared menu.
- In Accessible Menu, let the initial menu create its submenus through the configured selectors. Use those created components in assertions instead of manually constructing additional submenu instances for ordinary menu behavior.
- Keep setup and component selection written plainly in each test. Do not introduce helper functions, fixture factories, or indirect component lookups just to shorten repeated setup. Keep constructor options and any required root DOM configuration or delayed bootstrapping visible. Shared browser mocks, such as matchMedia, are useful when they do not hide component setup or cleanup.
- Follow the existing cleanup approach. Do not add disposal registries, such as menusToDispose, or a broader cleanup refactor while adding unrelated behavior tests. Handle cleanup work separately. When each test creates one component, use one scoped variable for cleanup rather than an array and disposal loop. In Core tests, dispose owned components before restoring mocks, globals, and timers.
- Separate setup, actions, and assertions with blank lines. Group component selections before the assertions that use them. For tests with several actions, separate each action from its resulting assertions. Put a blank line between sibling tests and describe blocks.
- Match test names and comments to the actual class, method, and assertion. Distinguish reported validation failures from thrown errors. When a validator returns a result object, describe acceptance or errors rather than claiming it returns a boolean. Distinguish current state from committed state and stored data from the object that owns it. Use parameter placeholders only where the test runner substitutes them.
- Test observable behavior and meaningful API contracts. Do not add assertions about the absence of removed internal properties just to record that they were removed.
- Check that inheritance assertions reference real members. Comparing two misspelled or missing methods can pass because both values are undefined. Successful initialization tests should check isInitialized rather than only checking that nothing throws, since validation failures may be reported without throwing.
- Prefer spies on real helpers when their side effects matter, such as event prevention and propagation. Restore spies between tests. Mock methods through restorable spies instead of assigning mock functions directly to prototypes or module exports.
- Event-filtering tests must deliver the event to the listener expected to ignore it. For bubbling tests, use valid nesting and confirm that the child event reaches the parent. Sibling components do not exercise a parent's event guard. If a test may pass without exercising the intended behavior, check that removing or changing that behavior makes the test fail.
- Make each deferred test control or await its own animation frames and timers. Do not rely on a synchronous mock left behind by another test.
- Timer scheduling tests should distinguish a timeout that runs once from an interval that repeats. Advance through multiple delays; cancellation and replacement checks alone do not prove the scheduling behavior.
- Test library behavior, not JavaScript's class semantics. Documentation explaining constructor and field initialization order does not need suites proving that language behavior.
- Keep cases tied to the change and plausible failures in the implementation. Do not add speculative scenarios, such as unrelated components affecting each other, without a concrete shared-state concern.
- Cover unchanged defaults as well as explicit options. Include null handling, validation, lifecycle, state changes, storage boundaries, and cleanup when the change affects them. For interactive components, also cover affected focus, keyboard behavior, ARIA, and child-component relationships, including nested menus in Accessible Menu.
- Keep regression tests proportional to the change. Prefer a few direct assertions that demonstrate the bug and preserve the relevant defaults over large matrices, nested loops, and repeated coverage. More tests are not automatically better coverage.
- When selection rules change, check that existing tests still exercise their stated behavior. A first-match test needs multiple eligible matches. If strict collection excludes the other candidates, update the fixture so the test still proves which match is selected.
- Run the relevant tests and checks. When changing mocks or cleanup, also check shuffled test order and run affected cases independently where shared state is a concern. Tests must not depend on earlier tests creating a registry or initializing a component. Build the documentation when changing its content or links. Report what was checked and any remaining limitations accurately.
- Whenever tests are changed, have another agent independently compare the changes with the previous tests and check for lost coverage. Passing tests or an unchanged test count alone do not prove coverage was preserved. When moving tests, preserve their fixtures, hooks, mock scope, and parameterized cases as well as their assertions. Resolve any findings before completing the work, and have the reviewer check any resulting test changes.
- Keep wording and formatting cleanup limited to those changes. Verify that executable test code is unchanged, including statement order and when spies start recording. Use blank lines to make the existing phases clear without moving actions or adding new abstractions.
- Passing checks support only what they exercised. Do not claim that defaults, inheritance, or compatibility are covered without inspecting the relevant assertions and behavior. A documentation example initializing successfully or passing keyboard checks does not prove its accessibility semantics are appropriate; check those against the relevant standards too.
- When a dependency is released, update its declared version and lockfile as applicable, then verify against the published package. Distinguish tests using a local checkout or source snapshot from tests using the published dependency.

## Attribution

This document is based on [Accessible Ecosystem Core](https://github.com/Accessible-Ecosystem/core), adapted from its [corresponding document](https://github.com/Accessible-Ecosystem/core/blob/1.x/AGENTS.md).
