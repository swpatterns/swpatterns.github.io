---
title: "Extension Object - Scala"
date: 2025-12-03T12:54:54.321-05:00
draft: false
pattern_usage: ["Extension Object"]
language: ["Scala"]
---
The Extension Object pattern adds functionality to an existing class without using inheritance or modifying the original class. It achieves this by defining a separate class that contains extension methods, which are methods that operate on instances of the target class. These methods are typically defined as implicit conversions, allowing them to be called as if they were members of the original class. This is particularly useful in Scala for adding domain-specific language (DSL) features or enriching core classes without altering their original definition.

```scala
// Original class
class StringExtensions(val str: String) {
  def isPalindrome: Boolean = {
    str.toLowerCase == str.toLowerCase.reverse
  }

  def countVowels: Int = {
    str.toLowerCase.count(c => "aeiou".contains(c))
  }
}

// Extension Object (Implicit Conversions)
object StringExtensions {
  implicit def extendString(s: String): StringExtensions = new StringExtensions(s)
}

// Usage
object Main extends App {
  val myString = "Racecar"
  import StringExtensions._ // Import the implicit conversions

  println(s"$myString is palindrome: ${myString.isPalindrome}")
  println(s"$myString has ${myString.countVowels} vowels")

  val anotherString = "Hello"
  println(s"$anotherString is palindrome: ${anotherString.isPalindrome}")
  println(s"$anotherString has ${anotherString.countVowels} vowels")
}
```