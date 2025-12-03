---
title: "Supervisor-Worker - C++"
date: 2025-12-03T15:36:09.400-05:00
draft: false
pattern_usage: ["Supervisor-Worker"]
language: ["C++"]
---
The Supervisor-Worker pattern distributes tasks among a pool of worker threads managed by a supervisor thread. The supervisor assigns tasks from a queue to available workers, ensuring work is processed concurrently without overwhelming the system. This implementation uses a `std::queue` for task management and `std::thread` for worker threads.  C++'s standard library provides robust threading primitives, making this a natural fit.  The use of a shared queue and condition variables allows for efficient communication and synchronization between the supervisor and workers, avoiding busy-waiting.  The worker function is a simple loop that processes tasks until signaled to stop.

```cpp
#include <iostream>
#include <queue>
#include <thread>
#include <mutex>
#include <condition_variable>
#include <vector>

class Supervisor {
public:
    Supervisor(int num_workers) : num_workers_(num_workers), shutdown_(false) {}

    void start() {
        workers_.resize(num_workers_);
        for (int i = 0; i < num_workers_; ++i) {
            workers_[i] = std::thread([this, i]() { worker_function(i); });
        }
    }

    void stop() {
        {
            std::lock_guard<std::mutex> lock(queue_mutex_);
            shutdown_ = true;
        }
        condition_.notify_all(); // Wake up all workers to exit
        for (auto& worker : workers_) {
            worker.join();
        }
    }

    void submit_task(const std::function<void()>& task) {
        {
            std::lock_guard<std::mutex> lock(queue_mutex_);
            task_queue_.push(task);
        }
        condition_.notify_one(); // Wake up a worker
    }

private:
    void worker_function(int worker_id) {
        while (!shutdown_) {
            std::function<void()> task;
            {
                std::unique_lock<std::mutex> lock(queue_mutex_);
                condition_.wait(lock, [this] { return shutdown_ || !task_queue_.empty(); });
                if (shutdown_) break;
                task = std::move(task_queue_.front());
                task_queue_.pop();
            }
            task();
        }
        std::cout << "Worker " << worker_id << " shutting down." << std::endl;
    }

    std::queue<std::function<void()>> task_queue_;
    std::mutex queue_mutex_;
    std::condition_variable condition_;
    std::vector<std::thread> workers_;
    int num_workers_;
    bool shutdown_;
};

int main() {
    Supervisor supervisor(4);
    supervisor.start();

    for (int i = 0; i < 10; ++i) {
        supervisor.submit_task([i]() {
            std::cout << "Task " << i << " executed by thread " << std::this_thread::get_id() << std::endl;
            std::this_thread::sleep_for(std::chrono::milliseconds(100));
        });
    }

    supervisor.stop();
    return 0;
}
```