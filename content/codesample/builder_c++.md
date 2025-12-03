---
title: "Builder - C++"
date: 2025-12-03T10:53:50.588-05:00
draft: false
pattern_usage: ["Builder"]
language: ["C++"]
---
The Builder pattern is a creational design pattern that lets you construct complex objects step-by-step. It allows separation of construction from representation, making the process more flexible and readable, especially when dealing with objects that have many optional parameters.

The C++ implementation uses a separate `Builder` class with methods for each configurable part of the product (`Computer`). A `Director` class orchestrates the building process, using the builder to create the product. This approach avoids telescoping constructors and provides a clear, step-by-step construction process. The use of a dedicated builder class and a director aligns with C++'s emphasis on encapsulation and separation of concerns, promoting maintainability and extensibility.

```cpp
#include <iostream>
#include <string>
#include <vector>

// Product
class Computer {
public:
    Computer(std::string cpu, std::string ram, std::string storage, bool hasGpu, std::string os)
        : cpu_(cpu), ram_(ram), storage_(storage), hasGpu_(hasGpu), os_(os) {}

    void display() const {
        std::cout << "CPU: " << cpu_ << std::endl;
        std::cout << "RAM: " << ram_ << std::endl;
        std::cout << "Storage: " << storage_ << std::endl;
        std::cout << "GPU: " << (hasGpu_ ? "Yes" : "No") << std::endl;
        std::cout << "OS: " << os_ << std::endl;
    }

private:
    std::string cpu_;
    std::string ram_;
    std::string storage_;
    bool hasGpu_;
    std::string os_;
};

// Builder Interface
class ComputerBuilder {
public:
    virtual ~ComputerBuilder() = default;
    virtual ComputerBuilder& setCPU(std::string cpu) = 0;
    virtual ComputerBuilder& setRAM(std::string ram) = 0;
    virtual ComputerBuilder& setStorage(std::string storage) = 0;
    virtual ComputerBuilder& setGPU(bool hasGpu) = 0;
    virtual ComputerBuilder& setOS(std::string os) = 0;
    virtual Computer build() = 0;
};

// Concrete Builder
class GamingComputerBuilder : public ComputerBuilder {
public:
    GamingComputerBuilder() : cpu_("Intel i9"), ram_("32GB"), storage_("1TB SSD"), hasGpu_(true), os_("Windows 11") {}

    ComputerBuilder& setCPU(std::string cpu) override {
        cpu_ = cpu;
        return *this;
    }

    ComputerBuilder& setRAM(std::string ram) override {
        ram_ = ram;
        return *this;
    }

    ComputerBuilder& setStorage(std::string storage) override {
        storage_ = storage;
        return *this;
    }

    ComputerBuilder& setGPU(bool hasGpu) override {
        hasGpu_ = hasGpu;
        return *this;
    }

    ComputerBuilder& setOS(std::string os) override {
        os_ = os;
        return *this;
    }

    Computer build() override {
        return Computer(cpu_, ram_, storage_, hasGpu_, os_);
    }

private:
    std::string cpu_;
    std::string ram_;
    std::string storage_;
    bool hasGpu_;
    std::string os_;
};

// Director
class ComputerDirector {
public:
    ComputerDirector(ComputerBuilder* builder) : builder_(builder) {}

    void constructGamingComputer() {
        builder_->setCPU("AMD Ryzen 9")
                 ->setRAM("64GB")
                 ->setStorage("2TB NVMe SSD")
                 ->setGPU(true)
                 ->setOS("Linux");
    }

    Computer getComputer() {
        return builder_->build();
    }

private:
    ComputerBuilder* builder_;
};

int main() {
    GamingComputerBuilder builder;
    ComputerDirector director(&builder);

    director.constructGamingComputer();
    Computer computer = director.getComputer();

    computer.display();

    return 0;
}
```