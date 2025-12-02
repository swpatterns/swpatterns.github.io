
---
title: Flyweight
date: 2023-10-27T10:30:00-00:00
draft: false
pattern_types: ["creational"]
wikipedia: "https://en.wikipedia.org/wiki/Flyweight_pattern"
diagramtype: "class"
diagram: "[Client] -- 'new' --> [FlyweightFactory]
[FlyweightFactory] -- 'getFlyweight' --> [Flyweight] : shares state
[Flyweight] -- 'operation' --> [IntrinsicState]
[Client] -- 'data' --> [ExtrinsicState]
[Flyweight] ..> [ExtrinsicState] : uses"
code: true
---

The Flyweight pattern is a structural design pattern that aims to minimize memory usage or computational costs by sharing as much data as possible between similar objects. It achieves this by separating the object state into intrinsic and extrinsic parts. Intrinsic state is shared and immutable, held within the flyweight object itself, while extrinsic state is unique to each object and passed to the flyweight when needed.

This pattern is particularly useful when dealing with a large number of objects that contain redundant information. By sharing the common, intrinsic state, you significantly reduce the memory footprint. It's often employed in applications like text editors, graphics editors, or game development, where numerous similar objects (characters, graphical elements, etc.) need to be managed efficiently.

## Usage

- **Text Editors/Word Processors:** Representing characters in a document. Each character might have a different font, size, and color (extrinsic state), while the glyph data for the character itself is shared (intrinsic state).
- **Game Development:** Managing game entities like trees, bushes, or rocks. Many instances of these entities might share the same visual model and properties (intrinsic state), while their position, rotation, and state (alive/destroyed) are specific to each instance (extrinsic state).
- **Database Connection Pooling:**  Sharing database connections across multiple requests. The connection details are intrinsic, while the specific query and result set are extrinsic.
- **Image Sprites:** In web development, combining many small images into a single larger image (sprite) and using CSS to display only the required portion.  The sprite image is intrinsic, and its position and size within the page is extrinsic.

## Examples

1. **Java's `String` Pool:** Java internally uses a flyweight-like mechanism with the `String` pool. When you create a string literal, the JVM first checks if a string with the same value already exists in the pool. If it does, it returns a reference to the existing string; otherwise, it creates a new one and adds it to the pool.  This avoids creating duplicate string objects with identical content, saving memory.

2. **React's `useMemo` hook:** While not a direct implementation of the Flyweight pattern, `useMemo` serves a similar purpose by memoizing the result of a function.  If the dependencies of the function remain unchanged between renders, `useMemo` returns the cached result instead of re-executing the function.  This shares computational effort and the resulting object between render cycles, effectively making it a lightweight, shared resource.
