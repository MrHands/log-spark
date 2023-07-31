/**
 * MIT License
 *
 * Copyright (c) 2023 Mr. Hands
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
import { type PluginConfig } from 'ts-patch';
import { ELogSeverity } from './log-severity';
declare class LogSparkPluginConfig implements PluginConfig {
    /**
     * Language Server TypeScript Plugin name
     */
    name?: string;
    /**
     * Path to transformer or transformer module name
     */
    transform?: string;
    /**
     * Resolve Path Aliases?
    */
    resolvePathAliases?: boolean;
    /**
     * tsconfig.json file (for transformer)
     */
    tsConfig?: string;
    /**
     * The optional name of the exported transform plugin in the transform module.
     */
    import?: string;
    /**
     * Is the transformer an ES Module
     */
    isEsm?: boolean;
    /**
     * Plugin entry point format type, default is program
     */
    type?: 'checker' | 'compilerOptions' | 'config' | 'ls' | 'program' | 'raw';
    /**
     * Apply transformer after internal TypeScript transformers
     */
    after?: boolean;
    /**
     * Apply transformer on d.ts files
     */
    afterDeclarations?: boolean;
    /**
     * Transform *Program* instance (alters during createProgram()) (`type`, `after`, &
     * `afterDeclarations` settings will not apply) Entry point must be (program: Program,
     * host?: CompilerHost) => Program
     */
    transformProgram?: boolean;
    /**
     * Minimum log severity that will be translated to log statements.
     */
    logSeverityMinimum?: ELogSeverity;
    /**
     * Maximum log severity that will be translated to log statements. Setting this to
     * ELogSeverity.Maximum will disable all logging macros.
     */
    logSeverityMaximum?: ELogSeverity;
    /**
     * Minimum log severity that throw an exception.
     */
    throwExceptionMinimum?: ELogSeverity;
    /**
     * Maximum log severity that throw an exception. Setting this to ELogSeverity.Maximum will
     * disable logging macros throwing exceptions.
     */
    throwExceptionMaximum?: ELogSeverity;
    /**
     * Compiling for production (true) or development (false).
     */
    isProduction?: boolean;
}
declare class LogSparkConfig {
    logSeverityMinimum: ELogSeverity;
    logSeverityMaximum: ELogSeverity;
    throwExceptionMinimum: ELogSeverity;
    throwExceptionMaximum: ELogSeverity;
    isProduction: boolean;
}
export { LogSparkConfig, LogSparkPluginConfig, };
