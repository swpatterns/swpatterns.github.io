
---
title: Strategy Registry
date: 2024-02-29T10:30:00Z
draft: false
pattern_types: ["behavioral", "DDD"]
wikipedia: ""
diagramtype: "class"
diagram: "[Client] --|> [StrategyRegistry] : uses\n[StrategyRegistry] -- [ConcreteStrategyA] : holds\n[StrategyRegistry] -- [ConcreteStrategyB] : holds\n[StrategyRegistry] -- [ConcreteStrategyC] : holds\n[StrategyRegistry] ..> [StrategyInterface] : uses"
code: true
---

The Strategy Registry pattern provides a centralized way to manage and access a collection of strategy algorithms. Instead of a client directly holding references to multiple concrete strategy classes, it interacts with a registry that maps keys (often strings or enums) to specific strategies. This promotes loose coupling, simplifies strategy addition/removal, and enhances maintainability.

This pattern is particularly useful when the number of strategies is dynamic, determined at runtime, or needs to be configured externally. It avoids hardcoding strategy choices within the client and allows for easy extension without modifying existing code. It's a common approach in systems requiring flexible and configurable behavior, such as data processing pipelines, game AI, or payment processing.

## Usage

*   **Plugin Systems:**  Allowing users to extend functionality by registering their own strategies without modifying the core application.
*   **Data Validation:**  Providing a registry of different validation rules (strategies) that can be applied to data based on its type or context.
*   **Payment Gateways:**  Managing multiple payment processing methods (strategies) through a single interface.
*   **Workflow Engines:**  Dynamically selecting and applying different workflow steps (strategies) based on the current state of the process.
*   **AI and Game Development:** Selecting different AI behaviors (strategies) for game characters based on game conditions.

## Examples

*   **Jenkins Pipelines:** Jenkins allows users to define pipelines as code, and these pipelines can utilize different "steps" or plugins to perform specific tasks.  The Jenkins system effectively maintains a registry of available steps, allowing users to dynamically configure the pipeline execution flow. The key is the pipeline script itself, identifying which step (strategy) to execute at a given moment.
*   **Spring's `org.springframework.beans.factory.config.BeanPostProcessor`:** Spring's BeanPostProcessor interface allows developers to register custom logic to be executed before and after bean instantiation.  Spring internally maintains a registry of BeanPostProcessors that are applied to all registered beans in a specific order, effectively selecting strategies (the processors) based on configuration.
*   **Log4j/Logback Configurators:** These logging frameworks use configuration files to define how log messages are handled. The configuration specifies which appenders (strategies) to use based on log level, class name, or other criteria. The framework maintains a registry of appenders and applies them according to the configuration.
