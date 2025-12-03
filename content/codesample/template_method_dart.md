---
title: "Template Method - Dart"
date: 2025-12-03T13:40:32.089-05:00
draft: false
pattern_usage: ["Template Method"]
language: ["Dart"]
---
The Template Method pattern defines the skeleton of an algorithm in a base class, deferring some steps to subclasses. It allows subclasses to redefine certain steps of an algorithm without changing the algorithm's structure. This promotes code reuse and avoids duplication.

The Dart example defines an abstract `Game` class with a `play()` method representing the algorithm's skeleton.  `initialize()`, `makeMove()`, and `endGame()` are abstract methods that subclasses must implement, providing the specific steps. `Dart`'s support for abstract classes and methods makes it a natural fit for this pattern.  The concrete `Cricket` and `Football` classes inherit from `Game` and provide their own implementations for the abstract methods, customizing the game logic while maintaining the overall `play()` sequence.

```dart
abstract class Game {
  void initialize();
  void makeMove();
  void endGame();

  void play() {
    initialize();
    makeMove();
    endGame();
  }
}

class Cricket extends Game {
  @override
  void initialize() {
    print('Cricket Game Initializing: Setting up players and pitch.');
  }

  @override
  void makeMove() {
    print('Cricket Game: Batsman bats, Bowler bowls.');
  }

  @override
  void endGame() {
    print('Cricket Game Finished: Declaring the winner.');
  }
}

class Football extends Game {
  @override
  void initialize() {
    print('Football Game Initializing: Setting up teams and field.');
  }

  @override
  void makeMove() {
    print('Football Game: Players dribble and pass the ball.');
  }

  @override
  void endGame() {
    print('Football Game Finished: Declaring the winning team.');
  }
}

void main() {
  var cricketGame = Cricket();
  cricketGame.play();

  var footballGame = Football();
  footballGame.play();
}
```