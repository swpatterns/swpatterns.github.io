---
title: "Chain of Responsibility - Swift"
date: 2025-12-03T12:58:40.140-05:00
draft: false
pattern_usage: ["Chain of Responsibility"]
language: ["Swift"]
---
The Chain of Responsibility pattern is a behavioral design pattern that allows you to pass a request along a chain of handlers. Each handler decides either to process the request or to pass it to the next handler in the chain. This allows you to avoid coupling the sender of a request to its receiver, giving multiple objects a chance to handle the request without explicitly knowing who’s next in line.

The Swift example uses a protocol `SupportRequest` to define the interface for requests. Concrete handlers (`EmailSupport`, `TicketSupport`, `ManagerSupport`) conform to this protocol and either resolve the request or pass it on. A `Chain` class manages the linked handlers. This implementation utilizes Swift's protocol-oriented programming approach and optionals for chaining, making it clean and self-documenting, aligning with Swift’s focus on safety and readability.

```swift
// Define the request interface
protocol SupportRequest {
    var severity: Int { get }
    var message: String { get }
}

// Concrete handlers
class EmailSupport: SupportRequest {
    let severity = 1
    let message: String

    init(message: String) {
        self.message = message
    }

    func handle() -> String? {
        if severity == 1 {
            return "Email Support: Handling - \(message)"
        }
        return nil
    }
}

class TicketSupport: SupportRequest {
    let severity = 2
    let message: String

    init(message: String) {
        self.message = message
    }

    func handle() -> String? {
        if severity == 2 {
            return "Ticket Support: Handling - \(message)"
        }
        return nil
    }
}

class ManagerSupport: SupportRequest {
    let severity = 3
    let message: String

    init(message: String) {
        self.message = message
    }

    func handle() -> String? {
        if severity == 3 {
            return "Manager Support: Handling - \(message)"
        }
        return nil
    }
}

// The Chain
class Chain {
    private var handlers: [SupportRequest] = []

    func addHandler(handler: SupportRequest) {
        handlers.append(handler)
    }

    func handleRequest(request: SupportRequest) -> String? {
        for handler in handlers {
            if let result = handler.handle() {
                return result
            }
        }
        return nil
    }
}

// Client code
let chain = Chain()
chain.addHandler(handler: EmailSupport(message: "Email issue"))
chain.addHandler(handler: TicketSupport(message: "Ticket creation problem"))
chain.addHandler(handler: ManagerSupport(message: "Critical system outage"))

let request1 = EmailSupport(message: "Password reset")
let request2 = TicketSupport(message: "Can't access feature X")
let request3 = ManagerSupport(message: "Server is down!")

if let result1 = chain.handleRequest(request: request1) {
    print(result1)
}

if let result2 = chain.handleRequest(request: request2) {
    print(result2)
}

if let result3 = chain.handleRequest(request: request3) {
    print(result3)
}
```