---
title: "Builder - Java"
date: 2025-12-03T10:52:09.966-05:00
draft: false
pattern_usage: ["Builder"]
language: ["Java"]
---
The Builder pattern is a creational design pattern that lets you construct complex objects step-by-step. It allows for separating the construction of an object from its representation, especially useful when an object has many optional parameters.  This implementation uses a static inner `Builder` class to handle the object construction.  The `Builder` class accumulates the necessary parameters through setter methods and then creates the final object with a `build()` method. This approach is idiomatic Java as it promotes immutability of the constructed object and provides a fluent interface for building it, enhancing readability and maintainability.

```java
// Computer.java
public class Computer {
    private final String cpu;
    private final int ram;
    private final String storage;
    private final boolean hasGpu;
    private final String operatingSystem;

    private Computer(ComputerBuilder builder) {
        this.cpu = builder.cpu;
        this.ram = builder.ram;
        this.storage = builder.storage;
        this.hasGpu = builder.hasGpu;
        this.operatingSystem = builder.operatingSystem;
    }

    public String getCpu() {
        return cpu;
    }

    public int getRam() {
        return ram;
    }

    public String getStorage() {
        return storage;
    }

    public boolean hasGpu() {
        return hasGpu;
    }

    public String getOperatingSystem() {
        return operatingSystem;
    }

    @Override
    public String toString() {
        return "Computer{" +
                "cpu='" + cpu + '\'' +
                ", ram=" + ram +
                ", storage='" + storage + '\'' +
                ", hasGpu=" + hasGpu +
                ", operatingSystem='" + operatingSystem + '\'' +
                '}';
    }

    public static class ComputerBuilder {
        private String cpu;
        private int ram;
        private String storage;
        private boolean hasGpu;
        private String operatingSystem;

        public ComputerBuilder(String cpu, int ram) {
            this.cpu = cpu;
            this.ram = ram;
        }

        public ComputerBuilder storage(String storage) {
            this.storage = storage;
            return this;
        }

        public ComputerBuilder hasGpu(boolean hasGpu) {
            this.hasGpu = hasGpu;
            return this;
        }

        public ComputerBuilder operatingSystem(String operatingSystem) {
            this.operatingSystem = operatingSystem;
            return this;
        }

        public Computer build() {
            return new Computer(this);
        }
    }

    public static void main(String[] args) {
        Computer computer = new ComputerBuilder("Intel i7", 16)
                .storage("512GB SSD")
                .hasGpu(true)
                .operatingSystem("Windows 11")
                .build();

        System.out.println(computer);
    }
}
```