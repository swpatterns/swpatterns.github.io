---
title: "Facade - Go"
date: 2025-12-03T11:43:50.403-05:00
draft: false
pattern_usage: ["Facade"]
language: ["Go"]
---
The Facade pattern provides a simplified interface to a complex subsystem. It defines a high-level interface that hides the intricacies of the underlying components. This makes the subsystem easier to use for clients who don't need to know the details.

The Go code demonstrates a media player facade. The `MediaPlayer` struct encapsulates the complex interactions between different media components like `Codec`, `VideoFile`, and `AudioFile`.  Clients interact solely with `MediaPlayer`'s `Play()` method, hiding the initialization and operation of these components. This implementation leverages Go's struct composition and method receivers, which are idiomatic for creating such interfaces.  Error handling is also included, a common practice in Go.

```go
// main.go
package main

import (
	"fmt"
	"log"
)

// Subsystem components
type Codec interface {
	Decode(data []byte) error
}

type VideoFile struct {
	name string
}

type AudioFile struct {
	name string
}

type VLCCodec struct{}

func (c *VLCCodec) Decode(data []byte) error {
	fmt.Println("Decoding video with VLC codec")
	return nil
}

type MP4AudioCodec struct{}

func (c *MP4AudioCodec) Decode(data []byte) error {
	fmt.Println("Decoding audio with MP4 codec")
	return nil
}

// Facade
type MediaPlayer struct {
	videoFile  *VideoFile
	audioFile  *AudioFile
	videoCodec Codec
	audioCodec Codec
}

func NewMediaPlayer(videoFileName, audioFileName string) *MediaPlayer {
	return &MediaPlayer{
		videoFile:  &VideoFile{name: videoFileName},
		audioFile:  &AudioFile{name: audioFileName},
		videoCodec: &VLCCodec{},
		audioCodec: &MP4AudioCodec{},
	}
}

func (mp *MediaPlayer) Play() error {
	fmt.Println("Playing media...")

	videoData, err := mp.getVideoData()
	if err != nil {
		return fmt.Errorf("error getting video data: %w", err)
	}

	audioData, err := mp.getAudioData()
	if err != nil {
		return fmt.Errorf("error getting audio data: %w", err)
	}

	if err := mp.videoCodec.Decode(videoData); err != nil {
		return fmt.Errorf("error decoding video: %w", err)
	}

	if err := mp.audioCodec.Decode(audioData); err != nil {
		return fmt.Errorf("error decoding audio: %w", err)
	}

	fmt.Println("Media playing successfully.")
	return nil
}

func (mp *MediaPlayer) getVideoData() ([]byte, error) {
	fmt.Printf("Loading video file: %s\n", mp.videoFile.name)
	// Simulate loading video data
	return []byte("video data"), nil
}

func (mp *MediaPlayer) getAudioData() ([]byte, error) {
	fmt.Printf("Loading audio file: %s\n", mp.audioFile.name)
	// Simulate loading audio data
	return []byte("audio data"), nil
}

func main() {
	player := NewMediaPlayer("movie.mp4", "sound.mp3")
	err := player.Play()
	if err != nil {
		log.Fatalf("Failed to play media: %v", err)
	}
}
```