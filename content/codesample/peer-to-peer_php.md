---
title: "Peer-to-Peer - PHP"
date: 2025-12-03T06:27:03.050-05:00
draft: false
pattern_usage: ["Peer-to-Peer"]
language: ["PHP"]
---
The Peer-to-Peer (P2P) pattern enables direct communication and data exchange between independent components ("peers") without relying on a central server or intermediary. Each peer acts as both a client and a server, discovering and interacting with other peers directly. This implementation uses simple file-based "discovery" to allow peers to find each other.  Each peer writes its address to a shared `peers.txt` file. Then, another peer reads this file to discover addresses for connection. PHP's file system functions and basic socket programming are utilized for simplicity—a production system would use more robust discovery mechanisms.

```php
<?php

/**
 * Peer-to-Peer Example in PHP
 */

class Peer {
  private $address;
  private $port;

  public function __construct(string $address, int $port) {
    $this->address = $address;
    $this->port = $port;
  }

  public function publishPeer(string $peersFile): void {
    file_put_contents($peersFile, $this->address . ":" . $this->port . PHP_EOL, FILE_APPEND);
  }

  public function discoverPeers(string $peersFile): array {
    $peers = [];
    $lines = file($peersFile, FILE_IGNORE_NEW_LINES);

    if ($lines) {
      foreach ($lines as $line) {
        list($addr, $port) = explode(":", $line);
        $peers[] = new self($addr, (int)$port);
      }
    }

    return $peers;
  }

  public function communicate(Peer $peer, string $message): string {
    // Simple socket communication (error handling omitted for brevity)
    $socket = socket_create(AF_INET, SOCK_STREAM, SOL_TCP);
    socket_connect($socket, $peer->address, $peer->port);
    socket_send($socket, $message, strlen($message), 0);
    $response = socket_read($socket, 2048);
    socket_close($socket);

    return $response;
  }

  public function getAddress(): string {
      return $this->address . ":" . $this->port;
  }
}

// Example Usage:
$peersFile = 'peers.txt';

// Peer 1 (Publishes itself)
$peer1 = new Peer('127.0.0.1', 8000);
$peer1->publishPeer($peersFile);
echo "Peer 1 published: " . $peer1->getAddress() . PHP_EOL;

// Peer 2 (Publishes itself)
$peer2 = new Peer('127.0.0.1', 8001);
$peer2->publishPeer($peersFile);
echo "Peer 2 published: " . $peer2->getAddress() . PHP_EOL;

// Peer 3 (Discovers and communicates)
$peer3 = new Peer('127.0.0.1', 8002);
$peers = $peer3->discoverPeers($peersFile);
echo "Peer 3 discovered peers: " . PHP_EOL;
foreach($peers as $peer){
    echo "  - " . $peer->getAddress() . PHP_EOL;
}

if ($peers) {
    $response = $peer3->communicate($peers[0], "Hello from Peer 3!");
    echo "Peer 3 received: " . $response . PHP_EOL;
} else {
    echo "No peers discovered." . PHP_EOL;
}

?>
```