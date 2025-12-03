---
title: "Strategy - Java"
date: 2025-12-03T13:31:58.797-05:00
draft: false
pattern_usage: ["Strategy"]
language: ["Java"]
---
The Strategy pattern defines a family of algorithms, encapsulates each one, and makes them interchangeable. It allows an algorithm to vary independently from the clients that use it. This implementation uses a functional interface `SortingStrategy` to represent different sorting algorithms. The `Sorter` class accepts a `SortingStrategy` object in its constructor and delegates the sorting task to it. This promotes loose coupling and allows easily adding new sorting strategies without modifying the `Sorter` class itself.  Java’s lambda expressions make defining the strategies concise and readable, aligning with modern Java practices for functional programming where applicable.

```java
// SortingStrategy.java
@FunctionalInterface
interface SortingStrategy {
    void sort(int[] array);
}

// Sorter.java
class Sorter {
    private final SortingStrategy strategy;

    public Sorter(SortingStrategy strategy) {
        this.strategy = strategy;
    }

    public void performSort(int[] array) {
        strategy.sort(array);
    }
}

// Main.java
public class Main {
    public static void main(String[] args) {
        int[] data = {5, 2, 8, 1, 9, 4};

        // Bubble Sort Strategy
        Sorter bubbleSorter = new Sorter(array -> {
            int n = array.length;
            for (int i = 0; i < n - 1; i++) {
                for (int j = 0; j < n - i - 1; j++) {
                    if (array[j] > array[j + 1]) {
                        // Swap
                        int temp = array[j];
                        array[j] = array[j + 1];
                        array[j + 1] = temp;
                    }
                }
            }
        });

        bubbleSorter.performSort(data.clone()); // Clone to avoid modifying original array
        System.out.println("Bubble Sorted Array: " + java.util.Arrays.toString(data.clone()));


        // Java's built-in Arrays.sort() Strategy
        Sorter javaSorter = new Sorter(array -> java.util.Arrays.sort(array));
        javaSorter.performSort(data.clone());
        System.out.println("Java Sorted Array: " + java.util.Arrays.toString(data.clone()));
    }
}
```