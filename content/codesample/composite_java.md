---
title: "Composite - Java"
date: 2025-12-03T11:34:05.975-05:00
draft: false
pattern_usage: ["Composite"]
language: ["Java"]
---
The Composite pattern allows you to treat individual objects and compositions of objects uniformly. It creates a tree-like structure where you can perform operations on both individual 'leaves' and composite 'branches' in the same way. This example demonstrates a file system structure, where files are leaves and directories are composites. We define a common `FileSystemComponent` interface, and then `File` and `Directory` classes implement this interface. `Directory` contains a list of other `FileSystemComponent` instances, allowing for hierarchical structures.  This implementation uses interfaces and classes, common Java practices, enabling polymorphism and clear separation of concerns.

```java
import java.util.ArrayList;
import java.util.List;

// Component
interface FileSystemComponent {
    void print();
    double getSize();
}

// Leaf
class File implements FileSystemComponent {
    private final String name;
    private final double size;

    public File(String name, double size) {
        this.name = name;
        this.size = size;
    }

    @Override
    public void print() {
        System.out.println("  File: " + name + " (" + size + " KB)");
    }

    @Override
    public double getSize() {
        return size;
    }
}

// Composite
class Directory implements FileSystemComponent {
    private final String name;
    private final List<FileSystemComponent> children = new ArrayList<>();

    public Directory(String name) {
        this.name = name;
    }

    public void add(FileSystemComponent component) {
        children.add(component);
    }

    @Override
    public void print() {
        System.out.println("Directory: " + name);
        for (FileSystemComponent child : children) {
            child.print();
        }
    }

    @Override
    public double getSize() {
        double totalSize = 0;
        for (FileSystemComponent child : children) {
            totalSize += child.getSize();
        }
        return totalSize;
    }
}

public class CompositePattern {
    public static void main(String[] args) {
        Directory root = new Directory("Root");
        Directory documents = new Directory("Documents");
        Directory images = new Directory("Images");

        root.add(documents);
        root.add(images);

        documents.add(new File("report.docx", 1024));
        documents.add(new File("presentation.pptx", 2048));
        images.add(new File("photo.jpg", 512));
        images.add(new Directory("Screenshots"));
        images.add(new File("logo.png", 256));

        root.print();
        System.out.println("Total size: " + root.getSize() + " KB");
    }
}
```