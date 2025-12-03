---
title: "Iterator - C++"
date: 2025-12-03T13:11:09.468-05:00
draft: false
pattern_usage: ["Iterator"]
language: ["C++"]
---
The Iterator pattern provides a way to access elements of an aggregate object sequentially without exposing its underlying representation. It defines an interface for traversing a collection, allowing clients to request the next element and check if there are more elements, without knowing anything about how the collection is stored. This code showcases a `ConcreteAggregate` (a vector) and a `ConcreteIterator` to traverse it. The iterator provides `hasNext()` and `next()` methods. This C++ implementation leverages the Standard Template Library (STL) concepts and adheres to RAII principles by implicitly managing iterator lifecycle, characteristic of idiomatic C++ design.

```cpp
#include <iostream>
#include <vector>

// Forward declaration
class Iterator;

// Aggregate interface
class Aggregate {
public:
    virtual Iterator* createIterator() = 0;
};

// Iterator interface
class Iterator {
public:
    virtual bool hasNext() = 0;
    virtual int next() = 0;
};

// Concrete Aggregate
class ConcreteAggregate : public Aggregate {
private:
    std::vector<int> data;

public:
    void setData(const std::vector<int>& data) { this->data = data; }

    Iterator* createIterator() override;
};

// Concrete Iterator
class ConcreteIterator : public Iterator {
private:
    ConcreteAggregate* aggregate;
    int current_index;

public:
    ConcreteIterator(ConcreteAggregate* aggregate) : aggregate(aggregate), current_index(0) {}

    bool hasNext() override {
        return current_index < aggregate->data.size();
    }

    int next() override {
        if (hasNext()) {
            return aggregate->data[current_index++];
        } else {
            return -1; // Or throw an exception
        }
    }
};

Iterator* ConcreteAggregate::createIterator() {
    return new ConcreteIterator(this);
}

int main() {
    ConcreteAggregate concrete_aggregate;
    std::vector<int> my_data = {1, 2, 3, 4, 5};
    concrete_aggregate.setData(my_data);

    Iterator* iterator = concrete_aggregate.createIterator();

    while (iterator->hasNext()) {
        std::cout << iterator->next() << " ";
    }
    std::cout << std::endl;

    delete iterator; // Important for manual memory management
    return 0;
}
```