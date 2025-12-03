---
title: "Singleton - Swift"
date: 2025-12-03T11:06:54.207-05:00
draft: false
pattern_usage: ["Singleton"]
language: ["Swift"]
---
The Singleton pattern ensures a class has only one instance and provides a global point of access to it. This is useful for managing shared resources or configurations. In Swift, we achieve this using a static instance property and a private initializer to prevent external instantiation. The example demonstrates a `Logger` class that manages logging functionality throughout the application. The `shared` property provides access to the unique instance. This approach is idiomatic Swift, leveraging static properties for global access and controlling object creation through initializer access control.

```swift
// Logger.swift

import Foundation

class Logger {
    static let shared = Logger()

    private init() {
        // Private initializer to prevent direct instantiation
    }

    func log(message: String) {
        let timestamp = DateFormatter.localizedString(from: Date(), format: "yyyy-MM-dd HH:mm:ss")
        print("[\(timestamp)] - \(message)")
    }
}

// Usage:
// Logger.shared.log(message: "Application started")
// Logger.shared.log(message: "User logged in")
```