---
title: "Microkernel - C++"
date: 2025-12-03T14:21:41.256-05:00
draft: false
pattern_usage: ["Microkernel"]
language: ["C++"]
---
The Microkernel pattern structures an application as a core system (the microkernel) and plugin modules. The microkernel provides minimal essential services, while plugins add specific functionality. This promotes modularity, extensibility, and isolation. The provided code demonstrates a simple microkernel for processing strings. The core `Microkernel` class defines an interface for plugins (`IPlugin`). `UppercasePlugin` and `LowercasePlugin` implement the interface to transform strings. The microkernel loads and executes these plugins based on configuration. This implementation leverages polymorphism via the `IPlugin` base class, common in C++ to achieve extensibility. Dependency injection through the plugin list is also used, a modern C++ practice.

```cpp
#include <iostream>
#include <vector>
#include <string>
#include <algorithm>

// Plugin Interface
class IPlugin {
public:
    virtual std::string process(const std::string& data) = 0;
    virtual ~IPlugin() = default;
};

// Uppercase Plugin
class UppercasePlugin : public IPlugin {
public:
    std::string process(const std::string& data) override {
        std::string result = data;
        std::transform(result.begin(), result.end(), result.begin(), ::toupper);
        return result;
    }
};

// Lowercase Plugin
class LowercasePlugin : public IPlugin {
public:
    std::string process(const std::string& data) override {
        std::string result = data;
        std::transform(result.begin(), result.end(), result.begin(), ::tolower);
        return result;
    }
};

// Microkernel
class Microkernel {
public:
    Microkernel(std::vector<IPlugin*> plugins) : plugins_(std::move(plugins)) {}

    std::string processData(const std::string& data) {
        std::string processedData = data;
        for (auto* plugin : plugins_) {
            processedData = plugin->process(processedData);
        }
        return processedData;
    }

private:
    std::vector<IPlugin*> plugins_;
};

int main() {
    // Load plugins (in a real system this might be done dynamically)
    UppercasePlugin uppercasePlugin;
    LowercasePlugin lowercasePlugin;

    std::vector<IPlugin*> plugins = {&uppercasePlugin, &lowercasePlugin};

    // Create microkernel with plugins
    Microkernel microkernel(std::move(plugins));

    // Process data
    std::string data = "Hello World";
    std::string processedData = microkernel.processData(data);

    std::cout << "Original Data: " << data << std::endl;
    std::cout << "Processed Data: " << processedData << std::endl;

    return 0;
}
```