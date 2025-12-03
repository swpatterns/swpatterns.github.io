---
title: "Adapter - Scala"
date: 2025-12-03T11:29:30.546-05:00
draft: false
pattern_usage: ["Adapter"]
language: ["Scala"]
---
The Adapter pattern converts the interface of a class into another interface clients expect. This enables classes with incompatible interfaces to collaborate. Here, we adapt a `CelsiusTemperature` class to provide temperature information in Fahrenheit, which is the expected format for a `WeatherReport` system. We achieve this with a `CelsiusToFahrenheitAdapter` that implements the `FahrenheitTemperature` trait but internally uses the `CelsiusTemperature` class. This implementation utilizes Scala's trait-based approach for defining interfaces and leverages implicit conversions for seamless integration, common practices in Scala development.

```scala
// Interface for Fahrenheit temperature
trait FahrenheitTemperature {
  def getTemperature: Double
}

// Class representing Celsius temperature
class CelsiusTemperature(private val celsius: Double) {
  def getCelsius: Double = celsius
}

// Adapter to convert Celsius to Fahrenheit
class CelsiusToFahrenheitAdapter(celsiusTemp: CelsiusTemperature) extends FahrenheitTemperature {
  override def getTemperature: Double = (celsiusTemp.getCelsius * 9 / 5) + 32
}

// Client code - Weather Report system expects Fahrenheit
class WeatherReport(temp: FahrenheitTemperature) {
  def report(): String = s"The temperature is ${temp.getTemperature}°F"
}

// Example usage
object Main {
  def main(args: Array[String]): Unit = {
    val celsiusTemperature = new CelsiusTemperature(25.0)
    val fahrenheitAdapter = new CelsiusToFahrenheitAdapter(celsiusTemperature)
    val weatherReport = new WeatherReport(fahrenheitAdapter)
    println(weatherReport.report()) // Output: The temperature is 77.0°F
  }
}
```