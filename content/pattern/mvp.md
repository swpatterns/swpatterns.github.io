
---
title: MVP
date: 2024-02-29T10:30:00Z
draft: false
pattern_types: ["architectural", "behavioral"]
wikipedia: https://en.wikipedia.org/wiki/Model-View-Presenter
diagramtype: "class"
diagram: "[Model] -- : has data --> [View]
[Presenter] -- : updates --> [View]
[Presenter] -- : retrieves data from --> [Model]
[View] -- : user actions --> [Presenter]
[note: View is passive, only displays data and relays user input {bg:lightyellow}]
[note: Model contains business logic and data {bg:lightgreen}]
[note: Presenter acts as intermediary, preparing data for the View {bg:lightblue}]"
code: true
---

The Model-View-Presenter (MVP) pattern is a user interface architectural pattern that originated from a desire to improve the separation of concerns in graphical user interface (GUI) development. It's similar to Model-View-Controller (MVC), but with a key difference: the View in MVP is entirely passive, interacting only with the Presenter. The Presenter retrieves data from the Model and formats it for display in the View, and it also handles user input, updating the Model accordingly.

MVP aims to create a more testable and maintainable codebase. By decoupling the UI logic (in the Presenter) from the UI elements (View) and the data logic (Model), developers can write unit tests for the Presenter without involving the UI. This simplifies testing and makes it easier to modify or extend the application's behavior without impacting the visual presentation.

## Usage

MVP is commonly used in:

*   **Desktop Applications:**  Especially in technologies like .NET (Windows Forms, WPF) and Java Swing where creating robust and testable UIs is crucial.
*   **Web Applications (with limitations):** While traditionally desktop-focused, MVP concepts can be applied to server-side web development, though it necessitates careful handling of the "View" aspect (often rendered using a template engine).  Frameworks like Angular and React can be adapted to resemble MVP's separation.
*   **Mobile Applications:** Often utilized in projects developed with native mobile frameworks or cross-platform solutions needing strong testability.
*   **Situations Requiring High Testability:**  Any project where the UI logic is complex and prone to changes benefits from MVP’s clear separation of concerns, enabling thorough unit testing.

## Examples

*   **ASP.NET Web Forms:**  A classic example of MVP in action.  The `.aspx` file represents the View, code-behind files act as Presenters, and the data access layer comprises the Model.  User controls and custom server controls can effectively represent the passive View.

*   **Flutter (with Bloc/Provider):** Although Flutter commonly uses other patterns, the architecture achieved with a combination of Bloc/Provider promotes MVP principles. The UI (Widgets) corresponds to the View, the Bloc/Provider class acts as the Presenter by handling business logic and state management, and a data repository functions as the Model. For example, using the `flutter_bloc` package, you would define a Bloc to receive user events, interact with data sources, and update the UI state.
