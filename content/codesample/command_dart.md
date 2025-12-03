---
title: "Command - Dart"
date: 2025-12-03T13:04:40.572-05:00
draft: false
pattern_usage: ["Command"]
language: ["Dart"]
---
The Command Pattern encapsulates a request as an object, allowing you to parameterize clients with different requests, queue or log requests, and support undoable operations. This implementation uses Dart’s function type and abstract class capabilities to define a command interface with an `execute` method. Concrete commands wrap specific operations on a `SimpleEditor` receiver. An `EditorInvoker` manages command execution and potentially queuing.  Dart’s concise syntax and support for first-class functions make this pattern particularly clean to implement, avoiding excessive interface bloat often seen in other languages. The use of an abstract class provides type safety and a clear contract for all commands.

```dart
abstract class Command {
  void execute();
  void unexecute(); // Optional for undo functionality
}

class SimpleEditor {
  String text = '';

  void setText(String newText) {
    text = newText;
    print('Text set to: $text');
  }

  void appendText(String addedText) {
    text += addedText;
    print('Text appended: $text');
  }
}

class SetTextCommand implements Command {
  final SimpleEditor editor;
  final String text;
  String? previousText;

  SetTextCommand(this.editor, this.text);

  @override
  void execute() {
    previousText = editor.text;
    editor.setText(text);
  }

  @override
  void unexecute() {
    editor.setText(previousText ?? ''); // Restore previous state
  }
}

class AppendTextCommand implements Command {
  final SimpleEditor editor;
  final String text;

  AppendTextCommand(this.editor, this.text);

  @override
  void execute() {
    editor.appendText(text);
  }

  @override
  void unexecute() {
    // Simple un-append.  More complex scenarios might need storing more state.
    if (editor.text.endsWith(text)) {
      editor.text = editor.text.substring(0, editor.text.length - text.length);
       print('Text un-appended: ${editor.text}');
    }
  }
}


class EditorInvoker {
  final List<Command> commands = [];

  void executeCommand(Command command) {
    command.execute();
    commands.add(command);
  }

  void undoLastCommand() {
    if (commands.isNotEmpty) {
      final command = commands.removeLast();
      command.unexecute();
    } else {
      print('No commands to undo.');
    }
  }
}

void main() {
  final editor = SimpleEditor();
  final invoker = EditorInvoker();

  final setTextCommand = SetTextCommand(editor, 'Hello');
  invoker.executeCommand(setTextCommand);

  final appendCommand = AppendTextCommand(editor, ' World!');
  invoker.executeCommand(appendCommand);

  invoker.undoLastCommand();
  invoker.undoLastCommand();

}
```