---
title: "Command - PHP"
date: 2025-12-03T13:04:03.956-05:00
draft: false
pattern_usage: ["Command"]
language: ["PHP"]
---
The Command pattern encapsulates a request as an object, allowing parameterization of clients with different requests, queuing or logging of requests, and support for undoable operations. This implementation uses PHP interfaces to define the `Command` and `Receiver` roles. Concrete commands like `LightOnCommand` and `LightOffCommand` encapsulate the action and the receiver (a `Light` object). An `Invoker` (e.g., a `RemoteControl`) then executes the commands without knowing the underlying operation. This conforms to PHP's object-oriented style by leveraging interfaces and classes for clear separation of concerns and extensibility.

```php
<?php

/**
 * Receiver: Knows how to perform the action.
 */
class Light
{
    public function on()
    {
        echo "Light is on.\n";
    }

    public function off()
    {
        echo "Light is off.\n";
    }
}

/**
 * Command: Declares an interface for executing a request.
 */
interface Command
{
    public function execute();
    public function undo(); // Optional
}

/**
 * Concrete Command: Binds a receiver to an action.
 */
class LightOnCommand implements Command
{
    private Light $light;

    public function __construct(Light $light)
    {
        $this->light = $light;
    }

    public function execute()
    {
        $this->light->on();
    }

    public function undo()
    {
        $this->light->off();
    }
}

/**
 * Concrete Command: Binds a receiver to an action.
 */
class LightOffCommand implements Command
{
    private Light $light;

    public function __construct(Light $light)
    {
        $this->light = $light;
    }

    public function execute()
    {
        $this->light->off();
    }

    public function undo()
    {
        $this->light->on();
    }
}


/**
 * Invoker: Requests the command to execute.
 */
class RemoteControl
{
    private Command $command;

    public function setCommand(Command $command)
    {
        $this->command = $command;
    }

    public function buttonPressed()
    {
        $this->command->execute();
    }
}

// Client code
$light = new Light();
$onCommand = new LightOnCommand($light);
$offCommand = new LightOffCommand($light);

$remote = new RemoteControl();
$remote->setCommand($onCommand);
$remote->buttonPressed();

$remote->setCommand($offCommand);
$remote->buttonPressed();

?>
```