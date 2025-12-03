---
title: "Facade - C"
date: 2025-12-03T11:43:32.263-05:00
draft: false
pattern_usage: ["Facade"]
language: ["C"]
---
The Facade pattern provides a simplified interface to a complex subsystem. It encapsulates multiple interactions within the subsystem into a single, higher-level interface, making the system easier to use. This example demonstrates a media player facade, hiding the complexities of audio and video components. The `MediaPlayerFacade` provides methods like `play()` and `stop()` which internally handle the initialization, playback, and cleanup of the underlying `AudioPlayer` and `VideoPlayer` subsystems. This is idiomatic C as it leverages structs to represent the facade and subsystems, and function pointers to define the interfaces, keeping the code modular and manageable.

```c
#include <stdio.h>
#include <stdlib.h>

// Subsystem 1: Audio Player
typedef struct {
    void (*start)(void);
    void (*stop)(void);
} AudioPlayer;

void audio_start(void) {
    printf("Audio: Starting playback...\n");
}

void audio_stop(void) {
    printf("Audio: Stopping playback...\n");
}

AudioPlayer audio_player = {
    .start = audio_start,
    .stop = audio_stop
};

// Subsystem 2: Video Player
typedef struct {
    void (*start)(void);
    void (*stop)(void);
} VideoPlayer;

void video_start(void) {
    printf("Video: Starting playback...\n");
}

void video_stop(void) {
    printf("Video: Stopping playback...\n");
}

VideoPlayer video_player = {
    .start = video_start,
    .stop = video_stop
};

// Facade: Media Player
typedef struct {
    AudioPlayer *audio;
    VideoPlayer *video;
} MediaPlayerFacade;

void media_player_start(MediaPlayerFacade *facade) {
    if (facade == NULL) return;
    facade->audio->start();
    facade->video->start();
}

void media_player_stop(MediaPlayerFacade *facade) {
    if (facade == NULL) return;
    facade->audio->stop();
    facade->video->stop();
}

MediaPlayerFacade create_media_player_facade() {
    MediaPlayerFacade facade;
    facade.audio = &audio_player;
    facade.video = &video_player;
    return facade;
}

int main() {
    MediaPlayerFacade player = create_media_player_facade();

    media_player_start(&player);
    // Simulate playback
    printf("Playing media...\n");
    media_player_stop(&player);

    return 0;
}
```