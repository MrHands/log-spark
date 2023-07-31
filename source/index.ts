import {
	type PluginConfig,
	type TransformerExtras,
} from 'ts-patch';
import type ts from 'typescript';

import { MacroTransformer } from './macro-transformer';

export * from './conditional-transform';
export * from './dev-only-transform';
export * from './logging-transform';
export * from './prod-only-transform';

export default (
	_program: ts.Program,
	_pluginConfig: PluginConfig,
	{ ts: tsInstance }: TransformerExtras
) => (context: ts.TransformationContext) => {
	const transformer = new MacroTransformer(context, tsInstance);
	return (sourceFile: ts.SourceFile) => transformer.run(sourceFile);
};
