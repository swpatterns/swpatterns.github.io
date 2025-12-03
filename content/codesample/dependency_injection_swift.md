---
title: "Dependency Injection - Swift"
date: 2025-12-03T11:21:22.480-05:00
draft: false
pattern_usage: ["Dependency Injection"]
language: ["Swift"]
---
Dependency Injection (DI) is a design pattern that promotes loose coupling by providing dependencies to a class instead of the class creating them itself. This improves testability, maintainability, and reusability. Our Swift example demonstrates DI through initializer injection. The `NetworkService` protocol defines the dependency, and concrete implementations like `MockNetworkService` and `RealNetworkService` provide different behaviors. The `ViewController` doesn’t create these services; instead, it receives an instance via its initializer. This makes it easy to swap the network service with a mock for testing without altering the `ViewController`'s code. Swift's protocol-oriented programming lends itself naturally to DI, allowing us to define contracts (protocols) for dependencies and inject conforming types.

```swift
// NetworkService.swift
protocol NetworkService {
    func fetchData(completion: @escaping (String) -> Void)
}

// RealNetworkService.swift
class RealNetworkService: NetworkService {
    func fetchData(completion: @escaping (String) -> Void) {
        // Simulate network request
        DispatchQueue.global().async {
            let data = "Data from the real network!"
            completion(data)
        }
    }
}

// MockNetworkService.swift (for testing)
class MockNetworkService: NetworkService {
    var mockData: String
    
    init(mockData: String) {
        self.mockData = mockData
    }

    func fetchData(completion: @escaping (String) -> Void) {
        completion(mockData)
    }
}

// ViewController.swift
class ViewController: UIViewController {
    private let networkService: NetworkService

    init(networkService: NetworkService) {
        self.networkService = networkService
        super.init()
    }

    override func viewDidLoad() {
        super.viewDidLoad()
        networkService.fetchData { data in
            print("Received data: \(data)")
        }
    }
}

// Usage (in your app delegate or scene delegate)
// Let's use the real service in production:
let realNetworkService = RealNetworkService()
let viewController = ViewController(networkService: realNetworkService)

// For testing, inject the mock:
let mockNetworkService = MockNetworkService(mockData: "Mock Data")
let testViewController = ViewController(networkService: mockNetworkService)
```