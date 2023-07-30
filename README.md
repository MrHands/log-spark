`log-spark` adds abstract syntax tree (AST) transformer functions to Typescript for logging and other purposes. These function calls are evaluated at compile-time and only included in the generated JavaScript when certain conditions are met.

# Example

```typescript
// Typescript
$logInfo('Game', `Ready player ${playerName}!`);

// Compiled JavaScript
```

