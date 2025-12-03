---
title: "Peer-to-Peer - Go"
date: 2025-12-03T06:25:20.061-05:00
draft: false
pattern_usage: ["Peer-to-Peer"]
language: ["Go"]
---
The Peer-to-Peer (P2P) pattern enables decentralized data sharing and communication directly between nodes (peers) in a network, without relying on a central server. Each peer acts as both a client and a server. This example simulates a simple P2P file sharing system using goroutines and channels in Go. Each peer listens for file requests on a channel and responds with the file data if available. The `shareFile` function distributes the file to connected peers. This design emphasizes concurrency and efficient communication, key tenets of Go.  Using channels and goroutines aligns with Go’s approach to concurrency, avoiding shared memory and locks whenever possible.

```go
package main

import (
	"fmt"
	"sync"
	"time"
)

// Peer represents a node in the P2P network.
type Peer struct {
	ID       int
	files    map[string][]byte
	requests chan request
	response chan []byte
	wg       *sync.WaitGroup
}

// request structure
type request struct {
	fileID int
}

// NewPeer creates a new Peer instance.
func NewPeer(id int, wg *sync.WaitGroup) *Peer {
	return &Peer{
		ID:       id,
		files:    make(map[string][]byte),
		requests: make(chan request),
		response: make(chan []byte),
		wg:       wg,
	}
}

// Run starts the peer's listening loop.
func (p *Peer) Run() {
	defer p.wg.Done()

	go func() {
		for req := range p.requests {
			if data, ok := p.files[req.fileID]; ok {
				p.response <- data
			} else {
				p.response <- nil // File not found
			}
		}
	}()
}

// ShareFile adds a file to the peer's storage.
func (p *Peer) ShareFile(fileID string, data []byte) {
	p.files[fileID] = data
}

// RequestFile sends a request to another peer for a file.
func (p *Peer) RequestFile(peer *Peer, fileID int) []byte {
	p.requests <- request{fileID: fileID}
	return <-p.response
}

func main() {
	var wg sync.WaitGroup
	wg.Add(2)

	peer1 := NewPeer(1, &wg)
	peer2 := NewPeer(2, &wg)

	peer1.Run()
	peer2.Run()

	// Simulate file sharing
	file1Data := []byte("This is the content of file 1.")
	peer1.ShareFile("file1", file1Data)

	// Peer 2 requests file 1 from peer 1
	requestedData := peer2.RequestFile(peer1, 1)

	if requestedData != nil {
		fmt.Println("Peer 2 received file 1:", string(requestedData))
	} else {
		fmt.Println("Peer 2 failed to receive file 1.")
	}
	time.Sleep(1 * time.Second)
	wg.Wait()
}
```