---
title: "Specification - Java"
date: 2025-12-03T13:49:40.434-05:00
draft: false
pattern_usage: ["Specification"]
language: ["Java"]
---
The Specification pattern is a functional construct that encapsulates business logic into boolean expressions. It allows you to define a complex selection criteria in a declarative way, separating the "what" from the "how" of the selection. This promotes reusability and composability of rules.

The Java implementation uses an interface `Specification` defining a `test()` method for evaluating a condition. Concrete specifications implement this interface, and can be combined using `and()`, `or()`, and `not()` methods to create more complex criteria. The example demonstrates filtering a list of `Person` objects based on age and name, showcasing how specifications can be chained and reused. This approach aligns with Java's functional interfaces and promotes a more readable and maintainable codebase compared to deeply nested `if` statements.

```java
import java.util.List;
import java.util.stream.Collectors;

interface Specification<T> {
    boolean test(T t);

    default Specification<T> and(Specification<T> other) {
        return t -> test(t) && other.test(t);
    }

    default Specification<T> or(Specification<T> other) {
        return t -> test(t) || other.test(t);
    }

    default Specification<T> not() {
        return t -> !test(t);
    }
}

class AgeSpecification implements Specification<Person> {
    private final int age;

    public AgeSpecification(int age) {
        this.age = age;
    }

    @Override
    public boolean test(Person person) {
        return person.getAge() >= age;
    }
}

class NameSpecification implements Specification<Person> {
    private final String name;

    public NameSpecification(String name) {
        this.name = name;
    }

    @Override
    public boolean test(Person person) {
        return person.getName().contains(name);
    }
}

class Person {
    private final String name;
    private final int age;

    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }

    public String getName() {
        return name;
    }

    public int getAge() {
        return age;
    }

    @Override
    public String toString() {
        return "Person{" +
                "name='" + name + '\'' +
                ", age=" + age +
                '}';
    }
}

public class SpecificationExample {
    public static void main(String[] args) {
        List<Person> people = List.of(
                new Person("Alice", 30),
                new Person("Bob", 25),
                new Person("Charlie", 35),
                new Person("David", 20)
        );

        Specification<Person> youngAndNamed = new AgeSpecification(25)
                .and(new NameSpecification("a"));

        List<Person> filteredPeople = people.stream()
                .filter(youngAndNamed::test)
                .collect(Collectors.toList());

        System.out.println(filteredPeople);
    }
}
```