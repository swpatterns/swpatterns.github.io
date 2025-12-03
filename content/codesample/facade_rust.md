---
title: "Facade - Rust"
date: 2025-12-03T11:44:05.290-05:00
draft: false
pattern_usage: ["Facade"]
language: ["Rust"]
---
The Facade pattern provides a simplified interface to a complex subsystem. It defines a high-level interface that hides the intricacies of the underlying components, making the subsystem easier to use. This example demonstrates a media player facade, simplifying interactions with audio and video components. The `MediaPlayer` struct encapsulates the complex logic of initializing and controlling the audio and video subsystems.  Rust's ownership and borrowing system naturally supports encapsulation, making it a good fit for this pattern. The use of structs and methods provides a clean and idiomatic way to define the facade interface.

```rust
// Subsystem components
struct AudioEngine {
    loaded: bool,
}

impl AudioEngine {
    fn new() -> Self {
        AudioEngine { loaded: false }
    }

    fn load_audio(&mut self, filename: &str) {
        println!("Loading audio file: {}", filename);
        self.loaded = true;
    }

    fn play(&self) {
        if self.loaded {
            println!("Playing audio...");
        } else {
            println!("Audio not loaded.");
        }
    }
}

struct VideoEngine {
    running: bool,
}

impl VideoEngine {
    fn new() -> Self {
        VideoEngine { running: false }
    }

    fn load_video(&mut self, filename: &str) {
        println!("Loading video file: {}", filename);
    }

    fn play(&mut self) {
        self.running = true;
        println!("Playing video...");
    }

    fn stop(&mut self) {
        self.running = false;
        println!("Stopping video...");
    }
}

// Facade
struct MediaPlayer {
    audio_engine: AudioEngine,
    video_engine: VideoEngine,
}

impl MediaPlayer {
    fn new() -> Self {
        MediaPlayer {
            audio_engine: AudioEngine::new(),
            video_engine: VideoEngine::new(),
        }
    }

    fn play_media(&mut self, audio_file: &str, video_file: &str) {
        self.audio_engine.load_audio(audio_file);
        self.video_engine.load_video(video_file);
        self.audio_engine.play();
        self.video_engine.play();
    }

    fn stop_media(&mut self) {
        self.video_engine.stop();
    }
}

fn main() {
    let mut player = MediaPlayer::new();
    player.play_media("song.mp3", "movie.mp4");
    player.stop_media();
}
```