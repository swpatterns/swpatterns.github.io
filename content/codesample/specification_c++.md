---
title: "Specification - C++"
date: 2025-12-03T13:51:30.263-05:00
draft: false
pattern_usage: ["Specification"]
language: ["C++"]
---
The Specification pattern is a functional approach to defining and validating complex conditions or constraints on objects. Instead of embedding these conditions directly within the object's methods, it encapsulates them in separate, reusable specification objects. These specifications can then be combined using logical operators (AND, OR, NOT) to create even more complex rules.

This C++ implementation uses function objects (functors) to represent specifications. Each specification is a class with an overloaded `operator()`, which takes the object to be tested and returns a boolean.  The `AndSpec`, `OrSpec`, and `NotSpec` classes combine specifications using logical operations. This approach is idiomatic C++ as it leverages function objects for flexible and composable behavior, avoiding inheritance-heavy solutions often seen in other languages.  The example demonstrates specifying criteria for a `Person` object based on age and name.

```cpp
#include <iostream>
#include <string>
#include <functional>

class Person {
public:
    Person(const std::string& name, int age) : name_(name), age_(age) {}

    const std::string& getName() const { return name_; }
    int getAge() const { return age_; }

private:
    std::string name_;
    int age_;
};

// Specification base class (using std::function for flexibility)
class Specification {
public:
    virtual bool satisfiedBy(const Person& person) const = 0;
};

// Concrete specification: Age is greater than a threshold
class AgeSpecification : public Specification {
public:
    AgeSpecification(int age) : age_(age) {}

    bool satisfiedBy(const Person& person) const override {
        return person.getAge() > age_;
    }

private:
    int age_;
};

// Concrete specification: Name contains a substring
class NameSpecification : public Specification {
public:
    NameSpecification(const std::string& substring) : substring_(substring) {}

    bool satisfiedBy(const Person& person) const override {
        return person.getName().find(substring_) != std::string::npos;
    }

private:
    std::string substring_;
};

// Composite specification: AND
class AndSpec : public Specification {
public:
    AndSpec(const Specification& spec1, const Specification& spec2) : spec1_(spec1), spec2_(spec2) {}

    bool satisfiedBy(const Person& person) const override {
        return spec1_.satisfiedBy(person) && spec2_.satisfiedBy(person);
    }

private:
    const Specification& spec1_;
    const Specification& spec2_;
};

// Composite specification: OR
class OrSpec : public Specification {
public:
    OrSpec(const Specification& spec1, const Specification& spec2) : spec1_(spec1), spec2_(spec2) {}

    bool satisfiedBy(const Person& person) const override {
        return spec1_.satisfiedBy(person) || spec2_.satisfiedBy(person);
    }

private:
    const Specification& spec1_;
    const Specification& spec2_;
};

// Composite specification: NOT
class NotSpec : public Specification {
public:
    NotSpec(const Specification& spec) : spec_(spec) {}

    bool satisfiedBy(const Person& person) const override {
        return !spec_.satisfiedBy(person);
    }

private:
    const Specification& spec_;
};

int main() {
    Person person1("Alice Smith", 30);
    Person person2("Bob Johnson", 25);
    Person person3("Charlie Brown", 18);

    AgeSpecification ageSpec(28);
    NameSpecification nameSpec("Smith");

    AndSpec combinedSpec(ageSpec, nameSpec);

    std::cout << "Person 1 satisfies combined spec: " << combinedSpec.satisfiedBy(person1) << std::endl;
    std::cout << "Person 2 satisfies combined spec: " << combinedSpec.satisfiedBy(person2) << std::endl;
    std::cout << "Person 3 satisfies combined spec: " << combinedSpec.satisfiedBy(person3) << std::endl;

    return 0;
}
```