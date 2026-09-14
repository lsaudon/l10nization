# Functional Core

This folder contains the pure, deterministic logic of the project.

The code here should:

- not import from `vscode`
- not access the workspace or editor state
- take input values and return outputs
- be easy to unit test without the IDE runtime

Examples include:

- ARB selection and filtering logic
- YAML config parsing
- placeholder validation and formatting rules
- function-call generation
- sorting and serialization decisions

This is the part that represents the business rules of the localization system.
