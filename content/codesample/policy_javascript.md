---
title: "Policy - JavaScript"
date: 2025-12-03T13:55:19.646-05:00
draft: false
pattern_usage: ["Policy"]
language: ["JavaScript"]
---
The Policy pattern allows you to dynamically apply different behaviors or rules to an object based on certain conditions, without modifying the object itself. It decouples the decision-making logic (the policy) from the object being governed. This is achieved by defining a policy object that contains methods representing different actions. The object delegates the action to the policy, which then determines the appropriate implementation to execute. This implementation uses a simple object literal to represent the policy, and a function to execute the action based on the current context. This approach is common in JavaScript due to its flexible object nature and reliance on function calls.

```javascript
/**
 * Policy Pattern Implementation in JavaScript
 */

// The Context - the object whose behavior is governed by the policy
class User {
  constructor(role) {
    this.role = role;
  }

  canAccessFeature(policy, feature) {
    return policy.canAccess(this.role, feature);
  }
}

// The Policy - defines the rules for access
const accessPolicy = {
  canAccess: (role, feature) => {
    switch (role) {
      case 'admin':
        return true;
      case 'editor':
        return feature === 'edit';
      case 'viewer':
        return feature === 'view';
      default:
        return false;
    }
  }
};

// Example Usage
const adminUser = new User('admin');
const editorUser = new User('editor');
const viewerUser = new User('viewer');

console.log("Admin can access edit:", adminUser.canAccessFeature(accessPolicy, 'edit')); // true
console.log("Editor can access edit:", editorUser.canAccessFeature(accessPolicy, 'edit')); // true
console.log("Viewer can access edit:", viewerUser.canAccessFeature(accessPolicy, 'edit')); // false

console.log("Admin can access view:", adminUser.canAccessFeature(accessPolicy, 'view')); // true
console.log("Editor can access view:", editorUser.canAccessFeature(accessPolicy, 'view')); // false
console.log("Viewer can access view:", viewerUser.canAccessFeature(accessPolicy, 'view')); // true
```