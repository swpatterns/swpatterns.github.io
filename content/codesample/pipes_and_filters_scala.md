---
title: "Pipes and Filters - Scala"
date: 2025-12-03T15:22:20.502-05:00
draft: false
pattern_usage: ["Pipes and Filters"]
language: ["Scala"]
---
The Pipes and Filters pattern is a design pattern where a series of processing components ("filters") are arranged in a sequence. Each filter receives data from a "pipe" (usually a simple data stream or collection), performs a specific transformation on it, and passes the result to the next filter through another pipe. This promotes modularity, reusability, and simplifies complex tasks by breaking them down into smaller, manageable stages.

The Scala code below implements a simple word count pipeline. `Source` provides the initial data. `Filter` transforms data based on a predicate. `Map` applies a function to produce transformed data. `Reduce` aggregates the data. `Sink` consumes the final result. Using Scala collections and functional composition (e.g., `filter`, `map`, `reduce`) provides a naturally idiomatic and concise implementation of this pattern.  The pipelines are chained using the `|>` operator (pipe operator), enhancing readability.

```scala
// PipesAndFilters.scala
object PipesAndFilters {

  // Define a simple filter trait
  trait Filter[T, U] {
    def apply(data: T): U
  }

  // A source of data
  val source = "This is a test. This is only a test."

  // Define filters
  val splitWords: Filter[String, Array[String]] = (text: String) => text.split("\\s+").map(_.toLowerCase)
  val filterShortWords: Filter[Array[String], Array[String]] = (words: Array[String]) => words.filter(_.length > 2)
  val countWords: Filter[Array[String], Map[String, Int]] = (words: Array[String]) =>
    words.groupBy(identity).mapValues(_.length)

  // The pipeline
  val result: Map[String, Int] = source
    .split("\\s+")
    .map(_.toLowerCase)
    .filter(_.length > 2)
    .groupBy(identity)
    .mapValues(_.length)

    def main(args: Array[String]): Unit = {
      println(result)
    }
}
```