---
title: "Template Method - C"
date: 2025-12-03T13:38:21.251-05:00
draft: false
pattern_usage: ["Template Method"]
language: ["C"]
---
The Template Method pattern defines the skeleton of an algorithm in a base class, deferring some steps to subclasses. It lets subclasses redefine certain steps of an algorithm without changing the algorithm's structure. In this C implementation, `AbstractOperation` is the abstract base class defining the overall operation with `execute()` as the template method. Concrete operation classes (`ConcreteOperationA`, `ConcreteOperationB`) implement the abstract `performOperation()` to provide specific behavior. This avoids code duplication while maintaining a consistent workflow across different operations. C's function pointers facilitate this pattern, allowing the base class to call the subclass's implementation.

```c
#include <stdio.h>

// Abstract Class
typedef struct AbstractOperation {
    void (*performOperation)(struct AbstractOperation* self); // Function pointer
    void (*step1)(struct AbstractOperation* self);
    void (*step2)(struct AbstractOperation* self);
} AbstractOperation;

void abstract_operation_step1(AbstractOperation* self) {
    printf("AbstractOperation: Step 1\n");
}

void abstract_operation_step2(AbstractOperation* self) {
    printf("AbstractOperation: Step 2\n");
}

void abstract_operation_execute(AbstractOperation* self) {
    self->step1(self);
    self->performOperation(self);
    self->step2(self);
}

// Concrete Class A
typedef struct ConcreteOperationA : AbstractOperation {
    void (*performOperation)(struct AbstractOperation* self);
};

void concrete_operation_a_performOperation(AbstractOperation* self) {
    printf("ConcreteOperationA: Performing operation A\n");
}

void concrete_operation_a_init(struct ConcreteOperationA* op) {
    op->performOperation = concrete_operation_a_performOperation;
}

// Concrete Class B
typedef struct ConcreteOperationB : AbstractOperation {
    void (*performOperation)(struct AbstractOperation* self);
};

void concrete_operation_b_performOperation(AbstractOperation* self) {
    printf("ConcreteOperationB: Performing operation B\n");
}

void concrete_operation_b_init(struct ConcreteOperationB* op) {
    op->performOperation = concrete_operation_b_performOperation;
}


int main() {
    struct ConcreteOperationA opA;
    opA.step1 = abstract_operation_step1;
    opA.step2 = abstract_operation_step2;
    concrete_operation_a_init(&opA);

    printf("Executing Concrete Operation A:\n");
    abstract_operation_execute(&opA);
    printf("\n");

    struct ConcreteOperationB opB;
    opB.step1 = abstract_operation_step1;
    opB.step2 = abstract_operation_step2;
    concrete_operation_b_init(&opB);

    printf("Executing Concrete Operation B:\n");
    abstract_operation_execute(&opB);

    return 0;
}
```