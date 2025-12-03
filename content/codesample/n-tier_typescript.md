---
title: "N-tier - TypeScript"
date: 2025-12-03T14:37:06.476-05:00
draft: false
pattern_usage: ["N-tier"]
language: ["TypeScript"]
---
The N-tier pattern organizes an application into distinct logical layers (tiers), each responsible for a specific aspect of the application. Common tiers include the Presentation Tier (UI), Business Logic Tier (application logic), and Data Access Tier (database interaction). This separation promotes modularity, maintainability, and testability.

This TypeScript example demonstrates a simple 3-tier architecture for managing user data. The `User` class represents the data model. The `UserService` constitutes the business logic, handling user creation and retrieval. Finally, `UserRepository` encapsulates data access, simulating database interactions.  The `main` function in `app.ts` represents the presentation tier, coordinating interactions between the tiers.  Using interfaces (`IUserRepository`) promotes loose coupling and allows for easy dependency injection and testing.  TypeScript's strong typing enhances code clarity and reduces runtime errors, fitting the pattern's goal of maintainability.

```typescript
// Models
interface User {
  id: number;
  name: string;
  email: string;
}

// Data Access Tier
interface IUserRepository {
  getUserById(id: number): Promise<User | null>;
  createUser(user: User): Promise<User>;
}

class InMemoryUserRepository implements IUserRepository {
  private users: User[] = [];

  async getUserById(id: number): Promise<User | null> {
    return this.users.find(u => u.id === id) || null;
  }

  async createUser(user: User): Promise<User> {
    const newUser = { ...user, id: this.users.length + 1 };
    this.users.push(newUser);
    return newUser;
  }
}

// Business Logic Tier
class UserService {
  private userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  async createUser(name: string, email: string): Promise<User> {
    const newUser: User = { id: 0, name, email };
    return this.userRepository.createUser(newUser);
  }

  async getUser(id: number): Promise<User | null> {
    return this.userRepository.getUserById(id);
  }
}

// Presentation Tier (app.ts)
async function main() {
  const userRepository = new InMemoryUserRepository();
  const userService = new UserService(userRepository);

  const newUser = await userService.createUser("Alice", "alice@example.com");
  console.log("Created user:", newUser);

  const retrievedUser = await userService.getUser(1);
  console.log("Retrieved user:", retrievedUser);
}

main();
```