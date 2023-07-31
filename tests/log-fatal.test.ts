import {
	describe,
	expect,
	test,
} from '@jest/globals';

describe('$logFatal', function () {
	test('throws an exception', function () {
		expect(() => {
			$logFatal('Map', 'Not found');
		}).toThrow(new Error('(Map) Not found'));
	});
});
