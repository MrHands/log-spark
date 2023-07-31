import {
	describe,
	expect,
	test,
} from '@jest/globals';

import { CaptureConsoleOutput } from '.';

describe('$logError', function () {
	test('prints to console.error', function () {
		expect(CaptureConsoleOutput('error', function () {
			$logError('Ship', 'Making water');
		})).toBe('(Ship) Making water');
	});

	test('handles variables', function () {
		const color = 'pink';
		expect(CaptureConsoleOutput('error', function () {
			$logError('Map', `Roads are colored in ${color}`);
		})).toBe('(Map) Roads are colored in pink');
	});

	test('domain can be an object', function () {
		expect(CaptureConsoleOutput('error', function () {
			$logError(JSON, 'Deserializing');
		})).toBe('([object JSON]) Deserializing');
	});

	test('domain can be a class instance', function () {
		class Navigator {
			_drinks = 16;

			toString() {
				return 'Navigator';
			}

			checkSobriety() {
				$logError(this, `${this._drinks} is too many drinks!`);
			}
		}

		expect(CaptureConsoleOutput('error', () => new Navigator().checkSobriety())).toBe('(Navigator) 16 is too many drinks!');
	});
});
