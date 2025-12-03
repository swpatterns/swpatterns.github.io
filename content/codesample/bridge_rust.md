---
title: "Bridge - Rust"
date: 2025-12-03T11:32:14.982-05:00
draft: false
pattern_usage: ["Bridge"]
language: ["Rust"]
---
The Bridge pattern is a structural design pattern that lets you split an abstraction from its implementation so that objects can have different abstract interfaces. This is useful when you want to avoid a rigid hierarchy of classes. In this Rust example, we have an `AudioPlayer` abstraction and different `AudioFormat` implementations (MP3, WAV). The `AudioPlayer` doesn't care *how* the audio is formatted; it delegates that to the `AudioFormat` trait object. This allows us to add new audio formats without modifying the `AudioPlayer` itself.  Rust's trait objects and ownership system naturally lend themselves to this pattern, promoting flexibility and avoiding tight coupling.

```rust
// Define the AudioFormat trait
trait AudioFormat {
    fn play(&self, data: &[u8]);
}

// Concrete implementation for MP3
struct MP3Format;

impl AudioFormat for MP3Format {
    fn play(&self, data: &[u8]) {
        println!("Playing MP3: {:?}", data);
    }
}

// Concrete implementation for WAV
struct WAVFormat;

impl AudioFormat for WAVFormat {
    fn play(&self, data: &[u8]) {
        println!("Playing WAV: {:?}", data);
    }
}

// The AudioPlayer abstraction
struct AudioPlayer<'a> {
    format: &'a dyn AudioFormat,
}

impl<'a> AudioPlayer<'a> {
    fn new(format: &'a dyn AudioFormat) -> Self {
        AudioPlayer { format }
    }

    fn play(&self, data: &[u8]) {
        self.format.play(data);
    }
}

fn main() {
    let mp3_player = AudioPlayer::new(&MP3Format);
    mp3_player.play(&[1, 2, 3]);

    let wav_player = AudioPlayer::new(&WAVFormat);
    wav_player.play(&[4, 5, 6]);
}
```