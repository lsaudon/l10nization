# UI layer

This folder contains the editor-facing UI wrappers used by the shell.

## Contract

The UI layer should:

- be responsible only for user interaction
- delegate actual decisions to the shell or core layer
- remain thin and side-effect bounded
- not contain business rules or domain logic

## Typical responsibilities

- input boxes
- quick-picks
- user prompts
- presentation adapters for VS Code UI primitives

The UI layer should stay as dumb as possible and simply collect or display information.
