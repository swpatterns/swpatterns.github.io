---
title: "Snapshot - C++"
date: 2025-12-03T14:00:39.165-05:00
draft: false
pattern_usage: ["Snapshot"]
language: ["C++"]
---
The Snapshot pattern allows capturing and restoring the internal state of an object. It's useful for implementing features like undo/redo, transaction rollback, or saving game states. This implementation uses a separate `Snapshot` class to hold the state, and a `Memento` class to provide a controlled interface for accessing it. The `Originator` class creates snapshots and restores from them. This approach adheres to C++'s emphasis on encapsulation and separation of concerns, using classes to manage state and access. Copying the state within the snapshot ensures immutability, crucial for reliable restoration.

```cpp
#include <iostream>
#include <vector>
#include <algorithm>

// Memento interface
class Memento {
public:
  virtual ~Memento() = default;
  virtual std::vector<int> getState() const = 0;
};

// Concrete Memento (Snapshot)
class Snapshot : public Memento {
private:
  std::vector<int> state_;

public:
  Snapshot(const std::vector<int>& state) : state_(state) {}

  std::vector<int> getState() const override { return state_; }
};

// Originator
class Originator {
private:
  std::vector<int> data_;

public:
  void setData(const std::vector<int>& data) { data_ = data; }
  std::vector<int> getData() const { return data_; }

  Memento createSnapshot() const {
    return Snapshot(data_);
  }

  void restoreFromSnapshot(const Memento& memento) {
    data_ = memento.getState();
  }
};

// Caretaker
class Caretaker {
private:
  std::vector<Memento*> snapshots_;

public:
  void addSnapshot(Memento* snapshot) {
    snapshots_.push_back(snapshot);
  }

  Memento* getSnapshot(int index) const {
    if (index >= 0 && index < snapshots_.size()) {
      return snapshots_[index];
    }
    return nullptr;
  }
};

int main() {
  Originator originator;
  Caretaker caretaker;

  originator.setData({1, 2, 3});
  std::cout << "Original state: ";
  for (int val : originator.getData()) {
    std::cout << val << " ";
  }
  std::cout << std::endl;

  caretaker.addSnapshot(originator.createSnapshot());

  originator.setData({4, 5, 6});
  std::cout << "Modified state: ";
  for (int val : originator.getData()) {
    std::cout << val << " ";
  }
  std::cout << std::endl;

  Memento* snapshot = caretaker.getSnapshot(0);
  if (snapshot) {
    originator.restoreFromSnapshot(*snapshot);
    std::cout << "Restored state: ";
    for (int val : originator.getData()) {
      std::cout << val << " ";
    }
    std::cout << std::endl;
  }

  return 0;
}
```