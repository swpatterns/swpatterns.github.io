---
title: "Null Object - Kotlin"
date: 2025-12-03T13:48:03.341-05:00
draft: false
pattern_usage: ["Null Object"]
language: ["Kotlin"]
---
The Null Object pattern replaces null references with objects that have defined, default behavior. This avoids null checks throughout the code, making it more robust and readable. In this Kotlin example, we have a `Customer` class and a `RewardService`. Instead of returning null when a customer has no rewards, the `RewardService` returns a `NoRewardsCustomer` which implements the `Customer` interface but provides default (empty) reward information.  Kotlin's support for interfaces and data classes makes this pattern a natural fit. We utilize the direct return type of the interface to seamlessly substitute the null object.

```kotlin
// Customer Interface
interface Customer {
    val name: String
    val rewards: List<String>
}

// Concrete Customer Implementation
data class RegularCustomer(override val name: String, override val rewards: List<String>) : Customer

// Null Object Implementation
object NoRewardsCustomer : Customer {
    override val name: String = "No Rewards Customer"
    override val rewards: List<String> = emptyList()
}

// Reward Service
class RewardService {
    fun getCustomerRewards(customerId: Int): Customer {
        // Simulate fetching customer data.  Could be from a database.
        return if (customerId > 0) {
            RegularCustomer("Alice", listOf("Free Coffee", "10% Discount"))
        } else {
            NoRewardsCustomer
        }
    }
}

// Example Usage
fun main() {
    val service = RewardService()

    val customer1 = service.getCustomerRewards(1)
    println("${customer1.name} has rewards: ${customer1.rewards}")

    val customer2 = service.getCustomerRewards(0)
    println("${customer2.name} has rewards: ${customer2.rewards}") // No null pointer exception!
}
```