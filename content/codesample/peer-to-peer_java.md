---
title: "Peer-to-Peer - Java"
date: 2025-12-03T06:20:43.128-05:00
draft: false
pattern_usage: ["Peer-to-Peer"]
language: ["Java"]
---
The Peer-to-Peer (P2P) pattern distributes application logic and data among multiple independent nodes (peers), rather than relying on a central server. Each peer functions as both a client and a server, directly communicating with other peers. This example simulates a simple chat application where peers can send messages directly to each other.  It uses Java's networking capabilities (Sockets and Threads) to establish peer connections and handle message exchange.  The use of Threads allows multiple peers to be handled concurrently.  The class structure and straightforward approach fit Java’s typical network programming style.

```java
import java.io.*;
import java.net.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

public class Peer {

    private static final int PORT = 12345;
    private static final String PROMPT = "> ";
    private List<ConnectionHandler> connections;

    public Peer() {
        connections = new ArrayList<>();
    }

    public static void main(String[] args) {
        if (args.length == 0) {
            System.out.println("Usage: java Peer <peer_id> [<peer_address>:<peer_port>]...");
            return;
        }

        Peer peer = new Peer();
        String peerId = args[0];

        for (int i = 1; i < args.length; i++) {
            String peerAddressPort = args[i];
            String[] parts = peerAddressPort.split(":");
            String address = parts[0];
            int port = Integer.parseInt(parts[1]);

            peer.connectToPeer(address, port, peerId);
        }


        peer.listenForConnections(peerId);
        peer.startChat(peerId);

    }

    public void connectToPeer(String address, int port, String peerId) {
        try {
            Socket socket = new Socket(address, port);
            ConnectionHandler handler = new ConnectionHandler(socket, peerId, this);
            connections.add(handler);
            new Thread(handler).start();
            System.out.println("Connected to peer at " + address + ":" + port);
        } catch (IOException e) {
            System.err.println("Could not connect to " + address + ":" + port + ": " + e.getMessage());
        }
    }

    public void listenForConnections(String peerId) {
        try (ServerSocket serverSocket = new ServerSocket(PORT)) {
            System.out.println("Listening on port " + PORT);
            while (true) {
                Socket socket = serverSocket.accept();
                ConnectionHandler handler = new ConnectionHandler(socket, peerId, this);
                connections.add(handler);
                new Thread(handler).start();
                System.out.println("New peer connected: " + socket.getInetAddress().getHostAddress());
            }
        } catch (IOException e) {
            System.err.println("Error listening for connections: " + e.getMessage());
        }
    }

    public void sendMessage(String recipientAddress, int recipientPort, String message, String senderId) {
        try {
            Socket socket = new Socket(recipientAddress, recipientPort);
            PrintWriter out = new PrintWriter(socket.getOutputStream(), true);
            out.println(senderId + ": " + message);
            socket.close();
        } catch (IOException e) {
            System.err.println("Error sending message to " + recipientAddress + ":" + recipientPort + ": " + e.getMessage());
        }
    }
    
    public void startChat(String peerId) {
        Scanner scanner = new Scanner(System.in);

        while (true) {
            System.out.print(peerId + PROMPT);
            String message = scanner.nextLine();
            if (message.equals("exit")) {
                break;
            }

            //Simple example - send to all connected peers
            for(ConnectionHandler connection : connections){
                sendMessage(connection.getAddress(), connection.getPort(), message, peerId);
            }

        }
        scanner.close();
        System.exit(0);
    }
}

class ConnectionHandler implements Runnable {
    private Socket socket;
    private String peerId;
    private Peer peer;

    public ConnectionHandler(Socket socket, String peerId, Peer peer) {
        this.socket = socket;
        this.peerId = peerId;
        this.peer = peer;
    }

    public String getAddress() {
        return socket.getInetAddress().getHostAddress();
    }

    public int getPort() {
        return socket.getPort();
    }


    @Override
    public void run() {
        try (BufferedReader in = new BufferedReader(new InputStreamReader(socket.getInputStream()))) {
            String message;
            while ((message = in.readLine()) != null) {
                System.out.println("Received from " + getAddress() + ":" + getPort() + ": " + message);
            }
        } catch (IOException e) {
            System.err.println("Error handling connection: " + e.getMessage());
        }
    }
}
```