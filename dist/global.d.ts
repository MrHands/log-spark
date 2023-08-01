declare global {
    function $devOnly(what: () => void): void;
    function $prodOnly(what: () => void): void;
    function $logTrace(domain: object | string, message: string): void;
    function $logInfo(domain: object | string, message: string): void;
    function $logWarn(domain: object | string, message: string): void;
    function $logError(domain: object | string, message: string): void;
    function $logFatal(domain: object | string, message: string): void;
}
export {};
