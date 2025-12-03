---
title: "Template Method - Java"
date: 2025-12-03T13:36:36.845-05:00
draft: false
pattern_usage: ["Template Method"]
language: ["Java"]
---
The Template Method pattern defines the skeleton of an algorithm in a base class, deferring some steps to subclasses. It allows subclasses to redefine certain steps of an algorithm without changing the algorithm’s structure. This is achieved through abstract methods in the base class that are implemented by subclasses.  The example demonstrates a `Game` base class with a template method `play()`, which defines the game flow. Subclasses like `Cricket` and `Football` implement specific steps like `initialize()`, `startGame()`, and `endGame()`, tailoring the game to their rules, while the overall `play()` structure remains consistent. This leverages Java’s inheritance to provide a clean and extensible solution.

```java
// Template Method Pattern

// Abstract class defining the template
abstract class Game {

    // Template method - defines the algorithm's structure
    public void play() {
        initialize();
        startGame();
        while (notEnd()) {
            takeTurn();
        }
        endGame();
    }

    // Concrete methods (common steps)
    public void takeTurn() {
        System.out.println("Taking a turn...");
    }

    public boolean notEnd() {
        return true; //Placeholder, subclasses should define end condition
    }

    // Abstract methods (to be implemented by subclasses)
    protected abstract void initialize();
    protected abstract void startGame();
    protected abstract void endGame();
}

// Concrete class - Cricket
class Cricket extends Game {

    @Override
    protected void initialize() {
        System.out.println("Cricket: Initializing the game with bats and balls.");
    }

    @Override
    protected void startGame() {
        System.out.println("Cricket: Starting the cricket match.");
    }

    @Override
    protected void endGame() {
        System.out.println("Cricket: Ending the cricket match. Declaring the winner.");
    }

    @Override
    public boolean notEnd() {
        return Math.random() < 0.9; //Simulate game ending randomly
    }
}

// Concrete class - Football
class Football extends Game {

    @Override
    protected void initialize() {
        System.out.println("Football: Initializing the game with players and field.");
    }

    @Override
    protected void startGame() {
        System.out.println("Football: Starting the football match.");
    }

    @Override
    protected void endGame() {
        System.out.println("Football: Ending the football match. Declaring the winner.");
    }
}

// Main class to demonstrate
public class TemplateMethodDemo {
    public static void main(String[] args) {
        Game cricketGame = new Cricket();
        cricketGame.play();

        System.out.println("---");

        Game footballGame = new Football();
        footballGame.play();
    }
}
```