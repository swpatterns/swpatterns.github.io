---
title: "Client-Server - Swift"
date: 2025-12-03T14:34:47.762-05:00
draft: false
pattern_usage: ["Client-Server"]
language: ["Swift"]
---
The Client-Server pattern decouples a service provider (Server) from its consumers (Clients). The Server provides resources or functionalities, and Clients request and utilize them. This enables scalability, reusability, and independent development of client and server.  Here, we simulate a simple temperature server using a `TemperatureServer` class that stores and provides the current temperature. A `TemperatureClient` requests this temperature. We use a simple protocol and a shared representation (`Double`) to define the communication. This is a very common and straightforward pattern in Swift networking applications, utilizing classes for state management and clear separation of concerns.

```swift
// TemperatureServer.swift
protocol TemperatureProvider {
    func getCurrentTemperature() -> Double
}

class TemperatureServer: TemperatureProvider {
    private var temperature: Double = 20.0

    func getCurrentTemperature() -> Double {
        return temperature
    }

    func setTemperature(newTemperature: Double) {
        temperature = newTemperature
    }
}

// TemperatureClient.swift
class TemperatureClient {
    private let server: TemperatureProvider

    init(server: TemperatureProvider) {
        self.server = server
    }

    func displayTemperature() {
        let temperature = server.getCurrentTemperature()
        print("Current temperature: \(temperature)°C")
    }
}

// Example Usage
let temperatureServer = TemperatureServer()
let temperatureClient = TemperatureClient(server: temperatureServer)

temperatureClient.displayTemperature() // Output: Current temperature: 20.0°C

temperatureServer.setTemperature(newTemperature: 25.5)
temperatureClient.displayTemperature() // Output: Current temperature: 25.5°C
```