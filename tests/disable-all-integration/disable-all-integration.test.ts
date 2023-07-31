import {
	describe,
	expect,
	test,
} from '@jest/globals';

import { CaptureConsoleOutput } from '../helpers';

describe('disable all integration', function () {
	test('trace is not output', function () {
		expect(CaptureConsoleOutput('log', function () {
			$logTrace('Bubbles', 'In the air');
		})).toBe('');
	});

	test('info is not output', function () {
		expect(CaptureConsoleOutput('log', function () {
			$logInfo('Thinking', 'Sounds good');
		})).toBe('');
	});

	test('warning is not output', function () {
		expect(CaptureConsoleOutput('warn', function () {
			$logWarn('Dog', 'Loves biscuits');
		})).toBe('');
	});

	test('error is not output', function () {
		expect(CaptureConsoleOutput('error', function () {
			$logError('Coin', 'Heads');
		})).toBe('');
	});

	test('fatal is not output', function () {
		expect(CaptureConsoleOutput('error', function () {
			$logFatal('Artist', 'Making music again');
		})).toBe('');
	});
});
