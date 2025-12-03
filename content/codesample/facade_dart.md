---
title: "Facade - Dart"
date: 2025-12-03T11:45:41.148-05:00
draft: false
pattern_usage: ["Facade"]
language: ["Dart"]
---
The Facade pattern provides a simplified interface to a complex subsystem. It defines a high-level interface that hides the complexities of the lower-level system. This makes the subsystem easier to use and understand for clients. 

The Dart code demonstrates a media player facade, simplifying interactions with components like file system, audio decoder, and video renderer.  The `MediaPlayer` class offers methods like `play()` and `stop()` which internally orchestrate the complex operations of these subsystems. This approach encapsulates the complexity and presents a clean, easy-to-use API.  Dart's class-based structure naturally lends itself to the Facade pattern, allowing for clear encapsulation and a well-defined interface.

```dart
// Subsystem 1: File System
class FileSystem {
  String readFile(String filePath) {
    print('Reading file from: $filePath');
    return 'File content from $filePath';
  }
}

// Subsystem 2: Audio Decoder
class AudioDecoder {
  String decode(String data) {
    print('Decoding audio data');
    return 'Decoded audio: $data';
  }
}

// Subsystem 3: Video Renderer
class VideoRenderer {
  void renderVideo(String data) {
    print('Rendering video: $data');
  }
}

// Facade: MediaPlayer
class MediaPlayer {
  final FileSystem _fileSystem = FileSystem();
  final AudioDecoder _audioDecoder = AudioDecoder();
  final VideoRenderer _videoRenderer = VideoRenderer();

  void play(String filePath) {
    print('Playing media from: $filePath');
    String fileContent = _fileSystem.readFile(filePath);
    String decodedAudio = _audioDecoder.decode(fileContent);
    _videoRenderer.renderVideo(decodedAudio);
    print('Media playing...');
  }

  void stop() {
    print('Stopping media...');
    // Add stop logic for subsystems if needed
  }
}

// Client code
void main() {
  final mediaPlayer = MediaPlayer();
  mediaPlayer.play('path/to/media.file');
  mediaPlayer.stop();
}
```