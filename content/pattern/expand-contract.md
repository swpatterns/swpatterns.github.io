---
title: "Expand-Contract"
date: 2024-02-29T14:30:00Z
draft: false
pattern_types: ["behavioral", "DDD"]
wikipedia: ""
diagramtype: "class"
diagram: "[Client] -- calls --> [Expandable] : expand()\n[Expandable] -- calls --> [Component1]\n[Expandable] -- calls --> [Component2]\n[Expandable] ..> [Contractable] : implements\n[Contractable] -- calls --> [Component1]\n[Contractable] -- calls --> [Component3]\n[note: Expandable focuses on adding components, Contractable focuses on removing them {bg:lightgreen}]"
code: true
---

The Expand-Contract pattern addresses scenarios where an object’s behavior needs to be dynamically altered by adding or removing components. It's particularly useful when dealing with complex functionality that isn't always required, promoting a lean initial state and deferring the instantiation of potentially expensive resources until needed. This pattern supports scenarios where functionality can be turned on/off or scaled up/down at runtime.

## Usage

This pattern is frequently used in:

*   **Plugin Systems:** Where new features are added to an application without modifying its core code. The 'expanding' part is loading a new plugin (adding a component), and 'contracting' might be dynamically unloading one.
*   **Resource Management:**  Dynamically allocating and deallocating resources based on demand, like adding processing units to handle peak loads or removing them during idle times.
*   **Feature Toggles:**  Turning features on or off at runtime to perform A/B testing or manage rollout schedules. Adding feature code is expansion, removing/disabling is contraction.
*   **Microservices Architecture:** Services can dynamically add or remove dependencies to handle fluctuating workloads or evolve functionality.

## Examples

1.  **Web Browser Tabs:** Modern web browsers employ an expand-contract strategy with tabs. Opening a new tab 'expands' the browser's functionality by adding a new rendering engine and associated resources. Closing a tab 'contracts' by releasing those resources. The browser’s core remains stable, only increasing/decreasing complexity as tabs are added/removed.

2.  **Database Connection Pooling:** Database connection pools ‘expand’ by creating new connections when demand increases, and ‘contract’ by releasing unused connections back to the pool. This avoids the overhead of constantly establishing and tearing down connections, improving performance. Libraries like HikariCP and Apache DBCP provide implementations of this pattern.

3.  **Gradle/Maven Plugin Management:** Build tools like Gradle and Maven allow users to add or remove plugins to customize their build processes. Adding a plugin ‘expands’ the build functionality, while removing a plugin ‘contracts’ it. This provides flexibility without modifying the core build tool.