---
title: "Facade - C++"
date: 2025-12-03T11:43:16.992-05:00
draft: false
pattern_usage: ["Facade"]
language: ["C++"]
---
The Facade pattern provides a simplified interface to a complex subsystem. It encapsulates multiple interactions within the subsystem into a single, higher-level interface, making it easier for clients to use. This example demonstrates a media player facade, hiding the complexities of audio and video components. The `MediaFacade` class provides methods like `playMovie` and `playMusic`, internally coordinating the `AudioPlayer` and `VideoPlayer` to achieve the desired functionality. This approach aligns with C++'s object-oriented principles, promoting encapsulation and reducing coupling between the client code and the subsystem.

```cpp
#include <iostream>
#include <string>

// Subsystem classes
class AudioPlayer {
public:
    void play(const std::string& filename) {
        std::cout << "Playing audio: " << filename << std::endl;
    }
};

class VideoPlayer {
public:
    void play(const std::string& filename) {
        std::cout << "Playing video: " << filename << std::endl;
    }
};

class DVDPlayer {
public:
    void on() {
        std::cout << "DVD Player is ON" << std::endl;
    }
    void off() {
        std::cout << "DVD Player is OFF" << std::endl;
    }
    void playDVD(const std::string& dvdName) {
        std::cout << "Playing DVD: " << dvdName << std::endl;
    }
};

// Facade class
class MediaFacade {
private:
    AudioPlayer audioPlayer;
    VideoPlayer videoPlayer;
    DVDPlayer dvdPlayer;

public:
    void playMovie(const std::string& filename) {
        dvdPlayer.on();
        dvdPlayer.playDVD(filename);
        videoPlayer.play(filename);
        audioPlayer.play(filename);
        dvdPlayer.off();
    }

    void playMusic(const std::string& filename) {
        audioPlayer.play(filename);
    }
};

int main() {
    MediaFacade mediaFacade;

    mediaFacade.playMovie("The Matrix");
    std::cout << std::endl;
    mediaFacade.playMusic("Bohemian Rhapsody");

    return 0;
}
```