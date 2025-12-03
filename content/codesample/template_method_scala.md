---
title: "Template Method - Scala"
date: 2025-12-03T13:40:16.133-05:00
draft: false
pattern_usage: ["Template Method"]
language: ["Scala"]
---
The Template Method pattern defines the skeleton of an algorithm in a base class, deferring some steps to subclasses. It allows subclasses to redefine certain steps of an algorithm without changing the algorithm's structure. This promotes code reuse and reduces redundancy.

The Scala code defines an abstract `Game` class with a `play()` method representing the template. `play()` defines the overall game flow (initialize, run, result) and calls abstract methods like `makeMove()` and `isGameOver()` which are implemented by concrete game subclasses (`Chess`, `Monopoly`).  This leverages Scala's abstract classes and methods for a clean and type-safe implementation. The use of `override` is standard Scala practice for subclassing.

```scala
// Template Method Pattern in Scala

abstract class Game {
  abstract def makeMove(player: String): String
  abstract def isGameOver(): Boolean
  abstract def getResult(player: String): String

  def play(): Unit = {
    println("Game Initialized")
    var currentPlayer = "Player 1"
    while (!isGameOver()) {
      println(s"$currentPlayer's turn")
      val moveResult = makeMove(currentPlayer)
      println(moveResult)
      currentPlayer = if (currentPlayer == "Player 1") "Player 2" else "Player 1"
    }
    println("Game Over")
    println(getResult(currentPlayer))
  }
}

class Chess extends Game {
  override def makeMove(player: String): String = {
    s"${player} made a chess move."
  }

  override def isGameOver(): Boolean = {
    // Simplified game over condition for demonstration
    scala.util.Random.nextBoolean()
  }

  override def getResult(player: String): String = {
    s"${player} wins the chess game!"
  }
}

class Monopoly extends Game {
  override def makeMove(player: String): String = {
    s"${player} rolled the dice and moved."
  }

  override def isGameOver(): Boolean = {
    // Simplified game over condition for demonstration
    scala.util.Random.nextBoolean()
  }

  override def getResult(player: String): String = {
    s"${player} bankrupts everyone and wins Monopoly!"
  }
}

object Main {
  def main(args: Array[String]): Unit = {
    val chessGame = new Chess()
    println("Playing Chess:")
    chessGame.play()

    val monopolyGame = new Monopoly()
    println("\nPlaying Monopoly:")
    monopolyGame.play()
  }
}
```