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

import { type TransformerExtras } from 'ts-patch';
import type ts from 'typescript';

import { type LogSparkPluginConfig } from './config';
import { MacroTransformer } from './macro-transformer';

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

const LogSparkProgram = (
	_program: ts.Program,
	config: LogSparkPluginConfig,
	{ ts: tsInstance }: TransformerExtras
) => (context: ts.TransformationContext) => {
	const transformer = new MacroTransformer(context, config, tsInstance);
	return (sourceFile: ts.SourceFile) => transformer.run(sourceFile);
};

export default LogSparkProgram;
