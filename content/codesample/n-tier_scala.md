---
title: "N-tier - Scala"
date: 2025-12-03T14:40:24.600-05:00
draft: false
pattern_usage: ["N-tier"]
language: ["Scala"]
---
The N-tier pattern organizes an application into distinct layers, each with a specific responsibility. This separation improves maintainability, testability, and scalability. A typical N-tier architecture includes a Presentation Tier (UI), a Business Logic Tier (core application logic), and a Data Access Tier (database interaction).  This Scala example demonstrates a simplified 3-tier structure.  We use case classes for data representation, traits to define interfaces between tiers, and concrete implementations for each tier.  This approach leverages Scala's functional programming strengths for clear separation of concerns and immutability where appropriate, fitting the language's emphasis on concise and expressive code.

```scala
// Domain Model (Data Tier - conceptually part of the Business Tier)
case class Product(id: Int, name: String, price: Double)

// Data Access Tier
trait ProductRepository {
  def getProductById(id: Int): Option[Product]
}

class InMemoryProductRepository extends ProductRepository {
  private val products = Seq(
    Product(1, "Laptop", 1200.0),
    Product(2, "Mouse", 25.0),
    Product(3, "Keyboard", 75.0)
  )

  override def getProductById(id: Int): Option[Product] = products.find(_.id == id)
}

// Business Logic Tier
trait ProductService {
  def getProductDetails(id: Int): Option[Product]
}

class DefaultProductService(repository: ProductRepository) extends ProductService {
  override def getProductDetails(id: Int): Option[Product] = repository.getProductById(id)
}

// Presentation Tier
object Main {
  def main(args: Array[String]): Unit = {
    val repository = new InMemoryProductRepository()
    val service = new DefaultProductService(repository)

    val productId = 1
    val product = service.getProductDetails(productId)

    product match {
      case Some(p) => println(s"Product ID: ${p.id}, Name: ${p.name}, Price: ${p.price}")
      case None => println(s"Product with ID $productId not found.")
    }
  }
}
```