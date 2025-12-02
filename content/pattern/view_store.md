
---
title: View Store
date: 2024-02-29T10:30:00Z
draft: false
pattern_types: ["behavioral", "frontend", "DDD"]
wikipedia: ""
diagramtype: "class"
diagram: "[View] --|> [ViewModel]\n[ViewStore] --|> [ViewModel]\n[ViewStore] ..> [Event]\n[Event] --|> [Reducer]\n[Reducer] --> [State]\n[ViewStore] --> [State]"
code: true
---

The View Store pattern acts as a mediator between a View (UI) and the underlying application State. It centralizes the logic for preparing data from the State into a ViewModel specifically tailored for the View's needs.  Crucially, it also handles user-generated Events from the View, dispatching them to a Reducer which updates the State. This separation of concerns improves testability, maintainability, and allows for complex data transformations without cluttering the View or State.

## Usage

The View Store pattern is commonly used in modern frontend architectures, particularly those employing unidirectional data flow like Redux, Vuex, or similar state management libraries. It’s applicable when: you need to derive a specific data structure for a UI component from a global application state, you want to encapsulate the logic for handling user interactions and updating the state, and you aim to improve the performance of UI updates by only rendering components when their relevant state changes. It’s often part of implementations of the Model-View-Intent (MVI) or similar reactive patterns.

## Examples

1. **Redux (JavaScript):** In Redux, the `connect` higher-order component functions as a View Store. It subscribes to the Redux store (State), maps parts of the state to the component's props (ViewModel), and dispatches actions (Events) to the store, which are then handled by Reducers.  The `connect` function effectively isolates the component from the complexities of the Redux store.

2. **Vuex (Vue.js):** Vuex utilizes "getters" which can be considered View Stores. Getters are functions that compute derived state from the Vuex store (State) and return it as a ViewModel for components.  Vuex "mutations" (triggered by "actions") act as the Reducers, updating the store's state based on dispatched events.  Pinia, a newer state management library for Vue, also employs similar concepts with stores containing both state and actions that function as View Stores.
