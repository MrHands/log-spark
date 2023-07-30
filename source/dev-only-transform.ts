import { ConditionalTransform } from './conditional-transform';

function DevOnlyTransform(isDevelopment: boolean) {
	return ConditionalTransform('$devOnly', isDevelopment);
}

export { DevOnlyTransform };
