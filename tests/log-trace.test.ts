import {
	describe,
	expect,
	test,
} from '@jest/globals';

import { CaptureConsoleOutput } from '.';

describe('$logTrace', function () {
	test('prints to console.log', function () {
		expect(CaptureConsoleOutput('log', function () {
			$logTrace('Club', 'Coming up:');
		})).toBe('[TRACE] (Club) Coming up:');
	});

	test('handles variables', function () {
		const vegetable = 'Spinat';
		expect(CaptureConsoleOutput('log', function () {
			$logTrace('Cooking', `Add some ${vegetable}`);
		})).toBe('[TRACE] (Cooking) Add some Spinat');
	});

	test('domain can be an object', function () {
		expect(CaptureConsoleOutput('log', function () {
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

		expect(CaptureConsoleOutput('log', () => mouse.print())).toBe('[TRACE] (Table) Requires 20 wood');
	});
});
