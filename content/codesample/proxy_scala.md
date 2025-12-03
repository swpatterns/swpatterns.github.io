---
title: "Proxy - Scala"
date: 2025-12-03T12:48:38.270-05:00
draft: false
pattern_usage: ["Proxy"]
language: ["Scala"]
---
The Proxy pattern provides a surrogate or placeholder for another object to control access to it. This is useful for scenarios like remote access, security checks, or lazy initialization.  Here, we have a `RealImage` that's expensive to create. The `ImageProxy` acts as a stand-in, only loading the `RealImage` when `display()` is called. This delays the potentially costly operation until it's actually needed. The Scala implementation leverages immutability and the `lazy val` keyword for efficient lazy initialization, fitting the functional style often preferred in Scala. The `display` method is the key interaction point, triggering the real image loading if it hasn't happened yet.

```scala
trait Image {
  def display(): Unit
}

class RealImage(private val filename: String) extends Image {
  println(s"Loading image from $filename...")
  Thread.sleep(2000) // Simulate a long loading time
  def display(): Unit = println(s"Displaying image from $filename.")
}

class ImageProxy(private val filename: String) extends Image {
  private val realImage: RealImage = new RealImage(filename) // Create the real image only when needed

  def display(): Unit = {
    realImage.display()
  }
}

object ProxyExample {
  def main(args: Array[String]): Unit = {
    val imageProxy = new ImageProxy("high_resolution_image.jpg")
    imageProxy.display() // This will trigger the loading of the RealImage
    imageProxy.display() // Subsequent calls will use the already loaded image
  }
}
```