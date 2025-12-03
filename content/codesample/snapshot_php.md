---
title: "Snapshot - PHP"
date: 2025-12-03T14:02:30.278-05:00
draft: false
pattern_usage: ["Snapshot"]
language: ["PHP"]
---
The Snapshot pattern allows capturing and restoring the internal state of an object. This is useful for implementing features like undo/redo, transaction rollback, or saving game progress.  The code defines a `Report` class representing the object whose state needs to be saved. A `ReportSnapshot` class stores the state of a `Report` at a specific point in time. The `Report` class provides a method to create snapshots and a method to restore from a snapshot. This implementation uses PHP's object serialization to simplify snapshot storage and retrieval, which is a common and efficient approach in PHP.

```php
<?php

class Report {
    public string $title;
    public string $content;
    public int $version;

    public function __construct(string $title, string $content) {
        $this->title = $title;
        $this->content = $content;
        $this->version = 0;
    }

    public function update(string $newContent): void {
        $this->content = $newContent;
        $this->version++;
    }

    public function createSnapshot(): ReportSnapshot {
        return new ReportSnapshot($this);
    }

    public function restore(ReportSnapshot $snapshot): void {
        $this->title = $snapshot->title;
        $this->content = $snapshot->content;
        $this->version = $snapshot->version;
    }
}

class ReportSnapshot {
    public string $title;
    public string $content;
    public int $version;

    public function __construct(Report $report) {
        $this->title = $report->title;
        $this->content = $report->content;
        $this->version = $report->version;
    }
}

// Example Usage
$report = new Report("Initial Report", "This is the first version.");
$snapshot1 = $report->createSnapshot();

$report->update("Updated content for version 2.");
$snapshot2 = $report->createSnapshot();

// Restore to the first snapshot
$report->restore($snapshot1);
echo "Restored Report Title: " . $report->title . "\n";
echo "Restored Report Content: " . $report->content . "\n";
echo "Restored Report Version: " . $report->version . "\n";

?>
```