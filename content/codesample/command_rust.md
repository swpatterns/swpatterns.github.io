---
title: "Command - Rust"
date: 2025-12-03T13:02:50.030-05:00
draft: false
pattern_usage: ["Command"]
language: ["Rust"]
---
The Command pattern encapsulates a request as an object, allowing parameterization of clients with different requests, queuing or logging of requests, and support for undoable operations. This implementation uses Rust's `FnOnce` trait to define commands as closures that can be executed once. A `CommandManager` holds a vector of these commands and provides mechanisms to add and execute them. This approach leverages Rust’s ownership and borrowing rules to guarantee safety and prevents accidental re-execution of commands. The functional style is naturally suited to defining commands as closures.

```rust
// Define the Command trait using a closure that takes ownership of the receiver.
trait Command {
    fn execute(&self);
}

// Implement Command for a simple struct.  This is often where the actual work happens.
struct Receiver {
    data: String,
}

impl Receiver {
    fn operation(&mut self, input: &str) {
        self.data = input.to_string();
    }
}

// Example commands
struct AddCommand {
    receiver: Receiver,
    input: String,
}

impl AddCommand {
    fn new(receiver: Receiver, input: String) -> Self {
        AddCommand { receiver, input }
    }
}

impl Command for AddCommand {
    fn execute(&self) {
        let mut receiver = self.receiver;
        receiver.operation(&self.input);
        println!("Added data: {}", self.input);
    }
}


struct PrintCommand {
    receiver: Receiver,
}

impl PrintCommand {
    fn new(receiver: Receiver) -> Self {
        PrintCommand { receiver }
    }
}

impl Command for PrintCommand {
    fn execute(&self) {
        println!("Current data: {}", self.receiver.data);
    }
}

// Command Manager
struct CommandManager {
    commands: Vec<Box<dyn Command>>,
}

impl CommandManager {
    fn new() -> Self {
        CommandManager { commands: Vec::new() }
    }

    fn add_command(&mut self, command: Box<dyn Command>) {
        self.commands.push(command);
    }

    fn execute_all(&mut self) {
        for command in &mut self.commands {
            command.execute();
        }
        self.commands.clear(); //Optional: clear commands after execution.
    }
}


fn main() {
    let mut receiver = Receiver { data: String::new() };
    let mut command_manager = CommandManager::new();

    command_manager.add_command(Box::new(AddCommand::new(receiver.clone(), "Hello".to_string())));
    command_manager.add_command(Box::new(PrintCommand::new(receiver.clone())));
    command_manager.add_command(Box::new(AddCommand::new(receiver.clone(), " World".to_string())));
    command_manager.add_command(Box::new(PrintCommand::new(receiver.clone())));


    command_manager.execute_all();
}
```