---
title: "Extension Object - Java"
date: 2025-12-03T12:52:05.102-05:00
draft: false
pattern_usage: ["Extension Object"]
language: ["Java"]
---
The Extension Object pattern allows adding functionality to an object without modifying its core class. It achieves this by creating a separate "extension" object that holds the additional behavior and is associated with the original object. This is particularly useful when you have a class with many responsibilities and want to keep it focused, or when you need to add functionality that isn't universally applicable.

The Java implementation uses composition. The `Original` class holds a reference to an `Extension` object.  Methods requiring the extended functionality delegate to the `Extension` instance. This avoids bloating the `Original` class and promotes the Open/Closed Principle. The use of interfaces (`Extension`) allows for multiple, independent extensions to be created and swapped easily, fitting Java's preference for interfaces and loose coupling.

```java
// Define the interface for extensions
interface Extension {
    String extend(String data);
}

// The original class with core functionality
class Original {
    private final String data;
    private Extension extension;

    public Original(String data) {
        this.data = data;
        this.extension = new NullExtension(); // Default: no extension
    }

    public String getData() {
        return data;
    }

    public String processData() {
        return "Original: " + data;
    }

    public void setExtension(Extension extension) {
        this.extension = extension;
    }

    public String extendedProcessData() {
        return extension.extend(processData());
    }
}

// A default extension that does nothing
class NullExtension implements Extension {
    @Override
    public String extend(String data) {
        return data;
    }
}

// A concrete extension that adds a suffix
class SuffixExtension implements Extension {
    private final String suffix;

    public SuffixExtension(String suffix) {
        this.suffix = suffix;
    }

    @Override
    public String extend(String data) {
        return data + " - Extended";
    }
}

// Example Usage
public class ExtensionObjectExample {
    public static void main(String[] args) {
        Original original = new Original("Hello");
        System.out.println(original.processData()); // Output: Original: Hello
        System.out.println(original.extendedProcessData()); // Output: Original: Hello

        SuffixExtension suffixExtension = new SuffixExtension("!");
        original.setExtension(suffixExtension);
        System.out.println(original.extendedProcessData()); // Output: Original: Hello - Extended
    }
}
```