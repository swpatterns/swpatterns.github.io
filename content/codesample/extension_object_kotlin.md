---
title: "Extension Object - Kotlin"
date: 2025-12-03T12:54:06.232-05:00
draft: false
pattern_usage: ["Extension Object"]
language: ["Kotlin"]
---
The Extension Object pattern allows you to add new behavior to an existing class without modifying its source code, using a separate "extension" object. This is achieved by having the extension object hold an instance of the original class and delegate method calls to it, potentially adding pre- or post-processing logic. It's a form of delegation and promotes the Open/Closed Principle.

In Kotlin, this is elegantly implemented using delegation via the `by` keyword. The extension object implements the same interface as the original class, then delegates all calls to the wrapped instance. This provides a clean and concise way to extend functionality without inheritance or modification of the original class. The example demonstrates extending the `String` class to provide a method for counting vowels, without altering the `String` class itself.

```kotlin
// Original class (no modification allowed)
class StringProcessor(private val str: String) {
    fun process(): String {
        return str.uppercase()
    }
}

// Extension Object
class VowelCounterExtension(private val stringProcessor: StringProcessor) : StringProcessor by stringProcessor {
    fun countVowels(): Int {
        val vowels = "AEIOUaeiou".toRegex()
        return stringProcessor.process().count { vowels.contains(it) }
    }
}

// Usage
fun main() {
    val original = StringProcessor("Hello World")
    val extended = VowelCounterExtension(original)

    println(original.process()) // Output: HELLO WORLD
    println(extended.countVowels()) // Output: 3
    println(extended.process()) //Delegated call to original class
}
```