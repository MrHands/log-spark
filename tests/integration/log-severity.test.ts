import {
	describe,
	expect,
	test,
} from '@jest/globals';

import { CaptureConsoleLog } from '..';

describe('logSeverity', function () {
	test('info level exceeds minimum', function () {
		expect(CaptureConsoleLog(function () {
			$logInfo('Thinking', 'Sounds good');
		})).toBe('');
	});
});
