---
title: "Proxy - PHP"
date: 2025-12-03T12:48:27.205-05:00
draft: false
pattern_usage: ["Proxy"]
language: ["PHP"]
---
The Proxy pattern provides a surrogate or placeholder for another object to control access to it. This is useful for scenarios like lazy initialization, access control, or logging. In this PHP example, we proxy access to a resource-intensive `RealSubject` (a database connection) through a `ProxySubject`. The proxy delays the connection until it's actually needed (lazy initialization) and can potentially add logging or security checks in a real-world scenario. This implementation utilizes PHP's object-oriented features, defining interfaces for both the subject and the real subject, and then implementing the proxy class to manage access. It's idiomatic PHP due to its use of interfaces for loose coupling and class-based structure.

```php
<?php

/**
 * Interface for the Subject.  Both RealSubject and ProxySubject implement this.
 */
interface SubjectInterface
{
    public function request();
}

/**
 * The RealSubject class. This is the actual object that does the work.
 */
class RealSubject implements SubjectInterface
{
    private $data;

    public function __construct()
    {
        // Simulate a resource-intensive operation (e.g., database connection)
        echo "RealSubject: Initializing expensive resource...\n";
        sleep(2); // Simulate delay
        $this->data = "Real Data";
    }

    public function request()
    {
        echo "RealSubject: Handling request.\n";
        return $this->data;
    }
}

/**
 * The ProxySubject class.  Controls access to the RealSubject.
 */
class ProxySubject implements SubjectInterface
{
    private $realSubject = null;

    public function request()
    {
        if ($this->realSubject === null) {
            $this->realSubject = new RealSubject();
        }

        return $this->realSubject->request();
    }
}

/**
 * Usage example
 */
$proxy = new ProxySubject();

echo "Client: First request...\n";
$proxy->request();

echo "\nClient: Second request (should be faster)...\n";
$proxy->request();

?>
```