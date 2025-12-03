---
title: "Facade - Java"
date: 2025-12-03T11:42:01.855-05:00
draft: false
pattern_usage: ["Facade"]
language: ["Java"]
---
The Facade pattern provides a simplified interface to a complex subsystem. It encapsulates multiple interactions within the subsystem into a single, higher-level interface, making it easier for clients to use. This example demonstrates a facade for a home theater system. The `HomeTheaterFacade` class provides methods like `watchMovie()` and `endMovie()` which internally coordinate the actions of various components (lights, projector, sound system, etc.). This shields the client from needing to know the intricacies of controlling each component individually. The Java implementation uses clear class definitions and method calls, aligning with the language's object-oriented principles and promoting loose coupling.

```java
// Subsystem classes
class Lights {
    public void on() {
        System.out.println("Lights turned on");
    }
    public void off() {
        System.out.println("Lights turned off");
    }
}

class Projector {
    public void on() {
        System.out.println("Projector turned on");
    }
    public void off() {
        System.out.println("Projector turned off");
    }
}

class SoundSystem {
    public void on() {
        System.out.println("Sound System turned on");
    }
    public void off() {
        System.out.println("Sound System turned off");
    }
    public void setVolume(int level) {
        System.out.println("Volume set to " + level);
    }
}

// Facade class
class HomeTheaterFacade {
    private Lights lights;
    private Projector projector;
    private SoundSystem soundSystem;

    public HomeTheaterFacade() {
        this.lights = new Lights();
        this.projector = new Projector();
        this.soundSystem = new SoundSystem();
    }

    public void watchMovie(String movie) {
        System.out.println("Watching " + movie);
        lights.off();
        projector.on();
        soundSystem.on();
        soundSystem.setVolume(50);
    }

    public void endMovie() {
        System.out.println("Movie finished");
        lights.on();
        projector.off();
        soundSystem.off();
    }
}

// Client code
public class FacadeExample {
    public static void main(String[] args) {
        HomeTheaterFacade homeTheater = new HomeTheaterFacade();
        homeTheater.watchMovie("Star Wars");
        homeTheater.endMovie();
    }
}
```