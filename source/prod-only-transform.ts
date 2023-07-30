import { ConditionalTransform } from './conditional-transform';

function ProdOnlyTransform(isProduction: boolean) {
	return ConditionalTransform('$prodOnly', isProduction);
}

export { ProdOnlyTransform };
