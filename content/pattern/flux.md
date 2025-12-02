
---
title: Flux
date: 2024-02-29T10:30:00Z
draft: false
pattern_types: ["architectural", "behavioral", "reactive"]
wikipedia: https://en.wikipedia.org/wiki/Flux_(software_architecture)
diagramtype: "sequence"
diagram: mermaid
sequenceDiagram
    participant View
    participant Dispatcher
    participant Store1
    participant Store2
    participant Action1
    participant Action2

    View->>Action1: User Action
    Action1->>Dispatcher: Dispatch Action
    Dispatcher->>Store1: Broadcast Action
    Dispatcher->>Store2: Broadcast Action
    Store1->>Store1: Update State
    Store2->>Store2: Update State
    Store1->>View: State Changed
    Store2->>View: State Changed
    View->>View: Render
    
    View->>Action2: User Action
    Action2->>Dispatcher: Dispatch Action
    Dispatcher->>Store1: Broadcast Action
    Dispatcher->>Store2: Broadcast Action
    Store1->>Store1: Update State
    Store2->>Store2: Update State
    Store1->>View: State Changed
    Store2->>View: State Changed
    View->>View: Render

code: true
---

Flux is an application architecture for managing the state of a web application. It's commonly used with React and other JavaScript frameworks, but the principles can be applied more broadly.  The core idea is unidirectional data flow: data flows in a single direction, making it easier to reason about and debug the application's state. This contrasts with traditional two-way data binding approaches.

Flux consists of four main components: Actions, the Dispatcher, Stores, and Views. Actions are payloads of data describing an event. The Dispatcher is a central hub that receives actions and broadcasts them to all registered Stores. Stores contain the application's state and logic for updating that state in response to actions. Views display the data from the Stores and initiate actions based on user interaction.  This predictable flow helps avoid complex dependencies and makes state management more manageable, especially in large applications.

## Usage

Flux is particularly useful in complex applications with a lot of interactive elements and shared state. Common scenarios include:

*   **Real-time applications:** Where data changes frequently and needs to be reflected across multiple views.
*   **Collaborative applications:** Where multiple users interact with the same data.
*   **Large single-page applications (SPAs):** Where managing state complexity is a significant challenge.
*   **Applications requiring predictable state updates:**  For easier debugging and testing.

## Examples

*   **Redux:** A popular predictable state container for JavaScript apps. Redux is heavily inspired by Flux, but simplifies it by using a single store and pure functions (reducers) to update the state. It enforces the unidirectional data flow principle of Flux.
*   **Facebook's React (original implementation):** Flux was originally created by Facebook to address state management issues in the React library. While React now offers other state management solutions like Context and Hooks, Flux served as the foundation for many of these approaches and demonstrated the benefits of unidirectional data flow.
*   **MobX:** While not a direct implementation of Flux, MobX shares the goal of predictable state management. It uses observable data and automatic dependency tracking to achieve a similar result, but with a more object-oriented approach and less boilerplate than traditional Flux.
*   **Vuex:** The official state management library for Vue.js, Vuex is also inspired by Flux and Redux, providing a centralized store for managing application state in a predictable manner.
