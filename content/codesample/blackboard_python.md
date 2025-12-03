---
title: "Blackboard - Python"
date: 2025-12-03T15:23:04.234-05:00
draft: false
pattern_usage: ["Blackboard"]
language: ["Python"]
---
The Blackboard pattern is a shared data repository (the “blackboard”) combined with a set of independent "knowledge sources" that observe the blackboard and contribute to solving a problem when they have relevant information. It's useful for complex problems with no clear algorithmic solution, allowing loosely coupled components to collaborate. 

This Python implementation uses a dictionary as the blackboard and functions as knowledge sources. Each source checks conditions on the blackboard and updates it if applicable. The `run_blackboard` function simulates the problem-solving process, iteratively applying knowledge sources until a solution is reached (or a maximum number of iterations is exceeded). This design uses Python’s flexibility and functional capabilities for easy addition and modification of knowledge sources without central control.

```python
class Blackboard:
    def __init__(self):
        self.data = {}

    def set(self, key, value):
        self.data[key] = value

    def get(self, key):
        return self.data.get(key)

def knowledge_source_1(blackboard):
    if not blackboard.get("input_data"):
        blackboard.set("input_data", "initial data")
        return True
    return False

def knowledge_source_2(blackboard):
    input_data = blackboard.get("input_data")
    if input_data and not blackboard.get("processed_data"):
        blackboard.set("processed_data", input_data.upper())
        return True
    return False

def knowledge_source_3(blackboard):
    processed_data = blackboard.get("processed_data")
    if processed_data and not blackboard.get("solution"):
        blackboard.set("solution", f"Final result: {processed_data}")
        return True
    return False

def run_blackboard(blackboard, knowledge_sources, max_iterations=10):
    for _ in range(max_iterations):
        any_changed = False
        for source in knowledge_sources:
            if source(blackboard):
                any_changed = True
        if not any_changed:
            break

    return blackboard.get("solution")

if __name__ == "__main__":
    blackboard = Blackboard()
    knowledge_sources = [knowledge_source_1, knowledge_source_2, knowledge_source_3]
    solution = run_blackboard(blackboard, knowledge_sources)
    print(solution)
```