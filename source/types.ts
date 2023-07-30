import ts from 'typescript';

type MacroResult = ts.VisitResult<ts.Node | undefined>;

type MacroFunction = (func: ts.CallExpression, context: ts.TransformationContext) => MacroResult;

export {
	MacroFunction,
	MacroResult,
};
