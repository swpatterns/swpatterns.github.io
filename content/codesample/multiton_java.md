---
title: "Multiton - Java"
date: 2025-12-03T11:07:57.708-05:00
draft: false
pattern_usage: ["Multiton"]
language: ["Java"]
---
The Multiton pattern ensures that only a limited number of instances of a class exist. It's a relaxation of the Singleton pattern, useful when more than one object is needed but a full-blown factory feels excessive. This Java implementation uses an `enum` to define the limited set of instances, leveraging the inherent guarantee that enum values are instantiated only once. The `enum` approach is concise and thread-safe, aligning with Java's preference for enums when a fixed set of constants with associated state is required, making it more idiomatic than explicit static instance management.

```java
// Multiton.java
public class Multiton {

    private final String value;

    private Multiton(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }

    public enum Instance {
        INSTANCE_ONE("First"),
        INSTANCE_TWO("Second"),
        INSTANCE_THREE("Third");

        private final Multiton multiton;

        Instance(String value) {
            this.multiton = new Multiton(value);
        }

        public Multiton getInstance() {
            return multiton;
        }
    }

    public static void main(String[] args) {
        Multiton instance1 = Multiton.Instance.INSTANCE_ONE.getInstance();
        Multiton instance2 = Multiton.Instance.INSTANCE_TWO.getInstance();
        Multiton instance3 = Multiton.Instance.INSTANCE_THREE.getInstance();

        System.out.println(instance1.getValue());
        System.out.println(instance2.getValue());
        System.out.println(instance3.getValue());

        // Verify that instances are unique
        System.out.println(instance1 == instance2); // false
        System.out.println(instance1 == instance3); // false
        System.out.println(instance2 == instance3); // false
    }
}
```