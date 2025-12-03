---
title: "Space-Based Architecture - Java"
date: 2025-12-03T14:56:01.904-05:00
draft: false
pattern_usage: ["Space-Based Architecture"]
language: ["Java"]
---
The Space-Based Architecture pattern decouples application logic by using a shared, immutable context (the "space") to pass data between components. Instead of direct dependencies, components register to receive notifications when data they're interested in changes within the space. This promotes loose coupling and allows components to be added or removed without impacting others.

This Java implementation uses a simple `Space` class holding a `Map` of data. `Component`s register for specific keys and receive updates via a callback interface (`Listener`).  The `Space` manages the `Listener`s and notifies them when data associated with their key changes. This is broadly analogous to a pub-sub system, but centralized within the 'space'.  Using interfaces for the component and listener adheres to Java's preference for abstraction, while the `Map` provides efficient data lookups, enabling lightweight communication suitable for distributed systems.  The immutability of the data within the space is enforced by returning copies of the data to the listeners.

```java
import java.util.HashMap;
import java.util.Map;
import java.util.ArrayList;
import java.util.List;

interface Listener {
    void onDataChanged(String key, Object newValue);
}

interface Component {
    String[] getInterestedInKeys();
    void setData(String key, Object value);
}

class Space {
    private final Map<String, Object> data = new HashMap<>();
    private final List<Listener> listeners = new ArrayList<>();

    public void register(Listener listener, String... keys) {
        listeners.add(listener);
        for (String key : keys) {
            notifyListeners(key, data.getOrDefault(key, null)); // Initial notification
        }
    }

    public void unregister(Listener listener) {
        listeners.remove(listener);
    }

    public void put(String key, Object value) {
        if (!data.containsKey(key) || !data.get(key).equals(value)) {
            data.put(key, value);
            notifyListeners(key, value);
        }
    }

    private void notifyListeners(String key, Object value) {
        for (Listener listener : listeners) {
            listener.onDataChanged(key, value);
        }
    }

    public Object getData(String key) {
        return data.get(key); //Return a copy if immutability is critical
    }
}

class MyComponent implements Component {
    private final Space space;
    private final String componentName;

    public MyComponent(Space space, String componentName) {
        this.space = space;
        this.componentName = componentName;
        space.register(this::handleDataChange, "temperature", "humidity");
    }

    @Override
    public String[] getInterestedInKeys() {
        return new String[]{"temperature", "humidity"};
    }

    @Override
    public void setData(String key, Object value) {
        space.put(key, value);
    }

    public void handleDataChange(String key, Object newValue) {
        System.out.println(componentName + " received update for " + key + ": " + newValue);
    }
}

public class SpaceBasedArchitecture {
    public static void main(String[] args) {
        Space space = new Space();

        MyComponent component1 = new MyComponent(space, "Component 1");
        MyComponent component2 = new MyComponent(space, "Component 2");

        space.put("temperature", 25);
        space.put("humidity", 60);
        space.put("temperature", 28);
    }
}
```