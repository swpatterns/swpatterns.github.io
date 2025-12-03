---
title: "Bridge - Kotlin"
date: 2025-12-03T11:32:31.573-05:00
draft: false
pattern_usage: ["Bridge"]
language: ["Kotlin"]
---
The Bridge pattern is a structural design pattern that lets you split one or several interfaces from their implementation(s), allowing you to vary them independently. It's beneficial when you have a class that can be configured with different abstractions or implementations without causing tight coupling.

This Kotlin example implements a Bridge with a `Device` interface (the abstraction) and concrete `RemoteControl` and `DirectControl` implementing it. A `PowerSupply` interface represents the implementation, with `Battery` and `ACAdapter` as concrete implementations. The `DeviceImpl` class bridges the `Device` and `PowerSupply` interfaces, allowing different device control methods to work with different power sources without modification. This leverages Kotlin's interface and class features for a clean, decoupled design, fitting its emphasis on conciseness and readability.

```kotlin
// Abstraction
interface Device {
    fun control(): String
    fun setPowerSupply(powerSupply: PowerSupply)
}

// Refined Abstraction
class RemoteControl(private var powerSupply: PowerSupply) : Device {
    override fun control(): String = "Remote Control: ${powerSupply.powerOn()}"
    override fun setPowerSupply(powerSupply: PowerSupply) {
        this.powerSupply = powerSupply
    }
}

class DirectControl(private var powerSupply: PowerSupply) : Device {
    override fun control(): String = "Direct Control: ${powerSupply.powerOn()}"
    override fun setPowerSupply(powerSupply: PowerSupply) {
        this.powerSupply = powerSupply
    }
}

// Implementation
interface PowerSupply {
    fun powerOn(): String
}

// Concrete Implementations
class Battery : PowerSupply {
    override fun powerOn(): String = "Powered by Battery"
}

class ACAdapter : PowerSupply {
    override fun powerOn(): String = "Powered by AC Adapter"
}

// Bridge
class DeviceImpl(device: Device) {
    private var device: Device

    init {
        this.device = device
    }

    fun operate(): String {
        return device.control()
    }
}

fun main() {
    val battery = Battery()
    val acAdapter = ACAdapter()

    val remoteControl = RemoteControl(battery)
    val directControl = DirectControl(acAdapter)

    val remoteDevice = DeviceImpl(remoteControl)
    val directDevice = DeviceImpl(directControl)

    println(remoteDevice.operate()) // Output: Remote Control: Powered by Battery
    remoteControl.setPowerSupply(acAdapter)
    println(remoteDevice.operate()) // Output: Remote Control: Powered by AC Adapter

    println(directDevice.operate()) // Output: Direct Control: Powered by AC Adapter
}
```