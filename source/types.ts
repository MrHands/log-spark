import type ts from 'typescript';

import { type LogSparkConfig } from './config';

type TMacroResult = ts.VisitResult<ts.Node | undefined>;

type TMacroFunction = (
	func: ts.CallExpression,
	context: ts.TransformationContext,
	config: LogSparkConfig,
) => TMacroResult;

export type {
	TMacroFunction,
	TMacroResult,
};
