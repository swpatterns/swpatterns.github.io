---
title: "Command - Kotlin"
date: 2025-12-03T13:03:08.777-05:00
draft: false
pattern_usage: ["Command"]
language: ["Kotlin"]
---
The Command pattern encapsulates a request as an object, allowing parameterization of clients with different requests, queuing or logging of requests, and support for undoable operations. This implementation features a `Command` interface defining an `execute()` method.  Concrete commands like `OpenCommand` and `CloseCommand` implement this, holding a reference to the `Document` receiver. An `App` or `RemoteControl` class contains a command history and can execute commands.

Kotlin's concise syntax and support for functional interfaces (like `Command`) makes implementing this pattern very natural. The use of data classes for commands allows for immutable command objects. The `App` class acting as an invoker leverages Kotlin's ability to pass functions as first-class citizens, further enhancing the pattern's flexibility.

```kotlin
// Command Interface
interface Command {
    fun execute()
}

// Receiver
class Document {
    var isOpen = false
    fun open() {
        isOpen = true
        println("Document opened")
    }
    fun close() {
        isOpen = false
        println("Document closed")
    }
}

// Concrete Commands
data class OpenCommand(private val document: Document) : Command {
    override fun execute() {
        document.open()
    }
}

data class CloseCommand(private val document: Document) : Command {
    override fun execute() {
        document.close()
    }
}

// Invoker (App/RemoteControl)
class App(private val document: Document) {
    private val commandHistory = mutableListOf<Command>()

    fun executeCommand(command: Command) {
        command.execute()
        commandHistory.add(command)
    }

    fun undo() {
        if (commandHistory.isNotEmpty()) {
            val lastCommand = commandHistory.removeLast()
            // Simple undo - assumes command is its own inverse.  More complex 
            // implementations would need to store undo operations.
            if (lastCommand is OpenCommand) {
                document.close()
                println("Undoing open document")
            } else if (lastCommand is CloseCommand) {
                document.open()
                println("Undoing close document")
            }
        } else {
            println("No commands to undo")
        }
    }
}


fun main() {
    val document = Document()
    val app = App(document)

    app.executeCommand(OpenCommand(document))
    app.executeCommand(CloseCommand(document))
    app.undo()
    app.undo()
}
```