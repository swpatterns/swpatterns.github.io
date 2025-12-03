---
title: "Multiton - C++"
date: 2025-12-03T11:09:14.542-05:00
draft: false
pattern_usage: ["Multiton"]
language: ["C++"]
---
The Multiton pattern ensures that only a specific number of instances of a class exist. It's a relaxed version of the Singleton pattern. This is achieved by maintaining a static collection (like a vector) of instances and controlling access to them.  The example below implements a Multiton for a `Logger` class, allowing for a maximum of three logger instances, each with a different severity level (Debug, Info, Error).  The `getInstance()` method returns the first available instance of a requested severity, or creates a new one if space permits. C++'s static member variables and the use of a `std::vector` to store the instances are idiomatic approaches to implementing this resource-control pattern.

```cpp
#include <iostream>
#include <vector>
#include <mutex>

enum class Severity {
    Debug,
    Info,
    Error
};

class Logger {
public:
    ~Logger() {
        std::cout << "Logger " << severity_ << " destroyed." << std::endl;
    }

    static Logger& getInstance(Severity severity) {
        std::lock_guard<std::mutex> lock(mutex_);

        for (auto& instance : instances_) {
            if (instance.severity_ == severity && !instance.is_used_) {
                instance.is_used_ = true;
                return instance;
            }
        }

        if (instances_.size() < max_instances_) {
            Logger new_instance(severity);
            instances_.push_back(new_instance);
            return instances_.back();
        }

        throw std::runtime_error("Maximum number of loggers reached for severity " + std::to_string(static_cast<int>(severity)));
    }

    void log(const std::string& message) {
        std::cout << "[" << severityToString(severity_) << "] " << message << std::endl;
    }

private:
    Logger(Severity severity) : severity_(severity), is_used_(true) {}

    Severity severity_;
    bool is_used_;

    std::string severityToString(Severity sev) const{
      switch(sev){
        case Severity::Debug: return "DEBUG";
        case Severity::Info: return "INFO";
        case Severity::Error: return "ERROR";
        default: return "UNKNOWN";
      }
    }

    static std::vector<Logger> instances_;
    static const int max_instances_ = 3;
    static std::mutex mutex_;
};

std::vector<Logger> Logger::instances_;
const int Logger::max_instances_;
std::mutex Logger::mutex_;


int main() {
    try {
        Logger& debugLogger = Logger::getInstance(Severity::Debug);
        Logger& infoLogger = Logger::getInstance(Severity::Info);
        Logger& errorLogger = Logger::getInstance(Severity::Error);
        Logger& anotherErrorLogger = Logger::getInstance(Severity::Error); //Uses existing error logger
        
        debugLogger.log("Debugging message.");
        infoLogger.log("Information message.");
        errorLogger.log("Error message.");
		anotherErrorLogger.log("Another error message from existing instance.");

        // The following would throw an exception because the maximum number of instances is reached.
        // Logger& yetAnotherLogger = Logger::getInstance(Severity::Debug);
    } catch (const std::runtime_error& e) {
        std::cerr << "Exception: " << e.what() << std::endl;
    }

    return 0;
}
```