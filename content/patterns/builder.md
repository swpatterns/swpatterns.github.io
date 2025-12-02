
---
title: Builder
date: 2024-02-29T16:23:00-00:00
draft: false
pattern_types: ["creational", "goF"]
wikipedia: "https://en.wikipedia.org/wiki/Builder_pattern"
diagramtype: "class"
diagram: "[Client] --|> [Builder] : builds() \n[Director] --|> [Builder] : construct()\n[Builder] --|> [ComplexObject] : creates\n[ComplexObject] ..> [PartA]: has many\n[ComplexObject] ..> [PartB]: has many\n[ComplexObject] ..> [PartC]: has many"
code: true
---

The Builder pattern is a creational design pattern that lets you construct complex objects step by step. The pattern allows separation of the construction of a complex object from its representation, so that the same construction process can create different representations. It's particularly useful when dealing with objects that have a large number of optional parameters or configurations.

Instead of returning a fully-formed object directly, the Builder provides an API for incrementally building the object. A Director class often orchestrates this process, guiding the Builder through the necessary steps. This approach improves code readability, reduces complexity, and promotes flexibility in object creation.

## Usage

The Builder pattern is commonly used in scenarios where:

*   The construction of an object requires many steps, and these steps can vary.
*   You want to avoid a telescoping constructor (a constructor with a large number of parameters).
*   You need to create different representations of an object using the same construction process.
*   The object's internal state is complex and needs to be set in a controlled manner.
*   When dealing with immutable objects, as the builder allows for setting all properties before the final object is created.

## Examples

1.  **Java's `StringBuilder`:** The `StringBuilder` class in Java is a classic example of the Builder pattern. It allows you to efficiently build strings by appending characters or substrings in a step-by-step manner, avoiding the creation of intermediate string objects that would occur with repeated string concatenation using the `+` operator.

    java
    StringBuilder builder = new StringBuilder();
    builder.append("Hello");
    builder.append(", ");
    builder.append("world!");
    String result = builder.toString(); // "Hello, world!"
    

2.  **Python's `SQLAlchemy` ORM:**  The `SQLAlchemy` library uses the Builder pattern extensively in its query construction. You don't build a complete SQL query string directly; instead, you use a fluent interface to add conditions, select columns, and define relationships step by step.  The `SQLAlchemy` engine then translates this builder object into the final SQL query.

    python
    from sqlalchemy import create_engine, Column, Integer, String
    from sqlalchemy.orm import sessionmaker

    engine = create_engine('sqlite:///:memory:')
    Base = sqlalchemy.orm.declarative_base()

    class User(Base):
        __tablename__ = 'users'
        id = Column(Integer, primary_key=True)
        name = Column(String)

    Base.metadata.create_all(engine)
    Session = sessionmaker(bind=engine)
    session = Session()

    # Builder pattern in action
    query = session.query(User).filter(User.name == 'John')
    result = query.all()
    