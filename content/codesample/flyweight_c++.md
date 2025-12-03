---
title: "Flyweight - C++"
date: 2025-12-03T12:42:14.122-05:00
draft: false
pattern_usage: ["Flyweight"]
language: ["C++"]
---
The Flyweight pattern aims to minimize memory usage by sharing common parts of objects. It's particularly useful when dealing with a large number of similar objects. The pattern separates the object's intrinsic state (shared) from its extrinsic state (unique to each instance).  Flyweights represent the shared intrinsic state, while clients manage the unique extrinsic state.

This C++ example demonstrates the Flyweight pattern with a simple `Character` class. The `CharacterFactory` ensures only one instance of each character (intrinsic state) is created.  The `Context` class holds the font, color, and position (extrinsic state) for each character's usage. This approach avoids storing redundant character data, saving memory when rendering many characters. The use of a `std::map` in the factory is idiomatic for efficient lookup and storage of the flyweights.

```cpp
#include <iostream>
#include <map>
#include <string>

// Intrinsic State: Shared among many objects
class Character {
public:
  char glyph;

  Character(char glyph) : glyph(glyph) {}

  void display(int x, int y, std::string color) {
    std::cout << "Character: " << glyph << ", Position: (" << x << ", " << y << "), Color: " << color << std::endl;
  }
};

// Flyweight Factory: Manages Flyweight objects
class CharacterFactory {
public:
  std::map<char, Character*> characters;

  Character* getCharacter(char key) {
    if (characters.find(key) == characters.end()) {
      characters[key] = new Character(key);
    }
    return characters[key];
  }
};

// Context: Holds extrinsic state and uses Flyweights
class Context {
public:
  Character* character;
  int x;
  int y;
  std::string color;

  Context(Character* character, int x, int y, std::string color)
      : character(character), x(x), y(y), color(color) {}

  void display() {
    character->display(x, y, color);
  }
};

int main() {
  CharacterFactory factory;

  Context context1(factory.getCharacter('A'), 10, 20, "red");
  Context context2(factory.getCharacter('B'), 30, 40, "green");
  Context context3(factory.getCharacter('A'), 50, 60, "blue");

  context1.display();
  context2.display();
  context3.display();

  // Clean up (important in C++)
  for (auto const& [key, val] : factory.characters) {
    delete val;
  }

  return 0;
}
```