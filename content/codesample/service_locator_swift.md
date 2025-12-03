---
title: "Service Locator - Swift"
date: 2025-12-03T11:25:08.940-05:00
draft: false
pattern_usage: ["Service Locator"]
language: ["Swift"]
---
The Service Locator pattern provides a centralized way to access services within an application. Instead of a component directly creating or locating its dependencies, it asks a "locator" for them. This promotes loose coupling, makes testing easier by allowing dependency injection through the locator, and simplifies management of complex dependencies. The Swift implementation uses a static `shared` instance to act as the central registry. Services are registered using a dictionary keyed by a designated type. The code demonstrates registration of a `Logger` service and its subsequent retrieval in a `ViewController`. This approach aligns well with Swift's reliance on dependency injection and ease of use of dictionaries.

```swift
// ServiceLocator.swift

protocol Service { }

final class ServiceLocator {
    static let shared = ServiceLocator()

    private init() {}

    private var services: [Type: Any] = [:]

    func register<T: Service>(service: T) {
        services[T.self] = service
    }

    func resolve<T: Service>() -> T? {
        return services[T.self] as? T
    }
}

// LoggerService.swift

protocol Logger: Service {
    func log(message: String)
}

class DefaultLogger: Logger {
    func log(message: String) {
        print("LOG: \(message)")
    }
}

// ViewController.swift

class MyViewController: UIViewController {
    let logger: Logger? = ServiceLocator.shared.resolve()

    override func viewDidLoad() {
        super.viewDidLoad()
        logger?.log(message: "View controller loaded.")
    }
}

// Usage (e.g., in your app delegate or main setup)
func setupServices() {
    ServiceLocator.shared.register(service: DefaultLogger())
}

setupServices()
// Example of using the view controller:
let viewController = MyViewController()
viewController.view.backgroundColor = .white
viewController.title = "Service Locator Demo"
```