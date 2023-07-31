import {
	describe,
	expect,
	test,
} from '@jest/globals';

import { CaptureConsoleLog } from './helpers';

describe('$logInfo', function () {
	test('prints to console.log', function () {
		expect(CaptureConsoleLog(function () {
			$logInfo('GroceryList', 'Cheese');
		})).toBe('(GroceryList) Cheese');
	});

	test('handles variables', function () {
		const cheeseLeft = 200;
		expect(CaptureConsoleLog(function () {
			$logInfo('Shopping', `Milk: 0, Cheese: ${cheeseLeft}`);
		})).toBe('(Shopping) Milk: 0, Cheese: 200');
	});

	test('domain can be an object', function () {
		expect(CaptureConsoleLog(function () {
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

		expect(CaptureConsoleLog(() => mouse.print())).toBe('([Mouse]) Health - 3');
	});
});
