---
title: "Blackboard - Dart"
date: 2025-12-03T15:26:50.603-05:00
draft: false
pattern_usage: ["Blackboard"]
language: ["Dart"]
---
The Blackboard pattern is a computational architecture for solving problems that involve multiple, independent knowledge sources. A shared data structure, the "blackboard," holds the problem state. Knowledge sources (independent modules) observe the blackboard and, when their conditions are met, execute to modify the state. This allows for flexible problem-solving without tight coupling between components.

This Dart implementation uses a simple `Blackboard` class to hold the problem state (a `String` in this case). `KnowledgeSource` classes have a `condition` function to check if they can act, and an `action` function to modify the blackboard. A `BlackboardSystem` orchestrates the process, repeatedly applying applicable knowledge sources until a solution is reached.  The use of functions as arguments and the separation of condition/action logic are idiomatic for Dart's functional and OOP capabilities, providing a clean and testable structure.

```dart
// blackboard.dart
class Blackboard {
  String state = '';
}

abstract class KnowledgeSource {
  bool condition(Blackboard blackboard);
  void action(Blackboard blackboard);
}

class Initializer implements KnowledgeSource {
  @override
  bool condition(Blackboard blackboard) => blackboard.state.isEmpty;

  @override
  void action(Blackboard blackboard) {
    blackboard.state = 'initial data';
    print('Initializer applied: blackboard.state = ${blackboard.state}');
  }
}

class Processor1 implements KnowledgeSource {
  @override
  bool condition(Blackboard blackboard) => blackboard.state == 'initial data';

  @override
  void action(Blackboard blackboard) {
    blackboard.state = 'processed by 1';
    print('Processor 1 applied: blackboard.state = ${blackboard.state}');
  }
}

class Processor2 implements KnowledgeSource {
  @override
  bool condition(Blackboard blackboard) => blackboard.state == 'processed by 1';

  @override
  void action(Blackboard blackboard) {
    blackboard.state = 'processed by 2';
    print('Processor 2 applied: blackboard.state = ${blackboard.state}');
  }
}

class BlackboardSystem {
  final Blackboard blackboard;
  final List<KnowledgeSource> knowledgeSources;

  BlackboardSystem(this.blackboard, this.knowledgeSources);

  void run() {
    while (true) {
      bool applied = false;
      for (var source in knowledgeSources) {
        if (source.condition(blackboard)) {
          source.action(blackboard);
          applied = true;
          break; // Apply only one source per cycle
        }
      }
      if (!applied) {
        print('No sources applied, system halted.');
        break;
      }
      if (blackboard.state == 'processed by 2') {
        print('Final State: ${blackboard.state}');
        break;
      }
    }
  }
}

void main() {
  var blackboard = Blackboard();
  var system = BlackboardSystem(blackboard, [
    Initializer(),
    Processor1(),
    Processor2(),
  ]);

  system.run();
}
```