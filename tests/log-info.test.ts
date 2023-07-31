import {
	describe,
	expect,
	test,
} from '@jest/globals';

import { CaptureConsoleOutput } from '.';

describe('$logInfo', function () {
	test('prints to console.log', function () {
		expect(CaptureConsoleOutput('log', function () {
			$logInfo('GroceryList', 'Cheese');
		})).toBe('(GroceryList) Cheese');
	});

	test('handles variables', function () {
		const cheeseLeft = 200;
		expect(CaptureConsoleOutput('log', function () {
			$logInfo('Shopping', `Milk: 0, Cheese: ${cheeseLeft}`);
		})).toBe('(Shopping) Milk: 0, Cheese: 200');
	});

	test('domain can be an object', function () {
		expect(CaptureConsoleOutput('log', function () {
			$logInfo(new Error(), 'Look at the time!');
		})).toBe('(Error) Look at the time!');
	});

	test('domain can be a class instance', function () {
		class Mouse {
			_health = 3;

			toString() {
				return '[Mouse]';
			}

			print() {
				$logInfo(this, `Health - ${this._health}`);
			}
		}
		const mouse = new Mouse();

		expect(CaptureConsoleOutput('log', () => mouse.print())).toBe('([Mouse]) Health - 3');
	});
});
