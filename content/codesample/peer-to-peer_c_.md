---
title: "Peer-to-Peer - C#"
date: 2025-12-03T06:24:00.943-05:00
draft: false
pattern_usage: ["Peer-to-Peer"]
language: ["C_sharp"]
---
The Peer-to-Peer (P2P) pattern establishes direct communication and data exchange between independent components (peers) without relying on a central server. Each peer acts as both a client and a server, discovering and connecting to other peers. This example utilizes .NET's built-in TCP networking capabilities to simulate a simple P2P chat application. Each peer listens for incoming connections and can initiate connections to other peers.  Messages are sent directly between connected peers. This implementation is idiomatic C# due to its use of `async/await` for non-blocking network operations, `using` statements for resource management, and clear class structure representing peer functionality.

```csharp
using System;
using System.Net;
using System.Net.Sockets;
using System.Text;
using System.Threading.Tasks;

public class Peer
{
    private readonly int _port;
    private readonly string _name;
    private TcpListener _listener;
    private bool _isRunning = false;

    public Peer(int port, string name)
    {
        _port = port;
        _name = name;
    }

    public async Task Start()
    {
        _listener = new TcpListener(IPAddress.Any, _port);
        _listener.Start();
        _isRunning = true;

        Console.WriteLine($"Peer {_name} started on port {_port}");

        while (_isRunning)
        {
            TcpClient client = await _listener.AcceptTcpClientAsync();
            _ = HandleClientAsync(client); //Fire and forget
        }
    }

    public async Task ConnectToPeerAsync(string ipAddress, int port)
    {
        try
        {
            TcpClient client = new TcpClient();
            await client.ConnectAsync(IPAddress.Parse(ipAddress), port);
            _ = HandleClientAsync(client);
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Failed to connect to {ipAddress}:{port} - {ex.Message}");
        }
    }


    private async Task HandleClientAsync(TcpClient client)
    {
        using (client)
        using (NetworkStream stream = client.GetStream())
        {
            byte[] buffer = new byte[1024];
            int bytesRead;

            while ((bytesRead = await stream.ReadAsync(buffer, 0, buffer.Length)) > 0)
            {
                string message = Encoding.UTF8.GetString(buffer, 0, bytesRead);
                Console.WriteLine($"Received from {client.Client.RemoteEndPoint}: {message}");
            }
        }
        Console.WriteLine("Client disconnected");
    }

    public async Task SendMessageAsync(string message, TcpClient client)
    {
        if (client.Connected)
        {
            byte[] buffer = Encoding.UTF8.GetBytes(message);
            NetworkStream stream = client.GetStream();
            await stream.WriteAsync(buffer, 0, buffer.Length);
            await stream.FlushAsync();
        }
        else {
            Console.WriteLine("Client not connected. Message not sent.");
        }
    }

    public void Stop()
    {
        _isRunning = false;
        _listener.Stop();
        Console.WriteLine($"Peer {_name} stopped.");
    }
}

public class Program
{
    public static async Task Main(string[] args)
    {
        Peer peer1 = new Peer(12345, "Peer 1");
        Peer peer2 = new Peer(12346, "Peer 2");

        Task startPeer1 = peer1.Start();
        Task startPeer2 = peer2.Start();

        //Connect Peer 2 to Peer 1
        await peer2.ConnectToPeerAsync("127.0.0.1", 12345);

        Console.WriteLine("Press any key to stop...");
        Console.ReadKey();

        peer1.Stop();
        peer2.Stop();
    }
}
```