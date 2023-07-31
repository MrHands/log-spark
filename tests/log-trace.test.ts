import {
	describe,
	expect,
	test,
} from '@jest/globals';

import { CaptureConsoleLog } from '.';

describe('$logTrace', function () {
	test('prints to console.log', function () {
		expect(CaptureConsoleLog(function () {
			$logTrace('Club', 'Coming up:');
		})).toBe('[TRACE] (Club) Coming up:');
	});

	test('handles variables', function () {
		const vegetable = 'Spinat';
		expect(CaptureConsoleLog(function () {
			$logTrace('Cooking', `Add some ${vegetable}`);
		})).toBe('[TRACE] (Cooking) Add some Spinat');
	});

	test('domain can be an object', function () {
		expect(CaptureConsoleLog(function () {
			const toothpick = {
				toString() {
					return 'Toothpick';
				},
			};

			$logTrace(toothpick, 'I used to be a tree, you know');
		})).toBe('[TRACE] (Toothpick) I used to be a tree, you know');
	});

	test('domain can be a class instance', function () {
		class Table {
			_wood = 20;

			toString() {
				return 'Table';
			}

			print() {
				$logTrace(this, `Requires ${this._wood} wood`);
			}
		}
		const mouse = new Table();

		expect(CaptureConsoleLog(() => mouse.print())).toBe('[TRACE] (Table) Requires 20 wood');
	});
});
