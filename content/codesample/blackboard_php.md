---
title: "Blackboard - PHP"
date: 2025-12-03T15:26:18.063-05:00
draft: false
pattern_usage: ["Blackboard"]
language: ["PHP"]
---
The Blackboard pattern is a centralized data repository (the “blackboard”) coupled with a set of independent, specialized agents that operate on that data. Agents react to changes on the blackboard, contributing knowledge or transforming the data until a solution is reached. This decouples the data and the processing logic, making the system flexible and extensible.

This PHP implementation simulates a simple problem-solving scenario: recognizing patterns in a data stream. The `Blackboard` class holds the data. `Agent` is an abstract class defining the interface for agents. Concrete agents (`DataIngestAgent`, `PatternRecognitionAgent`) observe the blackboard for updates (simulated with a trigger) and perform their tasks. `PatternRecognitionAgent` determines if a defined pattern exists in the ingested data and posts its findings back to the blackboard. The structure uses interfaces and abstract classes typical of PHP OOP.

```php
<?php

// Blackboard Pattern in PHP

/**
 * Represents the Blackboard - a central data repository.
 */
class Blackboard
{
    private $data = [];
    private $observers = [];

    public function getData(): array
    {
        return $this->data;
    }

    public function setData(array $newData): void
    {
        $this->data = $newData;
        $this->notifyObservers();
    }

    public function addObserver(Observer $observer): void
    {
        $this->observers[] = $observer;
    }

    private function notifyObservers(): void
    {
        foreach ($this->observers as $observer) {
            $observer->update($this->data);
        }
    }
}

/**
 * Defines the interface for Agents.
 */
interface Observer
{
    public function update(array $data): void;
}


/**
 * Base class for Agents.
 */
abstract class Agent implements Observer
{
    protected Blackboard $blackboard;

    public function __construct(Blackboard $blackboard)
    {
        $this->blackboard = $blackboard;
        $this->blackboard->addObserver($this);
    }
}

/**
 * Ingests data into the Blackboard.
 */
class DataIngestAgent extends Agent
{
    private $dataToIngest;

    public function __construct(Blackboard $blackboard, array $dataToIngest)
    {
        parent::__construct($blackboard);
        $this->dataToIngest = $dataToIngest;
    }

    public function update(array $data): void
    {
        // In this simplified example, the agent only runs once.
        $this->blackboard->setData($this->dataToIngest);
    }
}

/**
 * Recognizes a pattern in the Blackboard data.
 */
class PatternRecognitionAgent extends Agent
{
    private $patternToRecognize;

    public function __construct(Blackboard $blackboard, array $patternToRecognize)
    {
        parent::__construct($blackboard);
        $this->patternToRecognize = $patternToRecognize;
    }

    public function update(array $data): void
    {
        if ($this->patternExists($data, $this->patternToRecognize)) {
            $this->blackboard->setData(['pattern_found' => true, 'data' => $data]);
        } else {
            $this->blackboard->setData(['pattern_found' => false, 'data' => $data]);
        }
    }

    private function patternExists(array $data, array $pattern): bool
    {
        // Simple pattern matching example
        return array_intersect($pattern, $data) === $pattern;
    }
}


// Example Usage
$blackboard = new Blackboard();

$data = [1, 2, 3, 4, 5];
$pattern = [2, 4];

$ingestAgent = new DataIngestAgent($blackboard, $data);
$recognitionAgent = new PatternRecognitionAgent($blackboard, $pattern);

// Simulate data ingestion (agent runs on construction in this simplified example)
// The pattern recognition agent then reacts.

$result = $blackboard->getData();
print_r($result);

?>
```