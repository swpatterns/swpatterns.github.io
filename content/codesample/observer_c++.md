---
title: "Observer - C++"
date: 2025-12-03T13:24:55.312-05:00
draft: false
pattern_usage: ["Observer"]
language: ["C++"]
---
The Observer pattern defines a one-to-many dependency between objects so that when one object (the subject) changes state, all its dependents (observers) are notified and updated automatically.  This promotes loose coupling. Here, we use C++'s standard `std::function` for the observer's update method, allowing flexible observer types. The `Subject` broadcasts updates to registered observers by calling their update functions.  This implementation is idiomatic because it leverages C++'s function objects and standard library features for a concise and type-safe solution, avoiding explicit interfaces where not strictly necessary, although a base class interface is also viable.

```cpp
#include <iostream>
#include <vector>
#include <functional>

class Subject {
public:
    using ObserverCallback = std::function<void(int)>;

    void attach(ObserverCallback observer) {
        observers_.push_back(observer);
    }

    void detach(ObserverCallback observer) {
        for (auto it = observers_.begin(); it != observers_.end(); ++it) {
            if (*it == observer) {
                observers_.erase(it);
                break;
            }
        }
    }

    void set_state(int state) {
        state_ = state;
        notify();
    }

    int get_state() const {
        return state_;
    }

private:
    void notify() {
        for (const auto& observer : observers_) {
            observer(state_);
        }
    }

    int state_ = 0;
    std::vector<ObserverCallback> observers_;
};

int main() {
    Subject subject;

    // Observer 1 (using a lambda)
    subject.attach([](int state) {
        std::cout << "Observer 1: State changed to " << state << std::endl;
    });

    // Observer 2 (using a function)
    auto observer2_func = [](int state) {
        std::cout << "Observer 2: State is now " << state * 2 << std::endl;
    };
    subject.attach(observer2_func);

    subject.set_state(1);
    subject.set_state(2);

    subject.detach(observer2_func);

    subject.set_state(3);

    return 0;
}
```