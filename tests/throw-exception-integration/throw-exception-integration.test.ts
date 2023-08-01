import {
	describe,
	expect,
	test,
} from '@jest/globals';

import { CaptureConsoleOutput } from '../helpers';

describe('log severity integration', function () {
	test('trace throws an exception', function () {
		expect(function () {
			$logTrace('Ingredient', 'Catalyst type');
		}).toThrow('(Ingredient) Catalyst type');
	});

	test('info throws an exception', function () {
		expect(function () {
			$logInfo('Magic', 'Find a way!');
		}).toThrow('(Magic) Find a way!');
	});

	test('warn throws an exception', function () {
		expect(function () {
			$logWarn('Cauldron', 'Not enough heat');
		}).toThrow('(Cauldron) Not enough heat');
	});

	test('error throws an exception', function () {
		expect(function () {
			$logError('Witch', 'Magic buffer overflow');
		}).toThrow('(Witch) Magic buffer overflow');
	});

	test('fatal does not throw an exception', function () {
		expect(CaptureConsoleOutput('error', function () {
			$logFatal('Cat', 'Messed with the potion');
		})).toBe('[FATAL] (Cat) Messed with the potion');
	});
});
