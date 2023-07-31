import {
	describe,
	expect,
	test,
} from '@jest/globals';

describe('production integration', function () {
	test('$devOnly does not execute in production', function () {
		let environment = 'production';
		$devOnly(() => {
			environment = 'development';
		});

		expect(environment).toBe('production');
	});

	test('$prodOnly executes in production', function () {
		let moneyOwed = 100000;
		$prodOnly(() => {
			moneyOwed = 0;
		});

		expect(moneyOwed).toBe(0);
	});
});
