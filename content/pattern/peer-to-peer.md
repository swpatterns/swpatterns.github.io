
---
title: Peer-to-Peer
date: 2024-02-29T10:30:00Z
draft: false
pattern_types: ["distributed", "structural", "networking"]
wikipedia: "https://en.wikipedia.org/wiki/Peer-to-peer"
diagramtype: "sequence"
diagram: "participant Alice\nparticipant Bob\nparticipant Charlie\n\nAlice->>Bob: Request file\nBob-->>Alice: Send file\nAlice->>Charlie: Request file\nCharlie-->>Alice: Send file"
code: true
---

The Peer-to-Peer (P2P) pattern is a distributed application architecture that eliminates the need for a central server. Instead, individual nodes (peers) in the network share resources directly with each other. Each peer acts as both a client and a server, contributing its own resources (storage, bandwidth, processing power) to the network and consuming resources from other peers. This decentralization offers benefits like increased resilience, scalability, and reduced costs.

This pattern is particularly useful in scenarios where centralized control is undesirable or impractical, such as file sharing, content distribution, and collaborative systems. It's also well-suited for applications that require high availability and can tolerate some level of inconsistency.  P2P networks can be structured (with defined topologies) or unstructured (random connections), each offering different trade-offs in terms of efficiency and robustness.

## Usage

*   **File Sharing:**  Applications like BitTorrent rely heavily on P2P to distribute large files efficiently. Users download pieces of a file from multiple peers simultaneously, reducing the load on any single source.
*   **Cryptocurrencies:** Blockchain technologies, like those powering Bitcoin and Ethereum, are fundamentally P2P. Transactions are broadcast to the network and validated by multiple peers, ensuring security and transparency.
*   **Decentralized Social Networks:** Platforms like Mastodon utilize P2P principles through federated servers (instances) that communicate with each other, allowing users to interact across different communities without a single point of control.
*   **Collaborative Editing:**  Some real-time collaborative editing tools use P2P to synchronize changes between users directly, reducing latency and improving responsiveness.

## Examples

*   **BitTorrent:** A widely used protocol for P2P file sharing.  Users download and upload file segments concurrently, creating a swarm of peers that collectively distribute the content.  The tracker initially helps peers find each other, but the actual file transfer happens directly between peers.
*   **IPFS (InterPlanetary File System):** A P2P hypermedia protocol designed to make the web faster, safer, and more open.  Content is addressed by its hash, and nodes store and serve content based on demand, creating a distributed content-addressable storage system.
*   **WebRTC:** A free and open-source project that provides real-time communication capabilities directly between browsers and mobile applications. It uses P2P connections for audio and video streaming, eliminating the need for a dedicated signaling server for media transfer (though signaling is still required for connection setup).
