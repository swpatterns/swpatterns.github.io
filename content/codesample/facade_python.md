---
title: "Facade - Python"
date: 2025-12-03T11:42:14.872-05:00
draft: false
pattern_usage: ["Facade"]
language: ["Python"]
---
The Facade pattern provides a simplified interface to a complex subsystem. It defines a high-level interface that hides the intricacies of the underlying components, making the system easier to use. This example demonstrates a simple media player facade, abstracting away the complexities of handling different media types (audio and video). The `MediaFacade` class provides a single `play` method, handling the instantiation and interaction with the appropriate media player based on the file extension. This approach aligns with Python's emphasis on readability and reducing complexity through abstraction.

```python
# Subsystem classes
class AudioPlayer:
    def play(self, filename):
        print(f"Playing audio file: {filename}")

class VideoPlayer:
    def play(self, filename):
        print(f"Playing video file: {filename}")

class FileTypeChecker:
    def is_audio(self, filename):
        return filename.endswith(".mp3") or filename.endswith(".wav")

    def is_video(self, filename):
        return filename.endswith(".mp4") or filename.endswith(".avi")


# Facade class
class MediaFacade:
    def __init__(self):
        self.audio_player = AudioPlayer()
        self.video_player = VideoPlayer()
        self.file_checker = FileTypeChecker()

    def play(self, filename):
        if self.file_checker.is_audio(filename):
            self.audio_player.play(filename)
        elif self.file_checker.is_video(filename):
            self.video_player.play(filename)
        else:
            print(f"Unsupported file type: {filename}")


# Client code
if __name__ == "__main__":
    facade = MediaFacade()
    facade.play("song.mp3")
    facade.play("movie.mp4")
    facade.play("document.pdf")
```