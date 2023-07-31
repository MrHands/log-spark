import { type TransformerExtras } from 'ts-patch';
import type ts from 'typescript';

import { type LogSparkPluginConfig } from './config';
import { MacroTransformer } from './macro-transformer';

export * from './conditional-transform';
export * from './dev-only-transform';
export * from './logging-transform';
export * from './prod-only-transform';

export default (
	_program: ts.Program,
	config: LogSparkPluginConfig,
	{ ts: tsInstance }: TransformerExtras
) => (context: ts.TransformationContext) => {
	const transformer = new MacroTransformer(context, config, tsInstance);
	return (sourceFile: ts.SourceFile) => transformer.run(sourceFile);
};
