---
title: "Command - Scala"
date: 2025-12-03T13:04:19.766-05:00
draft: false
pattern_usage: ["Command"]
language: ["Scala"]
---
The Command pattern encapsulates a request as an object, allowing for parameterization of clients with different requests, queueing or logging of requests, and support for undoable operations. This Scala example uses a functional style with traits and case classes to define the command interface and concrete commands. `Order` is the invoker, accepting and executing `OrderCommand`s.  The `Command` trait defines the `execute` method.  Idiomatic Scala is used with immutability (case classes) and leveraging functional composition to represent actions.  No mutable state is used within the commands themselves, enhancing testability and concurrency.

```scala
trait Command {
  def execute(): String
}

case class AddItemCommand(order: Order, item: String) extends Command {
  override def execute(): String = {
    order.addItem(item)
    s"Added $item to the order."
  }
}

case class RemoveItemCommand(order: Order, item: String) extends Command {
  override def execute(): String = {
    order.removeItem(item)
    s"Removed $item from the order."
  }
}

case class Order(items: List[String] = List.empty) {
  def addItem(item: String): Order = Order(item :: items)
  def removeItem(item: String): Order = Order(items.filter(_ != item))
  def listItems():String = items.mkString(", ")
}

object CommandExample {
  def main(args: Array[String]): Unit = {
    val myOrder = Order()
    val addItem1 = AddItemCommand(myOrder, "Shirt")
    val addItem2 = AddItemCommand(myOrder, "Pants")
    val removeItem = RemoveItemCommand(myOrder, "Shirt")

    println(addItem1.execute())
    println(addItem2.execute())
    println(removeItem.execute())
    println(s"Current order: ${myOrder.listItems()}")
  }
}
```