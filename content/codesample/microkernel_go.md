---
title: "Microkernel - Go"
date: 2025-12-03T14:22:17.555-05:00
draft: false
pattern_usage: ["Microkernel"]
language: ["Go"]
---
The Microkernel pattern aims to create a minimal core system with additional functionality implemented as plugins or extensions. This promotes modularity, flexibility, and ease of maintenance. The core (microkernel) handles essential operations, while plugins add domain-specific features without tightly coupling them to the core.

This Go implementation defines a `Kernel` interface that plugins must satisfy. The `main` package represents the microkernel, initializing and managing plugins stored in a map.  Plugins are loaded by registering functions implementing the `Kernel` interface to the core. The core invokes plugin functions for specific actions. This utilizes Go’s function-as-first-class-citizen feature and interface-based programming, which are very idiomatic, avoiding complex inheritance structures common in some other languages. It favors composition and loose coupling.

```go
package main

import "fmt"

// Kernel defines the interface plugins must implement.
type Kernel interface {
	Run(input string) (string, error)
}

// Microkernel represents the minimal core system.
type Microkernel struct {
	plugins map[string]Kernel
}

// NewMicrokernel creates a new Microkernel instance.
func NewMicrokernel() *Microkernel {
	return &Microkernel{
		plugins: make(map[string]Kernel),
	}
}

// RegisterPlugin registers a plugin with the microkernel.
func (k *Microkernel) RegisterPlugin(name string, plugin Kernel) {
	k.plugins[name] = plugin
}

// RunPlugin executes a plugin based on its name and input.
func (k *Microkernel) RunPlugin(name, input string) (string, error) {
	plugin, ok := k.plugins[name]
	if !ok {
		return "", fmt.Errorf("plugin '%s' not found", name)
	}
	return plugin.Run(input)
}

// PluginA is a sample plugin.
func PluginARun(input string) (string, error) {
	return fmt.Sprintf("Plugin A processed: %s", input), nil
}

// PluginB is another sample plugin.
func PluginBRun(input string) (string, error) {
	return fmt.Sprintf("Plugin B processed: %s", input), nil
}

func main() {
	kernel := NewMicrokernel()
	kernel.RegisterPlugin("pluginA", &PluginA{})
	kernel.RegisterPlugin("pluginB", &PluginB{})

	result, err := kernel.RunPlugin("pluginA", "Hello from main!")
	if err != nil {
		fmt.Println("Error:", err)
	} else {
		fmt.Println(result)
	}

	result, err = kernel.RunPlugin("pluginB", "Another message")
	if err != nil {
		fmt.Println("Error:", err)
	} else {
		fmt.Println(result)
	}

	result, err = kernel.RunPlugin("pluginC", "This won't work")
	if err != nil {
		fmt.Println("Error:", err)
	}
}

type PluginA struct {}
func (p *PluginA) Run(input string) (string, error) {
	return PluginARun(input)
}

type PluginB struct {}
func (p *PluginB) Run(input string) (string, error) {
	return PluginBRun(input)
}
```