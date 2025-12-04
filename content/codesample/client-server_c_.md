---
title: "Client-Server - C#"
date: 2025-12-03T14:32:46.143-05:00
draft: false
pattern_usage: ["Client-Server"]
language: ["C_sharp"]
---
The Client-Server pattern decouples an application into two parts: a server that provides a resource or service, and a client that requests and consumes that resource. This improves modularity, scalability, and allows for different technologies to be used for each component. This C# example utilizes `TcpListener` for the server and `TcpClient` for the client to communicate over a network socket. The server listens for incoming connections, receives messages, processes them (in this simplified case, just echoing back), and sends a response.  The client connects to the server, sends a message, receives the response, and then disconnects. This approach is common in C# network programming due to its straightforward implementation and strong support for threading.

```csharp
 // Server.cs
 using System;
 using System.Net;
 using System.Net.Sockets;
 using System.Text;
 using System.Threading;

 public class Server
 {
     public static void Main(string[] args)
     {
         TcpListener server = null;
         try
         {
             Int32 port = 13000;
             server = new TcpListener(IPAddress.Any, port);
             server.Start();

             Console.WriteLine($"Server listening on port {port}...");

             while (true)
             {
                 TcpClient client = server.AcceptTcpClient();
                 Console.WriteLine("Client connected.");

                 ThreadPool.QueueUserWorkItem(HandleClient, client);
             }
         }
         catch (Exception e)
         {
             Console.WriteLine($"Error: {e.ToString()}");
         }
         finally
         {
             server?.Stop();
         }
     }

     private static void HandleClient(object clientObj)
     {
         TcpClient client = (TcpClient)clientObj;
         NetworkStream stream = client.GetStream();
         byte[] bytes = new byte[1024];

         try
         {
             int i = stream.Read(bytes, 0, bytes.Length);
             string data = Encoding.ASCII.GetString(bytes, 0, i);
             Console.WriteLine($"Received: {data}");

             string response = "Server received: " + data;
             byte[] msg = Encoding.ASCII.GetBytes(response);
             stream.Write(msg, 0, msg.Length);
             Console.WriteLine("Sent: " + response);
         }
         catch (Exception e)
         {
             Console.WriteLine($"Error handling client: {e.ToString()}");
         }
         finally
         {
             client.Close();
         }
     }
 }

 // Client.cs
 using System;
 using System.Net.Sockets;
 using System.Text;

 public class Client
 {
     public static void Main(string[] args)
     {
         try
         {
             TcpClient client = new TcpClient("127.0.0.1", 13000);

             NetworkStream stream = client.GetStream();
             string message = "Hello from the client!";
             byte[] data = Encoding.ASCII.GetBytes(message);

             stream.Write(data, 0, data.Length);
             Console.WriteLine($"Sent: {message}");

             byte[] bytes = new byte[1024];
             int i = stream.Read(bytes, 0, bytes.Length);
             string response = Encoding.ASCII.GetString(bytes, 0, i);
             Console.WriteLine($"Received: {response}");

             stream.Close();
             client.Close();
         }
         catch (Exception e)
         {
             Console.WriteLine($"Error: {e.ToString()}");
         }
     }
 }
```