`log-spark` adds abstract syntax tree (AST) transformer functions for logging to Typescript. These function calls are evaluated at compile-time and only included in the generated JavaScript when certain conditions are met.

# Example

```typescript
// Logging statements take a domain and a message string
$logTrace('Storage', 'Initializing...');

// Messages are string literals and can use variables
$logInfo('Game', `Ready player ${playerName}!`);

// The domain parameter can be an object on which `.toString()` is called
$logWarn(oven, `Set to ${oven.degrees} Celcius`);

// You can also use `this` as the domain
$logError(this, `${this._drinks} is too many drinks!`);

// Fatal log messages throw an error by default
$logFatal('Map', 'City not found');
```

When the above is compiled, the following JavaScript is produced:

```javascript
console.log("[TRACE] (Storage) Initializing...");

console.log("(Game)", `Ready player ${playerName}!`);

console.warn("(" + oven.toString() + ")", `Set to ${oven.degrees} degrees Celcius`);

console.error("(" + this.toString() + ")", `${this._drinks} is too many drinks!`);

(() => {
	throw new Error("(Map) City not found");
})();
```

# Logging severity

# Configuration