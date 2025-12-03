---
title: "Peer-to-Peer - Swift"
date: 2025-12-03T06:26:21.266-05:00
draft: false
pattern_usage: ["Peer-to-Peer"]
language: ["Swift"]
---
The Peer-to-Peer (P2P) pattern enables direct communication and data exchange between individual nodes (peers) in a network, without relying on a central server. This implementation simulates a basic chat application where peers can send and receive messages directly.  We use a simple `Peer` class to represent each participant.  Each peer maintains a dictionary of connected peers and handles sending/receiving messages via closures.  This leverages Swift’s first-class functions for event handling (message received) and its struct/class flexibility for peer representation. Utilizing dictionaries for peer management is a natural fit for Swift’s associative collections.

```swift
// Peer.swift

import Foundation

class Peer {
    let id: String
    private var connections: [String: Peer] = [:]
    var onMessageReceived: ((String, String) -> Void)?

    init(id: String) {
        self.id = id
    }

    func connect(to peer: Peer) {
        connections[peer.id] = peer
        print("\(id) connected to \(peer.id)")
    }

    func disconnect(from peer: Peer) {
        connections[peer.id] = nil
        print("\(id) disconnected from \(peer.id)")
    }

    func sendMessage(message: String, to peerId: String) {
        guard let targetPeer = connections[peerId] else {
            print("Error: Peer \(peerId) not connected.")
            return
        }
        targetPeer.receiveMessage(message: message, from: id)
    }

    private func receiveMessage(message: String, from peerId: String) {
        print("\(id) received message '\(message)' from \(peerId)")
        onMessageReceived?(peerId, message)
    }
}

// Example Usage
let peer1 = Peer(id: "1")
let peer2 = Peer(id: "2")
let peer3 = Peer(id: "3")

peer1.connect(to: peer2)
peer2.connect(to: peer1)
peer1.connect(to: peer3)

peer1.onMessageReceived = { (senderId, message) in
    print("Peer 1's handler: Received '\(message)' from \(senderId)")
}

peer1.sendMessage(message: "Hello from Peer 1!", to: peer2.id)
peer3.sendMessage(message: "Hi Peer 1!", to: peer1.id)
```