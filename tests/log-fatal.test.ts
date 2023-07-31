import {
	describe,
	expect,
	test,
} from '@jest/globals';

import { CaptureConsoleOutput } from '.';

describe('$logFatal', function () {
	test('throws an exception', function () {
		expect(CaptureConsoleOutput('error', function () {
			$logFatal('Map', 'Not found');
		})).toThrow(new Error('(Map) Not found'));
	});
});
