---
title: "Mediator - Kotlin"
date: 2025-12-03T13:16:38.205-05:00
draft: false
pattern_usage: ["Mediator"]
language: ["Kotlin"]
---
The Mediator pattern defines an object that encapsulates how a set of objects interact. It promotes loose coupling by preventing objects from referring to each other explicitly, and instead letting them communicate through the mediator. This reduces dependencies and increases reusability.

This Kotlin example models a chat room. `ChatRoom` is the Mediator, managing communication between `Participant` objects. Participants don’t know each other directly; they only know the `ChatRoom`.  `ChatRoom` receives messages from Participants and broadcasts them to all others. The use of interfaces and function types aligns well with Kotlin’s functional and concise style, making the interactions clean and easy to understand.  Data classes enhance readability for participant information.

```kotlin
// Mediator Interface
interface ChatMediator {
    fun sendMessage(message: String, participant: Participant)
}

// Concrete Mediator
class ChatRoom : ChatMediator {
    private val participants = mutableListOf<Participant>()

    fun addParticipant(participant: Participant) {
        participants.add(participant)
    }

    override fun sendMessage(message: String, participant: Participant) {
        participants.forEach {
            if (it != participant) {
                it.receive(message)
            }
        }
    }
}

// Colleague Interface
interface Participant {
    fun send(message: String)
    fun receive(message: String)
}

// Concrete Colleague
data class User(val name: String, private val mediator: ChatMediator) : Participant {
    override fun send(message: String) {
        println("$name: $message")
        mediator.sendMessage(message, this)
    }

    override fun receive(message: String) {
        println("$name received: $message")
    }
}

// Example Usage
fun main() {
    val chatRoom = ChatRoom()

    val user1 = User("Alice", chatRoom)
    val user2 = User("Bob", chatRoom)
    val user3 = User("Charlie", chatRoom)

    chatRoom.addParticipant(user1)
    chatRoom.addParticipant(user2)
    chatRoom.addParticipant(user3)

    user1.send("Hello everyone!")
    user2.send("Hi Alice, good to see you!")
    user3.send("Hey guys!")
}
```