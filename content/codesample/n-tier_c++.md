---
title: "N-tier - C++"
date: 2025-12-03T14:37:45.392-05:00
draft: false
pattern_usage: ["N-tier"]
language: ["C++"]
---
The N-tier pattern organizes an application into distinct layers, each addressing a specific concern. This improves maintainability, testability, and reusability. A classic N-tier architecture separates the application into a presentation tier (UI), business logic tier (handling application rules), and data access tier (database interaction).  This example uses a 3-tier approach. The `PresentationTier` handles user interactions, the `BusinessLogicTier` contains the core application logic, and the `DataAccessTier` interacts with a simple in-memory data store.  The design utilizes clear interfaces between tiers, promoting loose coupling, and classes to encapsulate functionality, aligning with C++'s OOP principles.  Dependency injection, while not fully implemented due to brevity, is implied by the tier interactions through interfaces.

```cpp
#include <iostream>
#include <vector>
#include <string>

// Data Access Tier
class IDataAccess {
public:
    virtual ~IDataAccess() = default;
    virtual std::vector<std::string> getData() = 0;
};

class InMemoryDataAccess : public IDataAccess {
public:
    std::vector<std::string> getData() override {
        return {"Data 1", "Data 2", "Data 3"};
    }
};

// Business Logic Tier
class IBusinessLogic {
public:
    virtual ~IBusinessLogic() = default;
    virtual std::string processData(const std::string& data) = 0;
};

class SimpleBusinessLogic : public IBusinessLogic {
public:
    std::string processData(const std::string& data) override {
        return "Processed: " + data;
    }
};

// Presentation Tier
class PresentationTier {
private:
    IBusinessLogic* businessLogic;

public:
    PresentationTier(IBusinessLogic* logic) : businessLogic(logic) {}

    void displayData() {
        IDataAccess* dataAccess = new InMemoryDataAccess();
        std::vector<std::string> data = dataAccess->getData();
        delete dataAccess;

        for (const auto& item : data) {
            std::string processedItem = businessLogic->processData(item);
            std::cout << processedItem << std::endl;
        }
    }
};

int main() {
    IBusinessLogic* businessLogic = new SimpleBusinessLogic();
    PresentationTier presentation(businessLogic);
    presentation.displayData();
    delete businessLogic;

    return 0;
}
```