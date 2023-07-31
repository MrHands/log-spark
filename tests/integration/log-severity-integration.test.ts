import {
	describe,
	expect,
	test,
} from '@jest/globals';

import { CaptureConsoleOutput } from '../helpers';

describe('log severity integration', function () {
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

	test('error level does not exceed maximum', function () {
		expect(CaptureConsoleOutput('error', function () {
			$logError('Coin', 'Heads');
		})).toBe('(Coin) Heads');
	});

	test('fatal level exceeds maximum', function () {
		expect(CaptureConsoleOutput('error', function () {
			$logFatal('Artist', 'Making music again');
		})).toBe('');
	});
});
