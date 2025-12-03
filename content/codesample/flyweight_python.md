---
title: "Flyweight - Python"
date: 2025-12-03T11:46:11.273-05:00
draft: false
pattern_usage: ["Flyweight"]
language: ["Python"]
---
The Flyweight pattern aims to minimize memory usage by sharing as much data as possible between similar objects. It achieves this by separating an object's intrinsic (shared, immutable) state from its extrinsic (unique, mutable) state.  The intrinsic state is stored in a flyweight object, while the extrinsic state is passed to the flyweight when needed.

This Python example demonstrates the Flyweight pattern with `TextFragment` as the flyweight. The intrinsic state is the `text` itself, shared across instances referencing the same text. The extrinsic state – `x` and `y` coordinates – are passed to the `draw` method, making each visual representation unique despite sharing the underlying text data.  This is idiomatic Python due to its use of dictionaries for efficient lookup of shared objects and the flexibility of passing arguments to methods.

```python
class TextFragment:
    """
    Flyweight class representing a shared text fragment.
    """
    def __init__(self, text):
        self.text = text

    def draw(self, x, y):
        """
        Draws the text fragment at the given coordinates.
        Extrinsic state is passed as arguments.
        """
        print(f"Drawing '{self.text}' at ({x}, {y})")


class TextRenderer:
    """
    Manages flyweight objects and provides access to them.
    """
    def __init__(self):
        self.fragments = {}

    def get_fragment(self, text):
        """
        Retrieves a text fragment from the cache.
        Creates a new one if it doesn't exist.
        """
        if text not in self.fragments:
            self.fragments[text] = TextFragment(text)
        return self.fragments[text]

    def render_text(self, text, coordinates):
        """
        Renders a string of text using flyweights.
        """
        for i, char in enumerate(text):
            fragment = self.get_fragment(char)
            x = coordinates[0] + i
            y = coordinates[1]
            fragment.draw(x, y)


if __name__ == "__main__":
    renderer = TextRenderer()
    renderer.render_text("Hello, world!", (10, 20))
    renderer.render_text("Another text", (5, 30))
```