---
title: "Peer-to-Peer - JavaScript"
date: 2025-12-03T06:21:30.281-05:00
draft: false
pattern_usage: ["Peer-to-Peer"]
language: ["JavaScript"]
---
The Peer-to-Peer (P2P) pattern establishes direct connections between participants in a network, removing the need for a central server to mediate all communication after initial discovery. This improves scalability and resilience. This JavaScript example uses WebRTC Data Channels for P2P communication, facilitated by a simple signaling server (not included in this snippet - a small Node.js server would be typical).  Clients initiate connections as 'initiators' or 'receivers' and exchange messages directly once established. This approach leverages JavaScript's asynchronous nature via Promises for managing connection states and message handling, aligning with its event-driven paradigm.  It avoids complex server-side logic where possible, pushing communication to the clients.

```javascript
// p2p.js

const peerConnection = new RTCPeerConnection();

// Signaling is assumed to be handled elsewhere (e.g. WebSocket server)

// Function to initiate a connection (Initiator)
async function initiateConnection(remoteDescription) {
  try {
    await peerConnection.setRemoteDescription(remoteDescription);
    const answer = await peerConnection.createAnswer();
    await peerConnection.setLocalDescription(answer);
    return answer;
  } catch (error) {
    console.error("Initiate Connection Error:", error);
    return null;
  }
}


// Function to receive a connection (Receiver)
async function receiveConnection(remoteDescription) {
  try {
    await peerConnection.setRemoteDescription(remoteDescription);
    const localDescription = await peerConnection.createAnswer();
    await peerConnection.setLocalDescription(localDescription);
    return localDescription;
  } catch (error) {
    console.error("Receive Connection Error:", error);
    return null;
  }
}

// Handle incoming data channel messages
peerConnection.ondatachannel = (event) => {
  const dataChannel = event.channel;
  dataChannel.onmessage = (event) => {
    console.log("Received message:", event.data);
  };

  dataChannel.onopen = () => {
    console.log("Data Channel opened");
  };

  dataChannel.onclose = () => {
    console.log("Data Channel closed");
  };

  dataChannel.onerror = (error) => {
    console.error("Data Channel error:", error);
  };
};

// Function to send a message
function sendMessage(message) {
  const dataChannel = peerConnection.createDataChannel("myChannel");
  dataChannel.send(message);

  dataChannel.onopen = () => {
    console.log("Channel opened for sending");
  };

  dataChannel.onerror = (error) => {
    console.error("Channel error:", error);
  };
}

//Example usage (Simulated signaling - in real life this is done via a server)
// Initiator side:
// const remoteDescription = await initiateConnection(...);
// Receiver side:
// await receiveConnection(remoteDescription);
//Then in either side call sendMessage(...) to send the message

export { initiateConnection, receiveConnection, sendMessage };
```