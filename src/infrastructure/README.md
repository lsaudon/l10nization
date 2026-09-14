# Infrastructure layer

This folder contains the runtime adapters and shared infrastructure required by the shell.

## Contract

The infrastructure layer should:

- know about the editor runtime and workspace context when necessary
- expose shared utilities used by the shell
- avoid owning business rules or domain logic
- depend on the core layer, not the other way around

## Typical responsibilities

- configuration loading and reloading
- path resolution
- parser helpers and low-level utilities
- glue code between core rules and VS Code runtime access

This layer is adapter code: it supports execution, but it does not define the business decisions.
