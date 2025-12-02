---
title: "Lazy Initialization"
date: 2024-02-29T17:32:55-00:00
draft: false
pattern_types: ["creational", "performance"]
wikipedia: "https://en.wikipedia.org/wiki/Lazy_evaluation"
diagramtype: "class"
diagram: "[Client]--[LazyObject:Object]->[ExpensiveResource:Object]"
code: true
---

Lazy Initialization is a technique that delays the creation of an object or the execution of a process until it is actually needed. Instead of initializing the object during the class or module loading phase, initialization is postponed to the first time the object’s methods are invoked or its properties are accessed. This can significantly improve application startup time and reduce resource consumption, especially when dealing with resource-intensive operations.

The pattern is particularly useful when you have objects that require significant resources to create, but aren’t always used by the application. Avoid unnecessary initialization costs by waiting until the object is explicitly requested. It's also helpful when initialization depends on runtime information that isn’t available at startup.

## Usage

*   **Improving Startup Time:** When an application has many dependencies, some of which are expensive to initialize, lazy initialization can drastically reduce the time it takes for the application to become responsive.
*   **Resource Management:** It's beneficial when dealing with limited resources like database connections or file handles. Initializing them only when needed prevents resource exhaustion.
*   **Conditional Initialization:** If an object is only required under certain conditions, lazy initialization avoids initializing it if those conditions are never met.
*   **Singleton Pattern Implementation:** Lazy initialization is often used to create singletons to ensure the instance is created only when first accessed.

## Examples

1.  **Java’s `java.lang.ClassLoader`:** The Java class loader doesn't load and initialize classes immediately when the program starts. Instead, it loads classes "on demand", only when they are first referenced during program execution. This is a form of lazy initialization that improves startup time, as only the required classes are loaded.

2.  **Python’s `property` decorator:** Python’s `@property` decorator allows you to define methods that behave like attributes.  These methods can use lazy initialization to compute a value only when it is first requested. For example, calculating a complex statistical value only when the property is accessed for the first time.

   python
   class DataProcessor:
       def __init__(self, data):
           self.data = data
           self._processed_data = None

       @property
       def processed_data(self):
           if self._processed_data is None:
               print("Processing data...") #Simulating an expensive operation
               self._processed_data = self._process()
           return self._processed_data

       def _process(self):
           # Actual data processing logic
           return [x * 2 for x in self.data]

   processor = DataProcessor([1, 2, 3])
   # processed_data is not calculated yet
   print("Main program continues...")

   # The processing happens only when processed_data is accessed
   print(processor.processed_data)
   