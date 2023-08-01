declare global {
	// Output function only when in development mode
	function $devOnly(what: () => void): void;

	// Output function only when in production mode
	function $prodOnly(what: () => void): void;

	// Log a message with TRACE priority
	function $logTrace(domain: object | string, message: string): void;

	// Log a message with INFO priority
	function $logInfo(domain: object | string, message: string): void;

	// Log a message with WARN priority
	function $logWarn(domain: object | string, message: string): void;

	// Log a message with ERROR priority
	function $logError(domain: object | string, message: string): void;

	// Log a message with FATAL priority
	function $logFatal(domain: object | string, message: string): void;
}

export {};
