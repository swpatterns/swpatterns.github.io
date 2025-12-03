---
title: "Onion Architecture - TypeScript"
date: 2025-12-03T14:12:53.212-05:00
draft: false
pattern_usage: ["Onion Architecture"]
language: ["TypeScript"]
---
The Onion Architecture aims for loose coupling and high cohesion by organizing code into concentric layers. The innermost layer represents the Enterprise Rules (core business logic, entities). Middle layers are Interface Adapters (controllers, presenters) that translate data to and from the core. The outermost layer is Infrastructure (databases, UI, third-party libraries). Dependencies point inwards – infrastructure concerns depend on application logic, but the application logic doesn’t depend on infrastructure details. This promotes testability and makes the core resistant to changes in outer layers.

This TypeScript implementation showcases a simplified Onion Architecture. The `entities` directory holds core domain models. `use-cases` or `application` represent the application's use cases and depends on entities.  `interfaces` converts use case outputs for presentation or calling services. `infrastructure` provides concrete implementations for external concerns like data access. Dependency Injection is used for loose coupling. The code adopts standard TypeScript module structure and naming conventions.

```typescript
// entities/user.ts
export interface User {
  id: string;
  name: string;
  email: string;
}

// use-cases/get-user.ts
import { User } from '../entities/user';
import { UserRepository } from '../interfaces/user-repository';

export interface GetUserUseCase {
  getUser(id: string): Promise<User | null>;
}

export class GetUser implements GetUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async getUser(id: string): Promise<User | null> {
    return this.userRepository.getUserById(id);
  }
}

// interfaces/user-repository.ts
import { User } from '../entities/user';

export interface UserRepository {
  getUserById(id: string): Promise<User | null>;
}

// infrastructure/in-memory-user-repository.ts
import { UserRepository } from '../interfaces/user-repository';
import { User } from '../entities/user';

export class InMemoryUserRepository implements UserRepository {
  private users: User[] = [
    { id: '1', name: 'Alice', email: 'alice@example.com' },
    { id: '2', name: 'Bob', email: 'bob@example.com' },
  ];

  async getUserById(id: string): Promise<User | null> {
    const user = this.users.find((u) => u.id === id);
    return user || null;
  }
}

// interfaces/user-controller.ts
import { GetUserUseCase } from '../use-cases/get-user';

export interface UserController {
  getUser(id: string): Promise<string>;
}

// interfaces/user-presenter.ts
import { User } from '../entities/user';

export interface UserPresenter {
  presentUser(user: User): string;
}

// infrastructure/console-user-presenter.ts
export class ConsoleUserPresenter implements UserPresenter {
    presentUser(user: User): string {
        return `User ID: ${user.id}, Name: ${user.name}, Email: ${user.email}`;
    }
}

// interfaces/user-service.ts
export interface UserService {
  getUserDetails(id: string): Promise<string>;
}

// infrastructure/user-service.ts
import { GetUserUseCase } from '../use-cases/get-user';
import { UserPresenter } from '../interfaces/user-presenter';

export class DefaultUserService implements UserService {
  constructor(private getUserUseCase: GetUserUseCase, private userPresenter: UserPresenter) {}

  async getUserDetails(id: string): Promise<string> {
    const user = await this.getUserUseCase.getUser(id);
    if (user) {
      return this.userPresenter.presentUser(user);
    } else {
      return `User with ID ${id} not found.`;
    }
  }
}

// main.ts - Entry Point (Outer Layer)
import { InMemoryUserRepository } from './infrastructure/in-memory-user-repository';
import { GetUser } from './use-cases/get-user';
import { DefaultUserService } from './infrastructure/user-service';
import { ConsoleUserPresenter } from './infrastructure/console-user-presenter';

async function main() {
  const userRepository = new InMemoryUserRepository();
  const getUserUseCase = new GetUser(userRepository);
  const userPresenter = new ConsoleUserPresenter();

  const userService = new DefaultUserService(getUserUseCase, userPresenter);

  const userId = '1';
  const userDetails = await userService.getUserDetails(userId);
  console.log(userDetails); // Output: User ID: 1, Name: Alice, Email: alice@example.com
}

main();
```