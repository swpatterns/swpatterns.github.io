---
title: "Shared-Nothing - Kotlin"
date: 2025-12-03T15:13:42.368-05:00
draft: false
pattern_usage: ["Shared-Nothing"]
language: ["Kotlin"]
---
The Shared-Nothing pattern aims to achieve scalability by distributing data across multiple nodes, where each node has its own dedicated resources (CPU, memory, disk) and does *not* share them with any other node. Communication between nodes happens through explicit message passing. This example demonstrates a simple, in-memory, single-machine simulation using Kotlin coroutines to mimic distributed nodes. Each node (represented by a coroutine) owns a segment of data (a range of integers) and processes requests only pertaining to its segment. Independence and concurrency are key. Kotlin’s coroutines provide a lightweight way to simulate this concurrency.

```kotlin
import kotlinx.coroutines.*

data class Request(val id: Int)

sealed class Response {
    data class Result(val value: Int?) : Response()
    object NotFound : Response()
}

class SharedNothingData(private val data: Map<Int, Int>) {
    fun processRequest(request: Request): Response {
        data[request.id] ?: return Response.NotFound
        return Response.Result(data[request.id]!!)
    }
}

fun main() {
    val nodeCount = 3
    val totalDataSize = 10
    val dataPerNode = totalDataSize / nodeCount

    val nodesData = (0 until nodeCount).associateWith { i ->
        val start = i * dataPerNode
        val end = (i + 1) * dataPerNode
        (start until end).associate { it to it * 2 } // Sample data
    }

    val scope = CoroutineScope(Dispatchers.Default)
    val nodes = nodesData.map { (nodeId, data) ->
        val sharedNothingData = SharedNothingData(data)
        scope.launch {
            // Simulate processing requests
            val request = Request(nodeId * 2) // Request specific to this "node"
            val response = sharedNothingData.processRequest(request)
            println("Node $nodeId processed request ${request.id}: $response")

            val otherRequest = Request(9) // Request to another node
            val otherResponse = sharedNothingData.processRequest(otherRequest)
            println("Node $nodeId processed request ${otherRequest.id}: $otherResponse")
        }
    }

    runBlocking {
        nodes.joinAll()
    }
}
```