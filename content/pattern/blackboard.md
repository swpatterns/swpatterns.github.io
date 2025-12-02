---
title: Blackboard
date: 2024-02-29T17:10:15-00:00
draft: false
pattern_types: ["behavioral", "AI"]
wikipedia: https://en.wikipedia.org/wiki/Blackboard_(programming)
diagramtype: "class"
diagram: "[Blackboard] --o [KnowledgeSource : 1..*] : Knows\n[Blackboard] --o [Controller : 1] : Manages\n[Controller] ..> [KnowledgeSource] : Selects & Applies"
code: true
---

The Blackboard pattern provides a central repository (the Blackboard) of information that multiple, independent Knowledge Sources can access, modify, and react to. A Controller selects which Knowledge Sources are relevant at any given time based on the current state of the Blackboard, and applies their expertise to solve a complex problem. This allows for a flexible and extensible system when the problem-solving strategy isn't known in advance or changes frequently.

It's particularly useful in domains like artificial intelligence, speech recognition, and expert systems where a variety of specialized components need to collaborate to achieve a single goal.  The Blackboard decouples the problem-solving logic from the individual knowledge sources, making it easier to add, remove, or modify components without disrupting the entire system.

## Usage

The Blackboard pattern is commonly used in:

*   **AI and Expert Systems:**  For tasks like image recognition, natural language processing, and automated reasoning, where different sources of knowledge (e.g., edge detection, grammar rules, inference engines) contribute to a final solution.
*   **Speech Recognition Systems:** Different modules for acoustic modeling, phoneme recognition, and language processing contribute to recognizing spoken words.
*   **Complex Data Processing Pipelines:** Where multiple stages of data transformation and analysis need to be applied reactively depending on the data's contents.
*   **Robotics:** Coordinating actions of different robot components based on sensor input and environmental conditions.
*   **Game AI:** Managing the behavior of multiple game entities, allowing them to react and interact with each other in complex ways.

## Examples

*   **GraalVM's Truffle Framework:** Truffle uses a Blackboard pattern to represent the abstract syntax tree (AST) of code being executed. Different language implementations (knowledge sources) contribute to analyzing and optimizing this AST, and a central interpreter (controller) manages the execution. The AST effectively *is* the Blackboard.
*   **OpenCV:** OpenCV's image processing pipeline utilizes a Blackboard approach, although not explicitly named as such. An image (the Blackboard) is passed through a series of filters and algorithms (Knowledge Sources). The output of one filter becomes the input for the next, with a central process orchestrating the pipeline and determining which algorithms to apply based on the image data. For example, object detection might involve edge detection, then shape analysis, then feature matching – each a knowledge source contributing to the overall "understanding" of the image.