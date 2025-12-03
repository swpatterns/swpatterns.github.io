---
title: "Interpreter - C"
date: 2025-12-03T13:07:10.487-05:00
draft: false
pattern_usage: ["Interpreter"]
language: ["C"]
---
The Interpreter pattern defines a way to evaluate a language, typically a simple one, given its grammar. This example implements a basic arithmetic expression interpreter for integers and the operations addition, subtraction, multiplication, and division.  The expression is represented as a string, and the interpreter parses and evaluates it. The implementation uses a recursive descent parser, building an expression tree internally (though the tree is not explicitly defined as a data structure, the recursion achieves the same effect). C's function pointer capabilities, combined with its procedural nature, make it suitable for straightforward interpreter implementations like this.

```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <ctype.h>

// Token types
typedef enum {
    TOKEN_NUMBER,
    TOKEN_PLUS,
    TOKEN_MINUS,
    TOKEN_MULTIPLY,
    TOKEN_DIVIDE,
    TOKEN_EOF
} TokenType;

// Token structure
typedef struct {
    TokenType type;
    int value;
    char* str; // Store the original string representation of the token
} Token;

// Global variables
char* expression;
int current_pos = 0;

// Function prototypes
Token get_next_token();
int parse_expression();
int parse_term();
int parse_factor();

// Get the next token from the expression string
Token get_next_token() {
    Token token;
    while (expression[current_pos] != '\0' && isspace(expression[current_pos])) {
        current_pos++;
    }

    if (expression[current_pos] == '\0') {
        token.type = TOKEN_EOF;
        return token;
    }

    if (isdigit(expression[current_pos])) {
        token.type = TOKEN_NUMBER;
        char* start = &expression[current_pos];
        while (isdigit(expression[current_pos])) {
            current_pos++;
        }
        token.value = atoi(start);
        token.str = strdup(start); // Duplicate the string for later use
        return token;
    }

    switch (expression[current_pos]) {
        case '+':
            token.type = TOKEN_PLUS;
            token.str = "+";
            current_pos++;
            return token;
        case '-':
            token.type = TOKEN_MINUS;
            token.str = "-";
            current_pos++;
            return token;
        case '*':
            token.type = TOKEN_MULTIPLY;
            token.str = "*";
            current_pos++;
            return token;
        case '/':
            token.type = TOKEN_DIVIDE;
            token.str = "/";
            current_pos++;
            return token;
        default:
            fprintf(stderr, "Error: Invalid character '%c' at position %d\n", expression[current_pos], current_pos);
            exit(1);
    }
}


// Grammar:
// expression : term ((PLUS | MINUS) term)*
// term       : factor ((MULTIPLY | DIVIDE) factor)*
// factor     : NUMBER
int parse_expression() {
    int result = parse_term();

    while (1) {
        Token token = get_next_token();
        if (token.type == TOKEN_PLUS) {
            result += parse_term();
        } else if (token.type == TOKEN_MINUS) {
            result -= parse_term();
        } else {
            // Put back the token -- necessary as it will be consumed by evaluate()
            current_pos -= strlen(token.str); 
            if(token.type != TOKEN_EOF){
                current_pos--; // Adjust for potential whitespace before token.str
            }
            
            break;
        }
    }
    return result;
}

int parse_term() {
    int result = parse_factor();

    while (1) {
        Token token = get_next_token();
        if (token.type == TOKEN_MULTIPLY) {
            result *= parse_factor();
        } else if (token.type == TOKEN_DIVIDE) {
            int divisor = parse_factor();
            if (divisor == 0) {
                fprintf(stderr, "Error: Division by zero\n");
                exit(1);
            }
            result /= divisor;
        } else {
            current_pos -= strlen(token.str);
            if(token.type != TOKEN_EOF){
                current_pos--; // Adjust for potential whitespace before token.str
            }
            
            break;
        }
    }
    return result;
}


int parse_factor() {
    Token token = get_next_token();
    if (token.type == TOKEN_NUMBER) {
        return token.value;
    } else {
        fprintf(stderr, "Error: Expected a number, got '%s' at position %d\n", token.str, current_pos - strlen(token.str));
        exit(1);
    }
}

int main() {
    expression = "1 + 2 * 3 - 4 / 2";
    current_pos = 0;
    int result = parse_expression();
    printf("Result: %d\n", result);

    expression = "10 / 2 - 3";
    current_pos = 0;
    result = parse_expression();
    printf("Result: %d\n", result);
    
    expression = "2 * (3 + 4)"; // Not supported, but shows limitation
    current_pos = 0; //reset position.
    printf("Note: Parentheses are currently not supported.\n");
    
    return 0;
}
```