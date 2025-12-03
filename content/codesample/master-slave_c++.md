---
title: "Master-Slave - C++"
date: 2025-12-03T15:32:20.880-05:00
draft: false
pattern_usage: ["Master-Slave"]
language: ["C++"]
---
The Master-Slave pattern distributes work to multiple worker threads (slaves) from a central thread (master). The master typically manages a work queue and assigns tasks to available slaves. This improves performance by leveraging multi-core processors.  Here, the master thread creates worker threads and pushes tasks (integers to be squared) onto a shared queue. Each worker thread continuously pulls tasks from the queue, processes them, and pushes the results onto another shared queue. The master collects the results.  This implementation uses `std::thread`, `std::queue`, `std::mutex`, and `std::condition_variable` for thread management and synchronization, which are standard C++ concurrency primitives, making it idiomatic.

```cpp
#include <iostream>
#include <thread>
#include <queue>
#include <mutex>
#include <condition_variable>
#include <vector>

class MasterSlave {
public:
    MasterSlave(int num_slaves) : num_slaves_(num_slaves) {}

    void submit_task(int task) {
        std::lock_guard<std::mutex> lock(queue_mutex_);
        task_queue_.push(task);
        condition_.notify_one();
    }

    std::vector<int> get_results() {
        return results_;
    }

    void start() {
        workers_.resize(num_slaves_);
        for (int i = 0; i < num_slaves_; ++i) {
            workers_[i] = std::thread(&MasterSlave::worker_thread, this);
        }
    }

    void stop() {
        // Signal workers to exit
        for (int i = 0; i < num_slaves_; ++i) {
            submit_task(-1); // Sentinel value to signal termination
        }
        for (int i = 0; i < num_slaves_; ++i) {
            workers_[i].join();
        }
    }

private:
    void worker_thread() {
        while (true) {
            std::unique_lock<std::mutex> lock(queue_mutex_);
            condition_.wait(lock, [this] { return !task_queue_.empty(); });

            int task = task_queue_.front();
            task_queue_.pop();
            lock.unlock();

            if (task == -1) {
                break; // Exit signal
            }

            int result = task * task;
            std::lock_guard<std::mutex> result_lock(result_mutex_);
            results_.push_back(result);
        }
    }

    std::queue<int> task_queue_;
    std::vector<int> results_;
    std::mutex queue_mutex_;
    std::mutex result_mutex_;
    std::condition_variable condition_;
    int num_slaves_;
    std::vector<std::thread> workers_;
};

int main() {
    MasterSlave master(4);
    master.start();

    for (int i = 0; i < 10; ++i) {
        master.submit_task(i);
    }

    master.stop();

    std::vector<int> results = master.get_results();
    for (int result : results) {
        std::cout << result << " ";
    }
    std::cout << std::endl;

    return 0;
}
```