---
title: "Peer-to-Peer - TypeScript"
date: 2025-12-03T06:23:30.416-05:00
draft: false
pattern_usage: ["Peer-to-Peer"]
language: ["TypeScript"]
---
The Peer-to-Peer (P2P) pattern establishes direct communication channels between nodes (peers) in a network, eliminating the need for a central server. Each peer acts as both a client and a server, sharing resources and data directly with others. This implementation uses WebRTC Data Channels in TypeScript to create P2P connections between browsers. Each browser instance represents a peer, and utilizes signaling (omitted for brevity, but typically handled by a server) to discover and connect to other peers. Once connected, data can be sent and received directly, enabling real-time communication without intermediary servers for data transfer. TypeScript's strong typing and class-based structure promote organization and maintainability, fitting well with the complex coordination required in a P2P system.

```typescript
// peer.ts
class Peer {
  private dataChannel: RTCDataChannel | null = null;
  private peerConnection: RTCPeerConnection | null = null;
  private remotePeerId: string | null = null;

  constructor() {
    this.createPeerConnection();
    this.createDataChannel();
  }

  private createPeerConnection(): void {
    this.peerConnection = new RTCPeerConnection();

    this.peerConnection.ondatachannel = (event) => {
      this.dataChannel = event.channel;
      this.dataChannel.onmessage = (event) => {
        console.log(`Received message from peer ${this.remotePeerId}: ${event.data}`);
      };
      this.dataChannel.onopen = () => {
        console.log(`Data channel open with peer ${this.remotePeerId}`);
      }
    };

    this.peerConnection.onicecandidate = (event) => {
      if (event.candidate) {
        //In a real application, you would send this to the signaling server.
        console.log("ICE candidate:", event.candidate);
      }
    };
  }

  private createDataChannel(): void {
    this.dataChannel = this.peerConnection!.createDataChannel('myChannel');
    this.dataChannel.onopen = () => {
      console.log('Data channel is open.');
    };
  }

  async connectToPeer(peerId: string, offer: RTCSessionDescription): Promise<void> {
    this.remotePeerId = peerId;
    await this.peerConnection!.setRemoteDescription(offer);
    const answer = await this.peerConnection!.createAnswer();
    await this.peerConnection!.setLocalDescription(answer);
    //In a real application, you would send the answer to the signaling server.
    console.log("Answer (for signaling):", answer);
  }
  
  async createOffer(): Promise<RTCSessionDescription> {
    const offer = await this.peerConnection!.createOffer();
    await this.peerConnection!.setLocalDescription(offer);
    //In a real application, you would send the offer to the signaling server.
    console.log("Offer (for signaling):", offer);
    return offer;
  }

  sendMessage(message: string): void {
    if (this.dataChannel) {
      this.dataChannel.send(message);
    }
  }
}

// Example usage in a browser environment (HTML would be needed similarly)
document.addEventListener('DOMContentLoaded', () => {
  const peer1 = new Peer();
  const peer2 = new Peer();

  const sendButton = document.getElementById('sendButton') as HTMLButtonElement;
  const messageInput = document.getElementById('messageInput') as HTMLInputElement;

  sendButton.addEventListener('click', () => {
    peer1.sendMessage(messageInput.value);
    messageInput.value = "";
  });
  
  peer1.createOffer().then(offer => {
        //Simulate sending offer to peer2 (normally via a signaling server)
        peer2.connectToPeer("peer2", offer);
  });
});
```