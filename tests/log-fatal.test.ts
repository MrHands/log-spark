import {
	describe,
	expect,
	test,
} from '@jest/globals';

describe('$logFatal', function () {
	test('throws an exception', function () {
		expect(() => {
			$logFatal('Map', 'City not found');
		}).toThrow(new Error('(Map) City not found'));
	});
});
