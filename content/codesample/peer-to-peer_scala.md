---
title: "Peer-to-Peer - Scala"
date: 2025-12-03T06:27:23.340-05:00
draft: false
pattern_usage: ["Peer-to-Peer"]
language: ["Scala"]
---
The Peer-to-Peer (P2P) pattern allows individual nodes (peers) in a network to directly share resources without relying on a central server. Each peer acts as both a client and a server. This implementation uses Akka actors to represent peers. Each actor holds a shared resource (a simple string in this case) and can respond to requests from other peers to retrieve it. The `PeerSystem` coordinates the creation of peers and facilitates initial message exchange. 

This approach is idiomatic Scala due to its use of actors for concurrent and distributed systems, immutability (the resource string), and message passing, fitting well with Scala’s functional and concurrent programming paradigms.  The actor model handles complexity associated with managing peer connections and requests.

```scala
import akka.actor._
import scala.util.Random

object PeerSystem {
  def main(args: Array[String]): Unit = {
    val system = ActorSystem("PeerSystem")
    val peer1 = system.actorOf(PeerActor.props("Peer 1: Initial Resource"), "peer1")
    val peer2 = system.actorOf(PeerActor.props("Peer 2: Initial Resource"), "peer2")
    val peer3 = system.actorOf(PeerActor.props("Peer 3: Initial Resource"), "peer3")

    // Initial exchange - each peer requests from a random other peer
    peer1 ! PeerActor.RequestResource(peer2)
    peer2 ! PeerActor.RequestResource(peer3)
    peer3 ! PeerActor.RequestResource(peer1)

    //Allow time for messages to process
    Thread.sleep(2000)

    system.terminate()
  }
}

object PeerActor {
  sealed trait Message
  case class RequestResource(requester: ActorRef) extends Message
  case class Resource(data: String) extends Message

  def props(initialResource: String) = Props(new PeerActor(initialResource))
}

class PeerActor(initialResource: String) extends Actor {
  import PeerActor._
  var resource = initialResource

  override def receive: Receive = {
    case RequestResource(requester) =>
      println(s"${self.path.name} received request from ${requester.path.name}")
      requester ! Resource(resource)
    case Resource(data) =>
      println(s"${self.path.name} received resource from ${sender().path.name}: ${data}")
      resource = data //Update resource with received data
    case _ => println(s"${self.path.name} received unknown message")
  }
}
```