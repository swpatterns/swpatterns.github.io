---
title: "Monolith - Swift"
date: 2025-12-03T14:27:04.920-05:00
draft: false
pattern_usage: ["Monolith"]
language: ["Swift"]
---
The Monolith pattern represents a traditional, unified application structure where all components are tightly coupled and deployed as a single unit. Our Swift example will simulate this by having a single `App` class managing all functionality – user management, data handling, and a simple display mechanism. While modern Swift development often favors modularity, this demonstrates the pattern's core concept of everything residing within a single codebase. The implementation uses a simple class structure and avoids frameworks to highlight the tightly coupled nature. This fits Swift’s object-oriented capabilities but represents anti-pattern usage from a contemporary perspective.  It prioritizes simplicity in demonstration over best practices for large-scale Swift projects.

```swift
// App.swift

class App {
    private var users: [String: String] = [:] // [username: password]
    
    func registerUser(username: String, password: String) {
        users[username] = password
        print("User \(username) registered.")
    }

    func loginUser(username: String, password: String) -> Bool {
        if let storedPassword = users[username], storedPassword == password {
            print("User \(username) logged in.")
            return true
        } else {
            print("Login failed for user \(username).")
            return false
        }
    }

    func displayUsers() {
        print("Registered Users:")
        for (username, _) in users {
            print("- \(username)")
        }
    }
}

// Example Usage
let app = App()
app.registerUser(username: "alice", password: "password123")
app.registerUser(username: "bob", password: "secret")

app.loginUser(username: "alice", password: "password123")
app.loginUser(username: "charlie", password: "wrongpassword")

app.displayUsers()
```