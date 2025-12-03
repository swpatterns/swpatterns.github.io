---
title: "Template Method - Python"
date: 2025-12-03T13:36:52.354-05:00
draft: false
pattern_usage: ["Template Method"]
language: ["Python"]
---
The Template Method pattern defines the skeleton of an algorithm in a base class, deferring some steps to subclasses. It allows subclasses to redefine certain steps of an algorithm without changing the algorithm’s structure. This promotes code reuse and avoids code duplication.

The Python example defines an abstract base class `AbstractWorkflow` with a `template_method` that outlines the workflow. Concrete workflows (`ConcreteWorkflowA`, `ConcreteWorkflowB`) inherit from this and implement the abstract `step1` and `step2` methods, customizing specific parts of the workflow while maintaining the overall structure defined in the base class. This leverages Python’s duck typing and ABCs for a clean and flexible implementation.

```python
from abc import ABC, abstractmethod

class AbstractWorkflow(ABC):
    def template_method(self):
        self.step1()
        self.step2()
        self.step3()

    def step3(self):
        print("Step 3: Common logic")

    @abstractmethod
    def step1(self):
        pass

    @abstractmethod
    def step2(self):
        pass

class ConcreteWorkflowA(AbstractWorkflow):
    def step1(self):
        print("ConcreteWorkflowA: Step 1")

    def step2(self):
        print("ConcreteWorkflowA: Step 2")

class ConcreteWorkflowB(AbstractWorkflow):
    def step1(self):
        print("ConcreteWorkflowB: Step 1 - Different implementation")

    def step2(self):
        print("ConcreteWorkflowB: Step 2 - Different implementation")


if __name__ == "__main__":
    workflow_a = ConcreteWorkflowA()
    workflow_a.template_method()

    workflow_b = ConcreteWorkflowB()
    workflow_b.template_method()
```