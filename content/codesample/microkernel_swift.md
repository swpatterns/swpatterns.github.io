---
title: "Microkernel - Swift"
date: 2025-12-03T14:23:05.136-05:00
draft: false
pattern_usage: ["Microkernel"]
language: ["Swift"]
---
The Microkernel pattern structures an application with a core system providing minimal functionality and extending features via plug-ins. This promotes modularity and flexibility, allowing functionalities to be added, removed, or updated without affecting the core.

This Swift example models a simple text processing application. The `Kernel` defines the core processing loop and handles plugin registration. `Plugin` is a protocol that each text processing function must conform to. Two example plugins, `UppercasePlugin` and `LowercasePlugin`, are provided. The kernel iterates through registered plugins, applying each to the input text. This implementation leverages Swift’s protocols and first-class functions for a natural and extensible approach, ideal for a dynamic system like a microkernel.

```swift
// Kernel.swift
import Foundation

protocol Plugin {
    var name: String { get }
    func process(text: String) -> String
}

class Kernel {
    private var plugins: [Plugin] = []

    func registerPlugin(_ plugin: Plugin) {
        plugins.append(plugin)
    }

    func process(text: String) -> String {
        var processedText = text
        for plugin in plugins {
            processedText = plugin.process(text: processedText)
        }
        return processedText
    }
}

// UppercasePlugin.swift
class UppercasePlugin: Plugin {
    let name = "Uppercase"
    func process(text: String) -> String {
        return text.uppercased()
    }
}

// LowercasePlugin.swift
class LowercasePlugin: Plugin {
    let name = "Lowercase"
    func process(text: String) -> String {
        return text.lowercased()
    }
}

// Example Usage:
let kernel = Kernel()
kernel.registerPlugin(UppercasePlugin())
kernel.registerPlugin(LowercasePlugin())

let input = "Hello World"
let output = kernel.process(text: input)
print(output) // Prints "hello world"
```