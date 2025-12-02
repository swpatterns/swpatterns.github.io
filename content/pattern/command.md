---
title: "Command"
date: 2024-02-29T16:23:00-00:00
draft: false
pattern_types: ["behavioral", "GOF"]
wikipedia: "https://en.wikipedia.org/wiki/Command_pattern"
diagramtype: "class"
diagram: "[Command] --|> [Receiver] : executes\n[Invoker] --o [Command] : requests\n[Client] --x [Command] : configures\n[ConcreteCommand] --|> [Command]\n[ConcreteCommand] --o [Receiver] : uses"
code: true
---

The Command pattern encapsulates a request as an object, thereby letting you parameterize clients with different requests, queue or log requests, and support undoable operations. Essentially, it decouples the object that originates the request from the object that knows how to perform it.

This pattern promotes loose coupling and makes the system more flexible. It’s particularly useful when you need to manage a history of actions for undo/redo functionality, delay or queue the execution of a request, or when you want to combine basic operations into more complex ones.

## Usage

The Command pattern is widely used in scenarios requiring transaction management, logging, and undo/redo capabilities.  It’s core to many editor implementations, allowing for actions like copy, paste, and delete to be tracked and reversed.  Modern frameworks often leverage the command pattern, either explicitly or implicitly, for event handling and asynchronous task processing.  It's also common in game development for handling player actions.

## Examples

1. **GUI Frameworks (e.g., Qt, Swing):**  Most GUI frameworks utilize the Command pattern for handling user interactions. When a user clicks a button, the framework creates a command object representing that action (e.g., `FileOpenCommand`, `ButtonClickHandler`). This command is then executed by a receiver (e.g., a file system or a widget).  This allows for easy undo/redo functionality and event logging.

2. **Database Transactions:** Database systems internally use a command pattern to manage transactions. Each SQL statement is treated as a command. These commands are bundled into a transaction, and the database engine can then commit or rollback the entire set of commands, ensuring data consistency. An example might be `UpdateAccountCommand`, `DeleteRecordCommand`, associated with a `TransactionManager`.

3. **Undo/Redo Systems in Text Editors:** Text editors like Notepad++ or VS Code use the command pattern so that actions like typing, deleting, or formatting text are all commands. These commands can be stored in a stack for undo/redo functionality. Each command holds enough information (e.g., the deleted text, the old formatting) to reverse its effect.