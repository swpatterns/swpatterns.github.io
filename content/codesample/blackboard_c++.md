---
title: "Blackboard - C++"
date: 2025-12-03T15:24:18.283-05:00
draft: false
pattern_usage: ["Blackboard"]
language: ["C++"]
---
The Blackboard pattern is a computational problem-solving technique where multiple independent knowledge sources (KSs) contribute to solving a problem via a shared data structure, the Blackboard. KSs ‘watch’ the Blackboard for changes that match their expertise, and when a match occurs, execute to modify the data accordingly. This allows for flexible, collaborative problem-solving without tight coupling between the KSs. The code demonstrates this with a simplified example of image processing: edge detection and shape analysis operate on pixel data in a shared `Blackboard` structure. C++'s flexibility allows representing KSs as classes with dedicated functions watching for conditions in the `Blackboard`.

```cpp
 #include <iostream>
 #include <vector>
 #include <algorithm>
 #include <mutex>

 // The Blackboard - shared data
 class Blackboard {
 public:
  std::vector<std::vector<int>> data;
  std::mutex mutex;

  Blackboard(int rows, int cols) : data(rows, std::vector<int>(cols, 0)) {}

  void update_data(int row, int col, int value) {
    std::lock_guard<std::mutex> lock(mutex);
    data[row][col] = value;
  }

  int get_data(int row, int col) const {
    std::lock_guard<std::mutex> lock(mutex);
    return data[row][col];
  }
};

 // Knowledge Source Interface
 class KnowledgeSource {
 public:
  virtual void execute(Blackboard& blackboard) = 0;
  virtual bool should_execute(Blackboard& blackboard) = 0;
 };

 // Knowledge Source: Edge Detection
 class EdgeDetector : public KnowledgeSource {
 public:
  void execute(Blackboard& blackboard) override {
    for (size_t i = 1; i < blackboard.data.size() - 1; ++i) {
      for (size_t j = 1; j < blackboard.data[0].size() - 1; ++j) {
        // Simple edge detection (Sobel-like)
        int gx = blackboard.get_data(i - 1, j) - blackboard.get_data(i + 1, j);
        int gy = blackboard.get_data(i, j - 1) - blackboard.get_data(i, j + 1);
        int gradient_magnitude = std::abs(gx) + std::abs(gy);

        if (gradient_magnitude > 10) {
          blackboard.update_data(i, j, 255); // Mark edge
        }
      }
    }
  }

  bool should_execute(Blackboard& blackboard) override {
    // Execute if no edges have been detected yet
    for (auto& row : blackboard.data) {
      if (std::any_of(row.begin(), row.end(), [](int pixel){ return pixel == 255; })) {
        return false;
      }
    }
    return true;
  }
 };

 // Knowledge Source: Shape Analysis (Placeholder)
 class ShapeAnalyzer : public KnowledgeSource {
 public:
  void execute(Blackboard& blackboard) override {
    // In a real implementation, this would analyze shapes based on edge data.
    std::cout << "Shape analysis running..." << std::endl;
  }

  bool should_execute(Blackboard& blackboard) override {
    // Execute if edges are present
    for (auto& row : blackboard.data) {
      if (std::any_of(row.begin(), row.end(), [](int pixel){ return pixel == 255; })) {
        return true;
      }
    }
    return false;
  }
 };

 int main() {
  Blackboard blackboard(5, 5);

  // Initialize blackboard with some data
  blackboard.update_data(1, 1, 100);
  blackboard.update_data(1, 2, 150);
  blackboard.update_data(2, 1, 120);
  blackboard.update_data(2, 2, 200);

  // Create knowledge sources
  EdgeDetector edge_detector;
  ShapeAnalyzer shape_analyzer;

  // Execution loop
  std::vector<KnowledgeSource*> knowledge_sources = {&edge_detector, &shape_analyzer};
  for (auto& ks : knowledge_sources) {
    if (ks->should_execute(blackboard)) {
      ks->execute(blackboard);
    }
  }

  // Print the blackboard data
  for (const auto& row : blackboard.data) {
    for (int pixel : row) {
      std::cout << pixel << " ";
    }
    std::cout << std::endl;
  }

  return 0;
 }
 ```