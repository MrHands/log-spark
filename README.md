`log-spark` adds abstract syntax tree (AST) transformer functions for logging to Typescript. These function calls are evaluated at compile-time and only included in the generated JavaScript when certain conditions are met.

`log-spark` uses [ts-patch](https://www.npmjs.com/package/ts-patch) to add transformer plugins to Typescript compilation and [ts-node](https://www.npmjs.com/package/ts-node) to run the modified compiler.

# Example

```typescript
// Logging macros take a domain and a message string
$logTrace('Storage', 'Initializing...');

// Messages are string literals and can use variables
$logInfo('Game', `Ready player ${playerName}!`);

// The domain parameter can be an object on which `.toString()` is called
$logWarn(oven, `Set to ${oven.degrees} Celcius`);

// You can also use `this` as the domain
$logError(this, `${this._drinks} is too many drinks!`);

// Fatal log messages throw an error by default
$logFatal('Map', 'City not found');

// This macro will output only when compiling in a development configuration (default)
let environment = 'production';
$devOnly(() => {
	environment = 'development';
});

// And this macro works the other way around
let moneyOwed = 100000;
$prodOnly(() => {
	moneyOwed = 0;
});
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

let environment = 'production';
(() => {
	environment = 'development';
})();

let moneyOwed = 100000;
```

# Logging macros

| Severity | Config Value | Macro         | Output                                             | Notes                                                                                                    |
|----------|--------------|---------------|----------------------------------------------------|----------------------------------------------------------------------------------------------------------|
| Disabled | -1           | -             | -                                                  | Used to disable options from the configuration settings                                                  |
| Trace    | 0            | `$logTrace()` | `console.log()`                                    | Output is prefixed with "[TRACE]" to differentiate it from Info messages                                 |
| Info     | 1            | `$logInfo()`  | `console.log()`                                    |                                                                                                          |
| Warn     | 2            | `$logWarn()`  | `console.warn()`                                   |                                                                                                          |
| Error    | 3            | `$logError()` | `console.error()`                                  |                                                                                                          |
| Fatal    | 4            | `$logFatal()` | `throw new Error()` (default) or `console.error()` | Output is prefixed with "[FATAL]" to differentiate it from Error messages when not throwing an exception |
| Maximum  | 5            | -             | -                                                  | Used to disable options from the configuration settings                                                  |

# Configuration

Before you can build with `log-spark`, you must run `npx ts-patch install` on your project, and modify your `tsconfig.json`:

```json
{
	"$schema": "http://json.schemastore.org/tsconfig",
	"compilerOptions": {
		"plugins": [
			{
				"transform": "log-spark"
				// See additional settings in the table below
			}
		],
		"typeRoots": [
			// Required for adding the macros to the global namespace
			"./node_modules/log-spark/dist"
		],
		"include": [
			// Required for the compiler to recognize the macros as global functions
			"./node_modules/log-spark/dist"
		],
	},
	"ts-node": {
		"compiler": "ts-patch/compiler"
	}
}
```

The object in the `plugins` array takes these additional properties:

| Property              | Type    | Default            | Description                                                                                                                           |
|-----------------------|---------|--------------------|---------------------------------------------------------------------------------------------------------------------------------------|
| logSeverityMinimum    | number  | ELogSeverity.Trace | Minimum log severity that will be translated to log statements.                                                                       |
| logSeverityMaximum    | number  | ELogSeverity.Fatal | Maximum log severity that will be translated to log statements. Setting this to `ELogSeverity.Disabled` will disable all logging macros. |
| throwExceptionMinimum | number  | ELogSeverity.Fatal | Minimum log severity that throws an exception.                                                                                        |
| throwExceptionMaximum | number  | ELogSeverity.Fatal | Maximum log severity that throws an exception. Setting this to `ELogSeverity.Disabled` will disable logging macros throwing exceptions.  |
| isProduction          | boolean | false              | Compiling for production (true) or development (false).                                                                               |