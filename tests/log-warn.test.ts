import {
	describe,
	expect,
	test,
} from '@jest/globals';

import { CaptureConsoleOutput } from '.';

describe('$logWarn', function () {
	test('prints to console.log', function () {
		expect(CaptureConsoleOutput('warn', function () {
			$logWarn('Fool', 'Joker!');
		})).toBe('(Fool) Joker!');
	});

	test('handles variables', function () {
		const mischief = true;
		expect(CaptureConsoleOutput('warn', function () {
			$logWarn('StudyGroup', `Mischief is ${mischief}`);
		})).toBe('(StudyGroup) Mischief is true');
	});

	test('domain can be an object', function () {
		expect(CaptureConsoleOutput('warn', function () {
			$logWarn(new ArrayBuffer(12), 'Creating many buffers');
		})).toBe('([object ArrayBuffer]) Creating many buffers');
	});

	test('domain can be a class instance', function () {
		class TreeLine {
			_fences = 2;

			toString() {
				return 'TreeLine';
			}

			print() {
				$logWarn(this, `Not enough fences: ${this._fences}`);
			}
		}

		expect(CaptureConsoleOutput('warn', () => new TreeLine().print())).toBe('(TreeLine) Not enough fences: 2');
	});
});
