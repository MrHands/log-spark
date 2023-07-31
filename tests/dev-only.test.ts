import {
	describe,
	expect,
	test,
} from '@jest/globals';

describe('$devOnly', function () {
	test('executes in development', function () {
		let environment = 'production';
		$devOnly(() => {
			environment = 'development';
		});

		expect(environment).toBe('development');
	});
});
