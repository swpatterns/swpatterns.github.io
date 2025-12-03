---
title: "Clean Architecture - TypeScript"
date: 2025-12-03T14:17:15.739-05:00
draft: false
pattern_usage: ["Clean Architecture"]
language: ["TypeScript"]
---
The Clean Architecture pattern advocates for separating concerns into distinct layers: Entities (core business rules), Use Cases (application-specific logic), Interface Adapters (presenters, controllers, gateways), and Frameworks & Drivers (database, UI). The goal is to make the core business logic independent of external concerns like databases or frameworks.

This TypeScript implementation demonstrates a simplified Clean Architecture. `entities` define core data structures. `use-cases` contain business logic—in this case, a simple user creation operation. `interface-adapters` handle request/response formatting, translating between use-case models and external formats. A `controller` receives input and invokes the use case, and a simple `cli` handles output.  TypeScript’s strong typing and module system naturally support the separation of concerns. Dependency Injection isn’t explicitly shown for brevity, but is a common companion in a full implementation.

```typescript
// entities/user.ts
export interface User {
  id: string;
  name: string;
  email: string;
}

// use-cases/create-user.ts
import { User } from '../entities/user';
import { UserRepository } from '../interface-adapters/user-repository';

export interface CreateUserUseCase {
  createUser(name: string, email: string): User;
}

export class CreateUser implements CreateUserUseCase {
  constructor(private userRepository: UserRepository) {}

  createUser(name: string, email: string): User {
    const user = { id: crypto.randomUUID(), name, email };
    this.userRepository.save(user);
    return user;
  }
}

// interface-adapters/user-repository.ts
import { User } from '../entities/user';

export interface UserRepository {
  save(user: User): void;
  getById(id: string): User | undefined;
}

// interface-adapters/user-presenter.ts
import { User } from '../entities/user';

export interface UserPresenter {
  presentUser(user: User): string;
}

export class ConsoleUserPresenter implements UserPresenter {
  presentUser(user: User): string {
    return `User created with ID: ${user.id}, Name: ${user.name}, Email: ${user.email}`;
  }
}

// frameworks & drivers/cli.ts
import { CreateUser, CreateUserUseCase } from '../use-cases/create-user';
import { InMemoryUserRepository } from '../interface-adapters/in-memory-user-repository';
import { ConsoleUserPresenter, UserPresenter } from '../interface-adapters/user-presenter';

class CLI {
  constructor(
    private createUserUseCase: CreateUserUseCase,
    private userPresenter: UserPresenter
  ) {}

  async run(): Promise<void> {
    const name = prompt('Enter user name:');
    const email = prompt('Enter user email:');

    if (!name || !email) {
      console.error('Name and email are required.');
      return;
    }

    const newUser = this.createUserUseCase.createUser(name, email);
    console.log(this.userPresenter.presentUser(newUser));
  }
}

// framework and driver - for testing
class InMemoryUserRepository implements UserRepository {
    private users: User[] = [];

    save(user: User): void {
        this.users.push(user);
    }

    getById(id: string): User | undefined {
        return this.users.find(u => u.id === id);
    }
}

// Main entry point (could be an Express route, etc.)
const userRepository = new InMemoryUserRepository(); //Injected dependency
const createUserUseCase = new CreateUser(userRepository);
const userPresenter = new ConsoleUserPresenter();
const cli = new CLI(createUserUseCase, userPresenter);

cli.run();

// Simple prompt function (necessary for a standalone example)
function prompt(message: string): string {
    const readline = require('readline').createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    return new Promise<string>((resolve) => {
      readline.question(message, (answer) => {
        readline.close();
        resolve(answer);
      });
    });
  }
```