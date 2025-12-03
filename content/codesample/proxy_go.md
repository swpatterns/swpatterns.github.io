---
title: "Proxy - Go"
date: 2025-12-03T12:47:12.262-05:00
draft: false
pattern_usage: ["Proxy"]
language: ["Go"]
---
The Proxy pattern provides a surrogate or placeholder for another object to control access to it. This is useful for adding functionality like access control, lazy initialization, or logging without modifying the original object. In this Go example, we have a `RealImage` that loads and displays an image. The `ProxyImage` acts as a proxy, deferring the image loading until `Display()` is called. This demonstrates lazy loading. The implementation uses interfaces to decouple the proxy from the real subject, a common practice in Go for achieving flexibility and testability.  The `Display()` method on the proxy checks if the image is already loaded; if not, it loads it and then displays it.

```go
// image.go

// Image is the interface that both RealImage and ProxyImage implement.
type Image interface {
	Display()
}

// RealImage represents the actual image loading and display logic.
type RealImage struct {
	filePath string
}

// NewRealImage creates a new RealImage instance.
func NewRealImage(filePath string) *RealImage {
	return &RealImage{filePath: filePath}
}

// Display loads and displays the image.
func (i *RealImage) Display() {
	println("Loading image from:", i.filePath)
	// Simulate image loading delay
	// time.Sleep(2 * time.Second)
	println("Displaying image.")
}

// ProxyImage is the proxy that controls access to the RealImage.
type ProxyImage struct {
	realImage *RealImage
	filePath  string
}

// NewProxyImage creates a new ProxyImage instance.
func NewProxyImage(filePath string) *ProxyImage {
	return &ProxyImage{filePath: filePath}
}

// Display displays the image, loading it if necessary.
func (p *ProxyImage) Display() {
	if p.realImage == nil {
		p.realImage = NewRealImage(p.filePath)
	}
	p.realImage.Display()
}
```