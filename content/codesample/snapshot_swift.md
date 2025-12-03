---
title: "Snapshot - Swift"
date: 2025-12-03T14:02:01.326-05:00
draft: false
pattern_usage: ["Snapshot"]
language: ["Swift"]
---
The Snapshot pattern captures and restores the state of an object, allowing for easy undo/redo functionality or saving/loading of progress. It's implemented here using Swift's `Codable` protocol to serialize the object's state into a snapshot (a dictionary in this case).  The `takeSnapshot()` method creates a `Codable` representation of the object, and `restoreSnapshot()` applies the saved state. This approach leverages Swift's built-in serialization capabilities, making the code concise and readable. Using a dictionary for the snapshot provides flexibility for future state expansion. The pattern is particularly well-suited for Swift due to its strong typing and protocol-oriented programming features.

```swift
import Foundation

class Account: Codable {
    var balance: Double
    var transactionHistory: [String]

    init(balance: Double, transactionHistory: [String]) {
        self.balance = balance
        self.transactionHistory = transactionHistory
    }

    func deposit(amount: Double) {
        balance += amount
        transactionHistory.append("Deposited: \(amount)")
    }

    func withdraw(amount: Double) {
        if balance >= amount {
            balance -= amount
            transactionHistory.append("Withdrawn: \(amount)")
        } else {
            transactionHistory.append("Withdrawal failed: Insufficient funds")
        }
    }

    func takeSnapshot() -> [String: Any] {
        let encoder = JSONEncoder()
        if let data = try? encoder.encode(self) {
            if let dictionary = try? JSONSerialization.jsonObject(with: data, options: .allowFragments) as? [String: Any] {
                return dictionary
            }
        }
        return [:] // Return an empty dictionary if snapshotting fails
    }

    func restoreSnapshot(snapshot: [String: Any]) {
        let decoder = JSONDecoder()
        if let data = try? decoder.encode(snapshot), let account = try? decoder.decode(Account.self, from: data) {
            self.balance = account.balance
            self.transactionHistory = account.transactionHistory
        }
    }
}

// Example Usage
let account = Account(balance: 100.0, transactionHistory: ["Initial balance: 100.0"])
let snapshot = account.takeSnapshot()

account.deposit(amount: 50.0)
print("After deposit:")
print("Balance: \(account.balance)")
print("Transaction History: \(account.transactionHistory)")

account.restoreSnapshot(snapshot: snapshot)

print("\nAfter restoring snapshot:")
print("Balance: \(account.balance)")
print("Transaction History: \(account.transactionHistory)")
```