---
title: "Layered Architecture - TypeScript"
date: 2025-12-03T14:03:58.824-05:00
draft: false
pattern_usage: ["Layered Architecture"]
language: ["TypeScript"]
---
The Layered Architecture pattern organizes an application into distinct layers, each with a specific responsibility. This promotes separation of concerns, making the application easier to maintain, test, and evolve. Common layers include Presentation (UI), Business Logic, and Data Access.  Our TypeScript example demonstrates this with `UserController`, `UserService`, and `UserRepository`.  `UserController` handles HTTP requests, delegating to `UserService` for business rules. `UserService` interacts with `UserRepository` for data persistence.  This structure is idiomatic TypeScript due to its use of interfaces (`UserRepository`) for dependency injection and clear type definitions, enhancing code readability and testability.  The separation into classes aligns with TypeScript's OOP capabilities.

```typescript
// src/interfaces/user-repository.ts
interface UserRepository {
  getUser(id: number): Promise<User | null>;
}

// src/models/user.ts
interface User {
  id: number;
  name: string;
  email: string;
}

// src/services/user-service.ts
class UserService {
  constructor(private userRepository: UserRepository) {}

  async getUserDetails(id: number): Promise<User | null> {
    const user = await this.userRepository.getUser(id);
    if (!user) {
      return null;
    }
    // Add business logic here, e.g., data validation, transformation
    return user;
  }
}

// src/controllers/user-controller.ts
import { Request, Response } from 'express';
import { UserService } from '../services/user-service';

class UserController {
  constructor(private userService: UserService) {}

  async getUser(req: Request, res: Response): Promise<void> {
    const userId = parseInt(req.params.id);
    const user = await this.userService.getUserDetails(userId);

    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  }
}

// src/data/in-memory-user-repository.ts
class InMemoryUserRepository implements UserRepository {
  private users: User[] = [
    { id: 1, name: 'John Doe', email: 'john.doe@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com' },
  ];

  async getUser(id: number): Promise<User | null> {
    return this.users.find((user) => user.id === id) || null;
  }
}

// src/index.ts
import express from 'express';
import { UserController } from './controllers/user-controller';
import { UserService } from './services/user-service';
import { InMemoryUserRepository } from './data/in-memory-user-repository';

const app = express();
const port = 3000;

const userRepository = new InMemoryUserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);

app.get('/users/:id', userController.getUser);

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
```