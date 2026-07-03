---
name: scope
description: Use before starting any product-building, feature-implementation, or bug-fixing work — ask targeted clarifying questions to nail down scope before writing code
---

# Scope

## Overview

Jumping straight into code on an underspecified request produces work that solves the wrong problem, misses edge cases the user cared about, or has to be redone once real requirements surface. A few sharp questions up front are cheaper than a wrong implementation.

**Core principle:** Don't start writing product code, implementing a feature, or fixing a bug until the request is unambiguous enough that a wrong guess would surprise the user.

## When to use

Trigger this before:
- Building a new product, app, or substantial new area of functionality
- Implementing a specific feature in an existing codebase
- Fixing a bug (unless the cause and fix are already obvious from a stack trace or clear repro)

Skip it when the request is already fully specified (exact behavior, inputs/outputs, and acceptance criteria are unambiguous), or when it's a trivial, low-blast-radius change.

## What to ask, by category

Use the `AskUserQuestion` tool for these — don't just ask in prose and hope for a reply. Keep questions to the ones that actually change what you'd build; don't interrogate for its own sake.

### Product building (new product/app/major feature area)
- Who is the primary user, and what's the core job-to-be-done?
- What's the smallest version that's still useful (true MVP scope) vs. what's later-phase?
- What's explicitly out of scope for this pass?
- Any existing stack/tooling constraints, or greenfield?

### Feature implementation (adding to an existing codebase)
- What's the expected behavior for the main/happy path — walk through a concrete example?
- What are the edge cases or error states that matter (empty input, auth failure, concurrent access, etc.)?
- Does this touch existing data models, APIs, or UI patterns that should be reused rather than reinvented?
- How will we know it's done — any specific acceptance criteria, or a test the user has in mind?

### Bug fixing
- What's the exact repro (steps, inputs, environment) — can you reproduce it, or only the user can?
- What's the expected vs. actual behavior?
- Is this a regression (worked before, broke recently — check git history/blame) or has it never worked?
- Is a targeted fix wanted, or does the user suspect a deeper root cause worth investigating first (see systematic-debugging if available)?

## How to ask

- Batch related questions into one `AskUserQuestion` call (max 4 questions) rather than asking one at a time.
- Only ask what you can't reasonably infer from the code, git history, or prior conversation — check those first.
- If the user's answer reveals a decision that will matter to future work (a constraint, a deliberate scope cut), consider whether it's worth persisting to memory as a `project` or `feedback` memory.
- After answers are in, restate the scope in one or two sentences before starting work, so a wrong assumption surfaces immediately rather than after the implementation is done.
