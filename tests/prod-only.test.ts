import {
	describe,
	expect,
	test,
} from '@jest/globals';

describe('$prodOnly', function () {
	test('does not execute in development', function () {
		let moneyOwed = 100000;
		$prodOnly(() => {
			moneyOwed = 0;
		});

		expect(moneyOwed).toBe(100000);
	});
});
