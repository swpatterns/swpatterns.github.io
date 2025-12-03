---
title: "Cluster-based Architecture - Dart"
date: 2025-12-03T15:19:08.297-05:00
draft: false
pattern_usage: ["Cluster-based Architecture"]
language: ["Dart"]
---
The Cluster-based Architecture pattern distributes workload across a group of identical worker nodes (clusters) to improve performance, scalability, and fault tolerance. Each cluster performs the same tasks independently, allowing for parallel processing. A central dispatcher (or load balancer) routes requests to available clusters. In this Dart example, we simulate this by creating multiple `WorkerCluster` instances, each able to process `Job`s, and a `Dispatcher` which distributes jobs amongst them. The use of `Future`s and `async/await` align well with Dart’s asynchronous nature for handling concurrent job processing.

```dart
// worker_cluster.dart
import 'dart:math';

class Job {
  final String id;
  final int processingTime;

  Job({required this.id, required this.processingTime});
}

class WorkerCluster {
  final String name;
  final int id;
  bool isBusy = false;

  WorkerCluster({required this.name, required this.id});

  Future<void> processJob(Job job) async {
    isBusy = true;
    print('Cluster $name ($id) processing job ${job.id} for ${job.processingTime}ms');
    await Future.delayed(Duration(milliseconds: job.processingTime));
    print('Cluster $name ($id) finished job ${job.id}');
    isBusy = false;
  }
}

// dispatcher.dart
class Dispatcher {
  final List<WorkerCluster> clusters;

  Dispatcher({required this.clusters});

  Future<void> dispatchJob(Job job) async {
    final availableCluster = clusters.firstWhere((cluster) => !cluster.isBusy);
    await availableCluster.processJob(job);
  }
}

// main.dart
import 'worker_cluster.dart';
import 'dispatcher.dart';

void main() async {
  final clusters = [
    WorkerCluster(name: 'Alpha', id: 1),
    WorkerCluster(name: 'Beta', id: 2),
    WorkerCluster(name: 'Gamma', id: 3),
  ];

  final dispatcher = Dispatcher(clusters: clusters);

  final jobs = [
    Job(id: 'A', processingTime: 500),
    Job(id: 'B', processingTime: 1000),
    Job(id: 'C', processingTime: 750),
    Job(id: 'D', processingTime: 250),
  ];

  await Future.wait(jobs.map((job) => dispatcher.dispatchJob(job)));

  print('All jobs completed.');
}
```