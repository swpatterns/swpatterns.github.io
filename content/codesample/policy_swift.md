---
title: "Policy - Swift"
date: 2025-12-03T13:57:35.795-05:00
draft: false
pattern_usage: ["Policy"]
language: ["Swift"]
---
The Policy pattern allows you to encapsulate a complex set of business rules into separate, interchangeable policy objects. This promotes flexibility and maintainability by avoiding monolithic conditional logic.  Instead of a single class making decisions based on numerous `if/else` statements, different policies can be applied to a context, each handling a specific aspect of the decision-making process.

This Swift implementation defines a `ValidationPolicy` protocol with a `isValid(for:)` method. Concrete policies like `LengthPolicy` and `CharacterPolicy` conform to this protocol, each implementing its own validation rule. A `Validator` class takes an array of `ValidationPolicy` instances and applies them sequentially to a given string.  The use of a protocol and composition aligns with Swift's emphasis on protocol-oriented programming and avoids tight coupling.

```swift
// ValidationPolicy.swift

protocol ValidationPolicy {
    func isValid(for input: String) -> Bool
}

// LengthPolicy.swift
struct LengthPolicy: ValidationPolicy {
    private let minLength: Int
    private let maxLength: Int

    init(minLength: Int, maxLength: Int) {
        self.minLength = minLength
        self.maxLength = maxLength
    }

    func isValid(for input: String) -> Bool {
        return input.count >= minLength && input.count <= maxLength
    }
}

// CharacterPolicy.swift
struct CharacterPolicy: ValidationPolicy {
    private let allowedCharacters: CharacterSet

    init(allowedCharacters: CharacterSet) {
        self.allowedCharacters = allowedCharacters
    }

    func isValid(for input: String) -> Bool {
        return allowedCharacters.isSuperset(of: input.unicodeScalars)
    }
}

// Validator.swift
class Validator {
    private let policies: [ValidationPolicy]

    init(policies: [ValidationPolicy]) {
        self.policies = policies
    }

    func validate(input: String) -> Bool {
        for policy in policies {
            if !policy.isValid(for: input) {
                return false
            }
        }
        return true
    }
}

// Example Usage
let allowedChars = CharacterSet.alphanumerics
let lengthPolicy = LengthPolicy(minLength: 8, maxLength: 20)
let charPolicy = CharacterPolicy(allowedCharacters: allowedChars)

let validator = Validator(policies: [lengthPolicy, charPolicy])

let validString = "SwiftPolicy123"
let invalidStringLength = "Short"
let invalidStringChars = "SwiftPolicy!@#"

print("Valid string: \(validator.validate(input: validString))") // true
print("Invalid string (length): \(validator.validate(input: invalidStringLength))") // false
print("Invalid string (characters): \(validator.validate(input: invalidStringChars))") // false
```