import ts from 'typescript';

import { type LogSparkConfig } from './config';
import { type TMacroFunction } from './types';

function ConditionalTransform(isProduction: boolean): TMacroFunction {
	return (func: ts.CallExpression, context: ts.TransformationContext, config: LogSparkConfig) => {
		const fn = func.arguments[0] as ts.ArrowFunction;

		const { factory } = context;

		if (isProduction !== config.isProduction) {
			return factory.createNotEmittedStatement(func);
		}

		if (ts.isBlock(fn.body)) {
			return factory.createImmediatelyInvokedArrowFunction(
				fn.body.statements
			);
		}

		return fn.body;
	};
}

const $devOnly = ConditionalTransform(false);
const $prodOnly = ConditionalTransform(true);

export {
	$devOnly,
	$prodOnly,
};
