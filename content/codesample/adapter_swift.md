---
title: "Adapter - Swift"
date: 2025-12-03T11:28:52.679-05:00
draft: false
pattern_usage: ["Adapter"]
language: ["Swift"]
---
The Adapter pattern converts the interface of a class into another interface clients expect, letting incompatible classes work together. It’s a structural pattern acting as a wrapper. In this Swift example, we have a `JSONData` provider that needs to integrate with a `UserData` display system expecting `Dictionary` inputs. We create an `JSONDataAdapter` that transforms the `JSONData` into a `Dictionary` compatible with the `UserData` protocol. This uses Swift's protocol-oriented programming, making the adapter a natural fit that avoids modifying the original `JSONData` class.

```swift
// Target interface
protocol UserData {
    func getDisplayName() -> String
    func getEmail() -> String
}

// Adaptee (Existing data source)
struct JSONData {
    let jsonData: [String: Any]
    func getData() -> [String: Any] {
        return jsonData
    }
}

// Adapter
class JSONDataAdapter: UserData {
    private let jsonData: JSONData

    init(jsonData: JSONData) {
        self.jsonData = jsonData
    }

    func getDisplayName() -> String {
        return jsonData.getData()["fullName"] as? String ?? "Unknown"
    }

    func getEmail() -> String {
        return jsonData.getData()["emailAddress"] as? String ?? "No email"
    }
}

// Client
func displayUserData(userData: UserData) {
    print("Display Name: \(userData.getDisplayName())")
    print("Email: \(userData.getEmail())")
}

// Example Usage
let json = JSONData(jsonData: ["fullName": "Alice Smith", "emailAddress": "alice@example.com"])
let adapter = JSONDataAdapter(jsonData: json)
displayUserData(userData: adapter)
```