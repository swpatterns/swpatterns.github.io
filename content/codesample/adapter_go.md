---
title: "Adapter - Go"
date: 2025-12-03T11:28:12.058-05:00
draft: false
pattern_usage: ["Adapter"]
language: ["Go"]
---
The Adapter pattern converts the interface of a class into another interface clients expect. It lets classes work together that couldn't otherwise because of incompatible interfaces. This is achieved by creating a wrapper class (the Adapter) that translates calls to the adaptee's interface into calls the client understands.

The Go example demonstrates adapting a `JSONData` struct (the adaptee) to a `DataAdapter` interface. The `JSONDataAdapter` struct implements the `DataAdapter` interface, taking a `JSONData` instance and translating its methods to fit the expected interface. This approach leverages Go's interface implementation for loose coupling and aligns with its compositional style, avoiding inheritance-based solutions. The use of methods directly bound to the struct are also idiomatic.

```go
// DataAdapter defines the interface clients expect.
type DataAdapter interface {
	GetData(int) string
	SetData(int, string)
}

// JSONData is the existing data structure (adaptee).
type JSONData struct {
	data map[int]string
}

// NewJSONData creates a new JSONData instance.
func NewJSONData() *JSONData {
	return &JSONData{data: make(map[int]string)}
}

// GetJSONData retrieves data from the JSONData struct.
func (j *JSONData) GetJSONData(key int) string {
	return j.data[key]
}

// SetJSONData sets data within the JSONData struct.
func (j *JSONData) SetJSONData(key int, value string) {
	j.data[key] = value
}

// JSONDataAdapter adapts JSONData to the DataAdapter interface.
type JSONDataAdapter struct {
	jsonData *JSONData
}

// NewJSONDataAdapter creates a new JSONDataAdapter instance.
func NewJSONDataAdapter(jsonData *JSONData) *JSONDataAdapter {
	return &JSONDataAdapter{jsonData: jsonData}
}

// GetData implements the DataAdapter interface, translating the call to GetJSONData.
func (j *JSONDataAdapter) GetData(key int) string {
	return j.jsonData.GetJSONData(key)
}

// SetData implements the DataAdapter interface, translating the call to SetJSONData.
func (j *JSONDataAdapter) SetData(key int, value string) {
	j.jsonData.SetJSONData(key, value)
}

// Example Usage
func main() {
	jsonData := NewJSONData()
	jsonData.SetJSONData(1, "example data")

	adapter := NewJSONDataAdapter(jsonData)
	retrievedData := adapter.GetData(1)
	println(retrievedData) // Output: example data
}
```