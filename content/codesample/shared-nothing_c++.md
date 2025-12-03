---
title: "Shared-Nothing - C++"
date: 2025-12-03T15:12:25.097-05:00
draft: false
pattern_usage: ["Shared-Nothing"]
language: ["C++"]
---
The Shared-Nothing architecture is a distributed computing model where each node in the system has its own private memory and storage, and communicates with other nodes via network messages.  There is *no* shared memory or disk. This promotes scalability and fault tolerance as nodes are independent. This example simulates this using separate classes for data processing and coordination, with communication via simple message passing using standard output. Each 'node' (represented by a `Worker` object) owns its data and performs computations independently.  The `Coordinator` simply launches the workers and collects results via standard output, mimicking the message-passing aspect.  This approach fits C++’s strength in object-oriented design and allows for explicit control over data ownership and communication.

```cpp
#include <iostream>
#include <vector>
#include <thread>
#include <string>

// Represents a worker node in the shared-nothing system
class Worker {
public:
  Worker(int id, std::string data) : id_(id), data_(data) {}

  void processData() {
    // Simulate some processing on the private data
    std::string processedData = "Worker " + std::to_string(id_) + ": Processed " + data_;
    std::cout << processedData << std::endl; // "Message passing" via stdout
  }

private:
  int id_;
  std::string data_;
};

// Coordinates the work distribution
class Coordinator {
public:
  Coordinator(const std::vector<std::string>& data) {
    workers_.resize(data.size());
    for (size_t i = 0; i < data.size(); ++i) {
      workers_[i] = Worker(static_cast<int>(i), data[i]);
    }
  }

  void execute() {
    std::vector<std::thread> threads;
    for (auto& worker : workers_) {
      threads.emplace_back(&Worker::processData, &worker);
    }

    for (auto& thread : threads) {
      thread.join();
    }
  }

private:
  std::vector<Worker> workers_;
};

int main() {
  std::vector<std::string> inputData = {"Data 1", "Data 2", "Data 3", "Data 4"};
  Coordinator coordinator(inputData);
  coordinator.execute();
  return 0;
}
```