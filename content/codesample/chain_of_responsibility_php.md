---
title: "Chain of Responsibility - PHP"
date: 2025-12-03T12:59:22.238-05:00
draft: false
pattern_usage: ["Chain of Responsibility"]
language: ["PHP"]
---
The Chain of Responsibility pattern allows a request to be passed along a chain of handlers. Each handler decides either to process the request or to pass it to the next handler in the chain. This decouples the sender of a request from its receivers, enabling flexible assignment of responsibilities to different handlers. 

The PHP implementation uses an interface (`HandlerInterface`) to define a common `handleRequest` method, which each concrete handler must implement. The handlers maintain a reference to the next handler in the chain. The `handleRequest` method checks if the current handler can process the request; if not, it forwards the request to the next handler. This example demonstrates handling expense reports with different approval levels based on amount.  Using interfaces and composition aligns with modern PHP practices for loose coupling and extensibility.

```php
<?php

/**
 * Handler Interface
 */
interface HandlerInterface
{
    public function setNext(HandlerInterface $handler): HandlerInterface;
    public function handleRequest(Report $report): ?string;
}

/**
 * Report class to represent the expense report
 */
class Report
{
    public function __construct(public int $amount, public string $description) {}
}

/**
 * Abstract Handler Class
 */
abstract class AbstractHandler implements HandlerInterface
{
    private ?HandlerInterface $nextHandler = null;

    public function setNext(HandlerInterface $handler): HandlerInterface
    {
        $this->nextHandler = $handler;
        return $handler;
    }

    public function handleRequest(Report $report): ?string
    {
        if ($this->canHandle($report)) {
            return $this->handle($report);
        }

        return $this->nextHandler ? $this->nextHandler->handleRequest($report) : null;
    }

    abstract protected function canHandle(Report $report): bool;
    abstract protected function handle(Report $report): ?string;
}

/**
 * Concrete Handlers
 */
class ManagerHandler extends AbstractHandler
{
    protected function canHandle(Report $report): bool
    {
        return $report->amount <= 500;
    }

    protected function handle(Report $report): ?string
    {
        return "Manager approved: " . $report->description . " for $" . $report->amount;
    }
}

class DirectorHandler extends AbstractHandler
{
    protected function canHandle(Report $report): bool
    {
        return $report->amount <= 1500;
    }

    protected function handle(Report $report): ?string
    {
        return "Director approved: " . $report->description . " for $" . $report->amount;
    }
}

class CeoHandler extends AbstractHandler
{
    protected function canHandle(Report $report): bool
    {
        return true;
    }

    protected function handle(Report $report): ?string
    {
        return "CEO approved: " . $report->description . " for $" . $report->amount;
    }
}

// Usage
$report1 = new Report(300, "Office Supplies");
$report2 = new Report(1000, "Marketing Campaign");
$report3 = new Report(2000, "New Project");

$manager = new ManagerHandler();
$director = new DirectorHandler();
$ceo = new CeoHandler();

$manager->setNext($director)->setNext($ceo);

echo $manager->handleRequest($report1) . PHP_EOL;
echo $manager->handleRequest($report2) . PHP_EOL;
echo $manager->handleRequest($report3) . PHP_EOL;

?>
```