---
title: "Proxy - Python"
date: 2025-12-03T12:45:33.065-05:00
draft: false
pattern_usage: ["Proxy"]
language: ["Python"]
---
The Proxy pattern provides a surrogate or placeholder for another object to control access to it. This is useful for scenarios like lazy initialization, access control, or logging.  The proxy object has the same interface as the real object, but it intercepts method calls and performs additional actions before or after forwarding them to the real object.  This implementation uses Python's dynamic nature to achieve this. The `Subject` interface is implicitly defined by the methods called on the proxy. The `RealSubject` is the actual object, and `Proxy` controls access to it, in this case, by printing a message before and after the real subject's method is called. This approach is Pythonic as it leverages duck typing and avoids explicit interface declarations.

```python
class RealSubject:
    def request(self):
        print("RealSubject: Handling request.")

class Proxy:
    def __init__(self, real_subject):
        self.real_subject = real_subject

    def request(self):
        print("Proxy: Logging before request.")
        self.real_subject.request()
        print("Proxy: Logging after request.")

def client_code(subject):
    subject.request()

if __name__ == "__main__":
    real_subject = RealSubject()
    proxy = Proxy(real_subject)

    print("Client: I'm not aware of the RealSubject.")
    client_code(proxy)
```