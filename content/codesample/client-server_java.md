---
title: "Client-Server - Java"
date: 2025-12-03T14:31:45.828-05:00
draft: false
pattern_usage: ["Client-Server"]
language: ["Java"]
---
The Client-Server pattern decouples an application into two distinct parts: a client requesting services and a server providing those services. This allows for scalability, maintainability, and the potential for multiple clients to access the same server. This Java example uses sockets to establish communication. The server listens for client connections and processes requests (in this case, simply echoing back the client's message). The client connects to the server, sends a message, and receives the response. The implementation utilizes Java's networking classes following standard thread handling for concurrency. This aligns with Java's robust network support and object-oriented approach for structuring networked applications.

```java
import java.io.*;
import java.net.*;

// Server.java
class Server {
    public static void main(String[] args) throws IOException {
        ServerSocket serverSocket = new ServerSocket(9999);
        System.out.println("Server listening on port 9999...");

        while (true) {
            Socket clientSocket = serverSocket.accept();
            new Thread(new ClientHandler(clientSocket)).start();
        }
    }
}

class ClientHandler implements Runnable {
    private final Socket clientSocket;

    public ClientHandler(Socket socket) {
        this.clientSocket = socket;
    }

    public void run() {
        try {
            BufferedReader in = new BufferedReader(new InputStreamReader(clientSocket.getInputStream()));
            PrintWriter out = new PrintWriter(clientSocket.getOutputStream(), true);

            String inputLine;
            while ((inputLine = in.readLine()) != null) {
                System.out.println("Received from client: " + inputLine);
                out.println("Server received: " + inputLine);
            }
        } catch (IOException e) {
            System.err.println("Error handling client: " + e.getMessage());
        } finally {
            try {
                clientSocket.close();
            } catch (IOException e) {
                System.err.println("Error closing socket: " + e.getMessage());
            }
        }
    }
}

// Client.java
class Client {
    public static void main(String[] args) throws IOException {
        Socket socket = new Socket("localhost", 9999);
        BufferedReader in = new BufferedReader(new InputStreamReader(socket.getInputStream()));
        PrintWriter out = new PrintWriter(socket.getOutputStream(), true);

        String message = "Hello from the client!";
        out.println(message);
        System.out.println("Sent to server: " + message);

        String response = in.readLine();
        System.out.println("Received from server: " + response);

        socket.close();
    }
}
```