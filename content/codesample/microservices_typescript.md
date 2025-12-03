---
title: "Microservices - TypeScript"
date: 2025-12-03T14:42:08.927-05:00
draft: false
pattern_usage: ["Microservices"]
language: ["TypeScript"]
---
The Microservices pattern structures an application as a collection of loosely coupled, independently deployable services, modeled around a business domain. Each service owns its data and communicates via lightweight mechanisms, often an HTTP REST API. This example demonstrates a simplified implementation with two services: `UserService` and `ProfileService`. They communicate via HTTP requests. TypeScript's modularity and strong typing are well-suited for defining clear service boundaries and interfaces.  The use of Express.js provides a straightforward way to create RESTful APIs, and asynchronous functions (using `async/await`) handle the communication between services cleanly.

```typescript
// userService.ts
import express from 'express';
import { v4 as uuidv4 } from 'uuid';

const app = express();
const port = 3001;

interface User {
  id: string;
  name: string;
  email: string;
}

const users: User[] = [];

app.get('/users', (req, res) => {
  res.json(users);
});

app.post('/users', async (req, res) => {
  const { name, email } = req.body;
  const newUser: User = { id: uuidv4(), name, email };
  users.push(newUser);
  // Simulate calling ProfileService to create a profile
  await createProfile(newUser.id, name);
  res.status(201).json(newUser);
});

async function createProfile(userId: string, userName: string): Promise<void> {
  const profileResponse = await fetch('http://localhost:3002/profiles', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId, userName }),
  });

  if (!profileResponse.ok) {
    throw new Error(`Failed to create profile: ${profileResponse.status}`);
  }
}

app.listen(port, () => {
  console.log(`UserService listening on port ${port}`);
});

// profileService.ts
import express from 'express';

const app = express();
const port = 3002;

interface Profile {
  id: string;
  userId: string;
  userName: string;
  bio: string;
}

const profiles: Profile[] = [];

app.post('/profiles', (req, res) => {
  const { userId, userName } = req.body;
  const newProfile: Profile = { id: userId, userId, userName, bio: 'Default Bio' };
  profiles.push(newProfile);
  res.status(201).json(newProfile);
});

app.get('/profiles', (req, res) => {
    res.json(profiles);
});

app.listen(port, () => {
  console.log(`ProfileService listening on port ${port}`);
});
```