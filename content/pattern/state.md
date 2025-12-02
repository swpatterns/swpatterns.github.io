---
title: "State"
date: 2024-02-29T10:30:00Z
draft: false
pattern_types: ["behavioral", "OOA"]
wikipedia: "https://en.wikipedia.org/wiki/State_pattern"
diagramtype: "state"
diagram: "[State] --> [ConcreteStateA] : event1\n[State] --> [ConcreteStateB] : event2\n[Context] -- [State] : has a\n[Context] --> [ConcreteStateA] : initial state\n[Context] --> [ConcreteStateB] : triggered by events"
code: true
---

The State pattern allows an object to alter its behavior when its internal state changes. This pattern avoids the use of large conditional statements (like `if/else` or `switch`) that often become unwieldy and difficult to maintain when dealing with complex state-dependent logic. Instead, each state is represented by a separate class, leading to a more organized and extensible design.

Essentially, the pattern encapsulates the different states of an object, along with the transitions between those states, into classes. The context object, which represents the object whose behavior changes, delegates the requests to the current state object. This enables the object to seamlessly switch between behaviors based on its state.

## Usage

The State pattern is commonly used in scenarios where an object’s behavior is dictated by its state and needs to change dynamically. Some typical use cases include:

*   **User Interface (UI):** Implementing different states for UI elements like buttons (enabled, disabled, hovered, pressed).
*   **Game Development:** Defining different states for game characters (idle, walking, running, jumping, attacking).
*   **Workflow Management:** Modeling different stages in a process, such as order processing (pending, processing, shipped, delivered).
*   **Communication Protocols:** Representing the different phases of a network connection (listening, connecting, connected, closing).
*   **State Machines:** More generally, implementing complex state machines where the object transitions between a well-defined set of states based on external events.

## Examples

*   **TCP Connection:** A TCP connection goes through various states (SYN\_SENT, ESTABLISHED, FIN\_WAIT\_1, etc.). Each state handles incoming and outgoing data differently. The TCP protocol itself effectively uses a state machine implemented with concepts similar to the State pattern.

*   **Java’s `java.util.concurrent.locks.Lock` interface & implementations:** Specifically, the state management behind acquiring and releasing a lock relies on a pattern similar to State.  A lock might be in an ‘unlocked’ state, transition to a ‘locked’ state when acquired, and allow releases only when locked.  The internal implementation will handle the state transitions and ensure thread safety.

*   **Android Activity Lifecycle:** An Android Activity's lifecycle consists of states like `CREATED`, `STARTED`, `RESUMED`, `PAUSED`, `STOPPED`, and `DESTROYED`. Each state dictates what the activity can and cannot do, and the Android framework internally manages these state transitions.