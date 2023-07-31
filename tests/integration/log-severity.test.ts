import {
	describe,
	expect,
	test,
} from '@jest/globals';

import { CaptureConsoleOutput } from '..';

describe('logSeverity', function () {
	test('trace level exceeds minimum', function () {
		expect(CaptureConsoleOutput('log', function () {
			$logTrace('Bubbles', 'In the air');
		})).toBe('');
	});

	test('info level exceeds minimum', function () {
		expect(CaptureConsoleOutput('log', function () {
			$logInfo('Thinking', 'Sounds good');
		})).toBe('');
	});

	test('warning level does not exceed maximum', function () {
		expect(CaptureConsoleOutput('warn', function () {
			$logWarn('Dog', 'Loves biscuits');
		})).toBe('(Dog) Loves biscuits');
	});
});
