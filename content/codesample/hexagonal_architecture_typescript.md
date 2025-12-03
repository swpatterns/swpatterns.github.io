---
title: "Hexagonal Architecture - TypeScript"
date: 2025-12-03T14:08:23.940-05:00
draft: false
pattern_usage: ["Hexagonal Architecture"]
language: ["TypeScript"]
---
The Hexagonal Architecture (also known as Ports and Adapters) aims to create loosely coupled, testable, and maintainable software. It achieves this by isolating the application’s core business logic from external concerns like databases, UI, or messaging systems. These external concerns interact with the core through *ports* – interfaces defining interactions. *Adapters* implement these ports to connect to specific technologies. This example demonstrates a simple use case: user authentication.  The core defines a `UserRepository` port, and adapters connect to in-memory and (hypothetically) real database implementations. TypeScript's strong typing and interface support lend themselves beautifully to this pattern, creating clear contracts between the core and adapters.

```typescript
// Core Application Logic (Independent of external frameworks)

// Define the Port (Interface)
interface UserRepository {
    getUser(id: string): User | null;
}

interface AuthenticationService {
    authenticate(username: string, password: string): boolean;
}

interface User {
    id: string;
    username: string;
    passwordHash: string;
}

class CoreAuthenticationService implements AuthenticationService {
    constructor(private userRepository: UserRepository) {}

    authenticate(username: string, password: string): boolean {
        const user = this.userRepository.getUser(username);
        if (!user) {
            return false;
        }

        // In a real application, use a secure password comparison library
        return user.passwordHash === password;
    }
}


// Adapters (Connect core to external frameworks/systems)

// In-Memory Adapter (For testing or simple applications)
class InMemoryUserRepository implements UserRepository {
    private users: User[] = [
        { id: '1', username: 'user1', passwordHash: 'password1' },
        { id: '2', username: 'user2', passwordHash: 'password2' },
    ];

    getUser(id: string): User | null {
        return this.users.find(u => u.username === id);
    }
}

// Example Usage (Composition Root)
function runAuthentication() {
    const userRepository = new InMemoryUserRepository();
    const authenticationService = new CoreAuthenticationService(userRepository);

    const isAuthenticated = authenticationService.authenticate('user1', 'password1');

    console.log('Authentication result:', isAuthenticated); // Output: true
}

runAuthentication();

// In a more complex application, a database adapter would implement the
// UserRepository interface, connecting to a real database.  This allows
// changing the persistence layer without affecting the core logic.
```