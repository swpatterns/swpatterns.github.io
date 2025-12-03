---
title: "Self-contained Systems - Scala"
date: 2025-12-03T14:31:14.229-05:00
draft: false
pattern_usage: ["Self-contained Systems"]
language: ["Scala"]
---
The Self-Contained System pattern aims to reduce dependencies by bundling all resources a component needs (configuration, data, etc.) within the component itself. This promotes portability, testability, and isolation. My Scala example demonstrates this by encapsulating the data and logic for a basic user profile within a `UserProfile` object, including a default configuration.  Configuration is handled via a companion object for easy access and modification. No external configuration files or database connections are required—everything needed is available directly within the `UserProfile` itself. This is idiomatic Scala due to the strong emphasis on immutability with `case class` and the use of objects for singletons and associated data.

```scala
// UserProfile.scala
object UserProfile {
  // Default configuration – fully contained within the system
  case class Config(defaultName: String = "Anonymous", maxDisplayNameLength: Int = 30)

  val defaultConfig = Config()

  def apply(userId: Int, config: Config = defaultConfig): UserProfile = {
    new UserProfile(userId, config)
  }
}

case class UserProfile(userId: Int, config: UserProfile.Config) {
  private var _name: String = config.defaultName

  def name: String = _name

  def setName(newName: String): Unit = {
    val trimmedName = newName.take(config.maxDisplayNameLength)
    _name = trimmedName
  }

  override def toString: String = s"User ID: $userId, Name: $name"
}

object Main extends App {
  val user1 = UserProfile(1) // Uses default config
  println(user1)

  val customConfig = UserProfile.Config(defaultName = "Guest", maxDisplayNameLength = 15)
  val user2 = UserProfile(2, customConfig)
  user2.setName("Very Long Display Name")
  println(user2)
}
```