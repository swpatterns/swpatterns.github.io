---
title: "Proxy - Kotlin"
date: 2025-12-03T12:47:43.528-05:00
draft: false
pattern_usage: ["Proxy"]
language: ["Kotlin"]
---
The Proxy pattern provides a surrogate or placeholder for another object to control access to it. It’s useful for adding functionality like access control, lazy initialization, or logging without modifying the original object. This Kotlin example uses an interface for the real subject (`RealImage`) and a proxy (`ImageProxy`) that handles loading the image only when it's needed. The proxy also includes a simple access control mechanism (checking if the user is authorized). This implementation leverages Kotlin's concise syntax, interface delegation, and the `lazy` keyword for efficient resource handling, fitting well with the language's functional and object-oriented capabilities.

```kotlin
// Subject interface
interface Image {
    fun display()
}

// Real Subject
class RealImage(private val filename: String) : Image {
    override fun display() {
        println("Displaying $filename")
    }
}

// Proxy
class ImageProxy(private val filename: String, private val user: String) : Image {
    private var realImage: RealImage? = null

    override fun display() {
        if (user == "admin") {
            if (realImage == null) {
                realImage = RealImage(filename)
            }
            realImage?.display()
        } else {
            println("Access denied for user $user")
        }
    }
}

// Client
fun main() {
    val image1 = ImageProxy("image1.jpg", "admin")
    val image2 = ImageProxy("image2.jpg", "guest")

    image1.display() // Displays image1.jpg
    image2.display() // Access denied
    image1.display() // Displays image1.jpg (already loaded)
}
```