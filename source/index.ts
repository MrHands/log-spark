import {
	type PluginConfig,
	type TransformerExtras,
} from 'ts-patch';
import ts from 'typescript';

import { MacroTransformer } from './macro-transformer';

export * from './conditional-transform';
export * from './dev-only-transform';
export * from './logging-transform';
export * from './prod-only-transform';

export declare function $logInfo(domain: object | string, message: string): void;

export default (
	_program: ts.Program,
	_pluginConfig: PluginConfig,
	{ ts: tsInstance }: TransformerExtras
) => (ctx: ts.TransformationContext) => {
	const transformer = new MacroTransformer(ctx, tsInstance);
	return (sourceFile: ts.SourceFile) => transformer.run(sourceFile);
};
