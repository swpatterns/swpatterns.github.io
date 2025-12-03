---
title: "Snapshot - Go"
date: 2025-12-03T14:01:18.787-05:00
draft: false
pattern_usage: ["Snapshot"]
language: ["Go"]
---
The Snapshot pattern captures and restores the state of an object, allowing for easy rollbacks or saving/loading of progress. It's particularly useful in scenarios like undo/redo functionality, game save states, or transaction management. In this Go example, we define a `Report` struct representing the object whose state needs to be captured. The `Snapshot` struct holds a copy of the `Report`'s required fields. The `NewReportSnapshot` function creates a snapshot, and the `Restore` function applies the snapshot to the original `Report`. This implementation leverages Go's struct embedding and direct field copying for a concise and efficient snapshot mechanism.

```go
package main

import "fmt"

// Report represents the object whose state we want to snapshot.
type Report struct {
	Title   string
	Content string
	Status  string
}

// Snapshot represents the captured state of a Report.
type Snapshot struct {
	Title   string
	Content string
	Status  string
}

// NewReportSnapshot creates a new snapshot of the Report.
func NewReportSnapshot(r Report) Snapshot {
	return Snapshot{
		Title:   r.Title,
		Content: r.Content,
		Status:  r.Status,
	}
}

// Restore applies the snapshot to the original Report.
func (r *Report) Restore(s Snapshot) {
	r.Title = s.Title
	r.Content = s.Content
	r.Status = s.Status
}

func main() {
	report := Report{
		Title:   "Initial Report",
		Content: "This is the initial content.",
		Status:  "Draft",
	}

	snapshot := NewReportSnapshot(report)

	report.Content = "Content has been modified."
	report.Status = "In Review"

	fmt.Println("Report after modification:")
	fmt.Printf("%+v\n", report)

	report.Restore(snapshot)

	fmt.Println("\nReport after restoring snapshot:")
	fmt.Printf("%+v\n", report)
}
```