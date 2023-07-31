import type ts from 'typescript';

import { type Config } from './config';

type TMacroResult = ts.VisitResult<ts.Node | undefined>;

type TMacroFunction = (
	func: ts.CallExpression,
	context: ts.TransformationContext,
	config: Config,
) => TMacroResult;

export type {
	TMacroFunction,
	TMacroResult,
};
