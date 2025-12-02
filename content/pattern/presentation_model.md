---
title: "Presentation Model"
date: 2024-02-29T10:30:00Z
draft: false
pattern_types: ["behavioral", "UI"]
wikipedia: ""
diagramtype: "class"
diagram: "[View] -- \"Displays\" --> [PresentationModel]\n[PresentationModel] -- \"Updates\" --> [BusinessLogic]\n[PresentationModel] -- \"Data\" --> [Data]"
code: true
---

The Presentation Model pattern dictates a clear separation between the data and business logic of an application, and the UI layer responsible for displaying it. The Presentation Model acts as an intermediary, exposing data specifically tailored for the View. It abstracts the complexities of the underlying data and business rules, handling formatting, filtering and state management for the UI.

This pattern promotes testability and maintainability by decoupling the UI from the core application logic. Changes to the UI or the underlying business logic don't necessarily impact each other, as long as the Presentation Model's interface remains stable.  It's particularly useful in scenarios where complex UI interactions are required, or when supporting multiple views from the same data source.

## Usage

The Presentation Model is frequently employed in:

*   **Model-View-ViewModel (MVVM) architectures:** The Presentation Model serves as the ‘VM’ part, providing data bindings and command implementations for the View.
*   **Rich Internet Applications (RIAs):**  For complex UIs built with technologies like JavaScript frameworks (React, Angular, Vue.js) where the UI requires a prepared and formatted dataset.
*   **Desktop Applications:**  In frameworks like WPF and Swing, where complex data presentation and user interaction handling are commonplace.
*   **Applications needing separation of concerns:** Any application where you want to isolate the presentation logic from the business logic for easier testing and modification.

## Examples

1.  **WPF (Windows Presentation Foundation):** WPF heavily utilizes the Presentation Model pattern (often alongside MVVM).  A WPF application displaying a list of customers would have a `CustomerView` (the UI), a `CustomerPresentationModel` that formats customer data for display (e.g., formatting phone numbers, displaying addresses), and `CustomerBusinessLogic` that handles the creation, retrieval, and modification of customer data.  The `CustomerPresentationModel` exposes properties like `CustomerName`, `FormattedAddress`, and `PhoneNumber` that the `CustomerView` binds to.

2.  **React with Redux:** Although often associated with Flux or MVVM-ish patterns, React components can be seen as ‘Views’ that consume data from a ‘Presentation Model’ orchestrated by Redux.  Redux selectors act as presentation models, transforming the application state (the ‘Data’) into props specifically designed for the React components. For example, a selector might take a raw user object from the store and create a `userProfile` object containing only the name, email, and profile picture appropriate for display in a user profile component. The presentation logic lives in the selectors, keeping the React components purely presentational.