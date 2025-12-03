---
title: "Blackboard - Java"
date: 2025-12-03T15:22:49.769-05:00
draft: false
pattern_usage: ["Blackboard"]
language: ["Java"]
---
The Blackboard pattern is a communication and coordination mechanism for independent knowledge sources (agents) to collaboratively solve a complex problem. A central data structure, the "blackboard," holds the problem state, and agents react to changes on the board, contributing their expertise. This code demonstrates a simplified Blackboard for a string processing pipeline, with agents for uppercasing, trimming, and replacing substrings. Each agent observes the blackboard and applies its transformation when triggered by the appropriate condition.  The implementation uses interfaces for agent interaction with the blackboard, keeping the components loosely coupled, a common practice in Java for extensibility and maintainability.

```java
// Blackboard.java
import java.util.ArrayList;
import java.util.List;
import java.util.Observable;

class Blackboard extends Observable {
    private String data;

    public Blackboard(String initialData) {
        this.data = initialData;
    }

    public String getData() {
        return data;
    }

    public void setData(String data) {
        this.data = data;
        setChanged();
        notifyObservers();
    }
}

// Agent.java
interface Agent {
    void observe(Blackboard blackboard);
    void process();
}

// UppercaseAgent.java
class UppercaseAgent implements Agent {
    private Blackboard blackboard;

    @Override
    public void observe(Blackboard blackboard) {
        this.blackboard = blackboard;
    }

    @Override
    public void process() {
        String currentData = blackboard.getData();
        blackboard.setData(currentData.toUpperCase());
    }
}

// TrimAgent.java
class TrimAgent implements Agent {
    private Blackboard blackboard;

    @Override
    public void observe(Blackboard blackboard) {
        this.blackboard = blackboard;
    }

    @Override
    public void process() {
        String currentData = blackboard.getData();
        blackboard.setData(currentData.trim());
    }
}

// ReplaceAgent.java
class ReplaceAgent implements Agent {
    private Blackboard blackboard;
    private String target;
    private String replacement;

    public ReplaceAgent(String target, String replacement) {
        this.target = target;
        this.replacement = replacement;
    }

    @Override
    public void observe(Blackboard blackboard) {
        this.blackboard = blackboard;
    }

    @Override
    public void process() {
        String currentData = blackboard.getData();
        blackboard.setData(currentData.replace(target, replacement));
    }
}

// Main.java
public class Main {
    public static void main(String[] args) {
        Blackboard blackboard = new Blackboard("  hello world  ");

        UppercaseAgent uppercaseAgent = new UppercaseAgent();
        TrimAgent trimAgent = new TrimAgent();
        ReplaceAgent replaceAgent = new ReplaceAgent("WORLD", "Java");

        uppercaseAgent.observe(blackboard);
        trimAgent.observe(blackboard);
        replaceAgent.observe(blackboard);
        
        // Simulate agents processing in a specific order
        uppercaseAgent.process();
        trimAgent.process();
        replaceAgent.process();

        System.out.println(blackboard.getData()); // Output: HELLO JAVA
    }
}
```