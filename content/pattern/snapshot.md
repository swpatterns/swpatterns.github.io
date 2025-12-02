
---
title: Snapshot
date: 2024-02-29T10:30:00Z
draft: false
pattern_types: ["behavioral", "memory management"]
wikipedia: https://en.wikipedia.org/wiki/Memento_pattern
diagramtype: "class"
diagram: "[Originator] -- \"createSnapshot()\" -> [Snapshot] : stores state\n[Originator] -- \"restoreSnapshot()\" -> [Snapshot] : reverts to stored state\n[Caretaker] -- \"keep: Snapshot\" -> [Snapshot] : holds snapshots\n[Caretaker] -- \"getSnapshot()\" -> [Snapshot] : provides access to snapshots"
code: true
---

The Snapshot pattern captures the internal state of an object at a particular point in time, allowing it to be restored to that state later. This is achieved by creating a "snapshot" or "memento" of the object's state, which is then stored by a separate "caretaker" object. The originator can then recreate itself from the snapshot if required.

This pattern is particularly useful when implementing features like undo/redo functionality, transaction management, or version control.  It allows for state recovery without violating encapsulation, as the snapshot holds the internal state without exposing it directly to the caretaker. This isolation preserves the originator's control over its data.

## Usage

The Snapshot pattern is widely used in scenarios requiring state persistence and recovery:

*   **Undo/Redo functionality:**  Text editors, image manipulation software, and game engines use this pattern to enable users to undo or redo actions. Each action creates a snapshot of the application's state before the action is applied.
*   **Transaction Management:**  Databases and financial systems utilize snapshots to ensure that transactions can be rolled back to a consistent state in case of failure.
*   **Version Control Systems:**  The core concept behind version control systems like Git is to maintain snapshots of files and directories over time, allowing users to revert to previous versions.
*   **Game Saving:** Games often use snapshots to store the player's progress, including the game world state, player statistics, and inventory.

## Examples

*   **Git:** Git fundamentally relies on the Snapshot pattern.  Every commit represents a snapshot of the entire project's state at that moment. Git efficiently stores these snapshots by only saving the differences between versions. The `.git` directory acts as the caretaker, holding the history of snapshots.

*   **Redux (JavaScript Library):** Redux uses a single immutable state tree. Actions trigger state changes, and a reducer function calculates the new state.  Before each action, the current state is effectively a snapshot.  The store maintains the history of these snapshots, allowing for time-travel debugging and implementing undo/redo features. The `combineReducers` function and middleware like Redux Thunk leverage this snapshotting capability.

*   **Word/Google Docs:**  These applications use snapshots to automatically save documents at intervals, and to facilitate the undo/redo functionality. The application (Originator) creates a snapshot of the document's state, and a background service (Caretaker) stores these snapshots.
