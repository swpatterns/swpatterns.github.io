---
title: "Blackboard - Go"
date: 2025-12-03T15:24:54.529-05:00
draft: false
pattern_usage: ["Blackboard"]
language: ["Go"]
---
The Blackboard pattern provides a shared memory (the “blackboard”) that different knowledge sources (independent components) can read and write to achieve a common goal. Each knowledge source monitors the blackboard for information it can use or modify, triggering its associated action when conditions are met. This promotes loose coupling and allows for dynamic modification of problem-solving behavior.

Here, we model a simple spell checker.  The `Blackboard` holds the current state of the text.  `KnowledgeSource` interface defines the behavior of components which examine and modify the blackboard. `SpellCheckSource` and `CapitalizationSource` represent distinct checks, reacting to changes on the blackboard.  Go's concurrency model using channels facilitates the asynchronous interaction between knowledge sources and the blackboard.  The use of interfaces promotes flexibility and testability.

```go
package main

import "fmt"

// Blackboard represents the shared data.
type Blackboard struct {
	text string
	changes chan string
}

// NewBlackboard creates a new Blackboard instance.
func NewBlackboard() *Blackboard {
	return &Blackboard{
		text:     "",
		changes: make(chan string),
	}
}

// GetText retrieves the current text on the blackboard.
func (b *Blackboard) GetText() string {
	return b.text
}

// SetText updates the text on the blackboard and signals changes.
func (b *Blackboard) SetText(text string) {
	b.text = text
	b.changes <- text // Signal that the text has changed
}

// KnowledgeSource defines the interface for components that work with the blackboard.
type KnowledgeSource interface {
	ReactToChange(text string)
}

// SpellCheckSource checks for spelling errors.  (Simplified example)
type SpellCheckSource struct {
	dictionary map[string]bool
}

// NewSpellCheckSource creates a new SpellCheckSource.
func NewSpellCheckSource(dictionary map[string]bool) *SpellCheckSource {
	return &SpellCheckSource{dictionary: dictionary}
}

// ReactToChange checks the given text for spelling errors.
func (s *SpellCheckSource) ReactToChange(text string) {
	words := splitTextIntoWords(text)
	for _, word := range words {
		if !s.dictionary[word] {
			fmt.Printf("Possible spelling error: %s\n", word)
		}
	}
}

// CapitalizationSource checks for capitalization issues. (Simplified example)
type CapitalizationSource struct {}

// NewCapitalizationSource creates a new CapitalizationSource
func NewCapitalizationSource() *CapitalizationSource {
	return &CapitalizationSource{}
}

// ReactToChange checks if the first letter of each sentence is capitalized.
func (c *CapitalizationSource) ReactToChange(text string) {
	sentences := splitTextIntoSentences(text)
	for _, sentence := range sentences {
		if len(sentence) > 0 && !isCapitalized(sentence[0]) {
			fmt.Printf("Sentence should be capitalized: %s\n", sentence)
		}
	}
}

func splitTextIntoWords(text string) []string {
	// Very simple split - improve for production.
	words := []string{}
	currentWord := ""
	for _, r := range text {
		if r == ' ' {
			if currentWord != "" {
				words = append(words, currentWord)
				currentWord = ""
			}
		} else {
			currentWord += string(r)
		}
	}
	if currentWord != "" {
		words = append(words, currentWord)
	}
	return words
}

func splitTextIntoSentences(text string) []string {
	// Very simple split - improve for production.
	sentences := []string{}
	currentSentence := ""
	for _, r := range text {
		if r == '.' || r == '?' || r == '!' {
			currentSentence += string(r)
			sentences = append(sentences, currentSentence)
			currentSentence = ""
		} else {
			currentSentence += string(r)
		}
	}
	return sentences
}

func isCapitalized(r rune) bool {
	return r >= 'A' && r <= 'Z'
}

func main() {
	blackboard := NewBlackboard()
	spellCheck := NewSpellCheckSource(map[string]bool{"hello": true, "world": true, "go": true, "langue": false})
	capitalizationCheck := NewCapitalizationSource()

	// Register knowledge sources
	go func() {
		for text := range blackboard.changes {
			spellCheck.ReactToChange(text)
			capitalizationCheck.ReactToChange(text)
		}
	}()

	blackboard.SetText("hello world. go langue")
	blackboard.SetText("this is a test")

	// Keep the program running to process changes.
	fmt.Scanln()
}
```