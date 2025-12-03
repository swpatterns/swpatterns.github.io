---
title: "Builder - C"
date: 2025-12-03T10:54:09.407-05:00
draft: false
pattern_usage: ["Builder"]
language: ["C"]
---
The Builder pattern is a creational design pattern that lets you construct complex objects step by step. The pattern allows for the separation of construction from representation, making it suitable when creating an object requires many optional parameters or complex initialization logic. This implementation uses a `struct` to represent the object being built and a builder `struct` with methods to set individual parts. A `build()` method in the builder then finalizes the object creation. This approach is idiomatic C as it leverages structs for data aggregation and function pointers (implicitly through method calls) to manage the construction process, avoiding the complexities of C++ classes while achieving similar design goals.

```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

// Product
typedef struct {
    char* name;
    int age;
    char* occupation;
    int years_experience;
} Person;

// Builder
typedef struct {
    Person person;
} PersonBuilder;

// Builder methods
PersonBuilder* person_builder_create() {
    PersonBuilder* builder = (PersonBuilder*)malloc(sizeof(PersonBuilder));
    if (!builder) {
        perror("Failed to allocate memory for PersonBuilder");
        exit(EXIT_FAILURE);
    }
    return builder;
}

PersonBuilder* person_builder_set_name(PersonBuilder* builder, const char* name) {
    builder->person.name = strdup(name);
    return builder;
}

PersonBuilder* person_builder_set_age(PersonBuilder* builder, int age) {
    builder->person.age = age;
    return builder;
}

PersonBuilder* person_builder_set_occupation(PersonBuilder* builder, const char* occupation) {
    builder->person.occupation = strdup(occupation);
    return builder;
}

PersonBuilder* person_builder_set_years_experience(PersonBuilder* builder, int years_experience) {
    builder->person.years_experience = years_experience;
    return builder;
}

// Build method
Person* person_builder_build(PersonBuilder* builder) {
    Person* person = (Person*)malloc(sizeof(Person));
    if (!person) {
        perror("Failed to allocate memory for Person");
        exit(EXIT_FAILURE);
    }
    *person = builder->person; // Copy the built person
    return person;
}

void person_print(const Person* person) {
    printf("Name: %s\n", person->name);
    printf("Age: %d\n", person->age);
    printf("Occupation: %s\n", person->occupation);
    printf("Years of Experience: %d\n", person->years_experience);
}

int main() {
    PersonBuilder* builder = person_builder_create();

    Person* person1 = person_builder_set_name(builder, "Alice")
                         ->person_builder_set_age(builder, 30)
                         ->person_builder_set_occupation(builder, "Engineer")
                         ->person_builder_build();

    Person* person2 = person_builder_set_name(builder, "Bob")
                         ->person_builder_set_age(builder, 25)
                         ->person_builder_build();

    person_print(person1);
    person_print(person2);

    free(person1->name);
    free(person1->occupation);
    free(person1);
    free(person2->name);
    free(person2);
    free(builder);

    return 0;
}
```