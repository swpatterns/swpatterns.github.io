---
title: "Peer-to-Peer - Python"
date: 2025-12-03T06:21:07.773-05:00
draft: false
pattern_usage: ["Peer-to-Peer"]
language: ["Python"]
---
The Peer-to-Peer (P2P) pattern establishes direct communication and data exchange between individual nodes (peers) in a network, without relying on a centralized server. Each peer acts as both client and server. This example simulates a simple P2P chat application where peers can connect and send messages directly to each other.  The implementation uses Python’s sockets for network communication. Threads handle concurrent message sending and receiving for each peer. This approach aligns with Python’s concurrency capabilities and network programming libraries, providing a relatively clean and straightforward implementation suitable for prototyping a P2P system.

```python
import socket
import threading

class Peer:
    def __init__(self, host, port):
        self.host = host
        self.port = port
        self.socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        self.socket.bind((self.host, self.port))
        self.socket.listen()
        self.connections = []

    def start(self):
        print(f"Peer listening on {self.host}:{self.port}")
        while True:
            conn, addr = self.socket.accept()
            print(f"Connection from {addr}")
            self.connections.append(conn)
            thread = threading.Thread(target=self.handle_connection, args=(conn, addr))
            thread.daemon = True  # Allow program to exit when only daemon threads remain
            thread.start()

    def handle_connection(self, conn, addr):
        while True:
            try:
                data = conn.recv(1024)
                if not data:
                    break
                message = data.decode('utf-8')
                print(f"Received from {addr}: {message}")
            except ConnectionResetError:
                print(f"Connection to {addr} reset.")
                break
            except Exception as e:
                print(f"Error handling connection from {addr}: {e}")
                break

    def send_message(self, peer_host, peer_port, message):
        try:
            with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as sock:
                sock.connect((peer_host, peer_port))
                sock.sendall(message.encode('utf-8'))
        except Exception as e:
            print(f"Error sending message to {peer_host}:{peer_port}: {e}")

if __name__ == "__main__":
    peer1_host = '127.0.0.1'
    peer1_port = 5555

    peer2_host = '127.0.0.1'
    peer2_port = 5556

    peer1 = Peer(peer1_host, peer1_port)
    peer2 = Peer(peer2_host, peer2_port)

    thread1 = threading.Thread(target=peer1.start)
    thread2 = threading.Thread(target=peer2.start)

    thread1.daemon = True
    thread2.daemon = True

    thread1.start()
    thread2.start()


    # Example usage (send a message from peer1 to peer2)
    peer1.send_message(peer2_host, peer2_port, "Hello from Peer 1!")
    
    import time
    time.sleep(5) # Keep the script running to allow for communication
```