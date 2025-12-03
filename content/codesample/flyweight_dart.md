---
title: "Flyweight - Dart"
date: 2025-12-03T12:45:04.432-05:00
draft: false
pattern_usage: ["Flyweight"]
language: ["Dart"]
---
The Flyweight pattern aims to minimize memory usage by sharing objects that are similar. It separates an object's state into intrinsic (shared) and extrinsic (unique) parts. Intrinsic state is stored in the flyweight object, while extrinsic state is passed to the flyweight when needed. This is particularly useful when dealing with a large number of similar objects.

This Dart example demonstrates the Flyweight pattern with `Character` as the flyweight. The `Character` stores the intrinsic character itself (the glyph).  `Text` holds references to these shared `Character` objects and manages the extrinsic state – the color and position of each character instance.  The `CharacterFactory` ensures only one instance of each character exists, providing the flyweight functionality. This approach is idiomatic Dart due to its object-oriented nature and use of classes and factories for managing object creation and state.

```dart
// Flyweight interface
abstract class Character {
  void display(String context, int x, int y);
}

// Concrete Flyweight
class ConcreteCharacter implements Character {
  final String character;

  ConcreteCharacter(this.character);

  @override
  void display(String context, int x, int y) {
    print('Character: $character, Context: $context, Position: ($x, $y)');
  }
}

// Flyweight Factory
class CharacterFactory {
  final Map<String, Character> _characters = {};

  Character getCharacter(String character) {
    if (!_characters.containsKey(character)) {
      _characters[character] = ConcreteCharacter(character);
    }
    return _characters[character]!;
  }
}

// Flyweight User (Client)
class Text {
  final CharacterFactory characterFactory;
  final List<Character> characters = [];
  final List<String> contexts = [];
  final List<int> xPositions = [];
  final List<int> yPositions = [];

  Text(this.characterFactory);

  void addCharacter(String character, String context, int x, int y) {
    final charFlyweight = characterFactory.getCharacter(character);
    characters.add(charFlyweight);
    contexts.add(context);
    xPositions.add(x);
    yPositions.add(y);
  }

  void display() {
    for (int i = 0; i < characters.length; i++) {
      characters[i].display(contexts[i], xPositions[i], yPositions[i]);
    }
  }
}

void main() {
  final factory = CharacterFactory();
  final text = Text(factory);

  text.addCharacter('a', 'sentence1', 10, 20);
  text.addCharacter('b', 'sentence1', 30, 20);
  text.addCharacter('a', 'sentence2', 10, 40);
  text.addCharacter('c', 'sentence2', 50, 40);

  text.display();
}
```