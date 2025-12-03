---
title: "Facade - Scala"
date: 2025-12-03T11:45:27.776-05:00
draft: false
pattern_usage: ["Facade"]
language: ["Scala"]
---
The Facade pattern provides a simplified interface to a complex subsystem. It encapsulates multiple interactions within the subsystem into a single, higher-level interface, making it easier for clients to use. This example demonstrates a media player facade, hiding the complexities of audio and video processing. The `MediaFacade` class offers simple `playMovie` and `playMusic` methods, internally coordinating the `AudioPlayer`, `VideoPlayer`, and `Codec` components. This implementation is idiomatic Scala due to its use of classes for encapsulation, clear method signatures, and concise code leveraging Scala's features.

```scala
// Subsystem classes
class AudioPlayer {
  def play(audioType: String, fileName: String): Unit = {
    println(s"Playing audio file: $fileName (Type: $audioType)")
  }
}

class VideoPlayer {
  def play(fileName: String): Unit = {
    println(s"Playing video file: $fileName")
  }
}

class Codec {
  def convert(fileType: String, fileName: String): String = {
    println(s"Converting file: $fileName (Type: $fileType)")
    fileName // Simulate conversion - return the same name
  }
}

// Facade class
class MediaFacade {
  private val audioPlayer = new AudioPlayer()
  private val videoPlayer = new VideoPlayer()
  private val codec = new Codec()

  def playMovie(fileName: String): Unit = {
    val convertedFileName = codec.convert("mp4", fileName)
    videoPlayer.play(convertedFileName)
  }

  def playMusic(fileName: String): Unit = {
    val convertedFileName = codec.convert("mp3", fileName)
    audioPlayer.play("mp3", convertedFileName)
  }
}

// Client code
object Main {
  def main(args: Array[String]): Unit = {
    val mediaFacade = new MediaFacade()

    mediaFacade.playMovie("movie.avi")
    mediaFacade.playMusic("song.wav")
  }
}
```