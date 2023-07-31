import {
	describe,
	expect,
	test,
} from '@jest/globals';

describe('$logFatal', function () {
	test('throws an exception', function () {
		expect(() => {
			$logFatal('Map', 'City not found');
		}).toThrow(new Error('(Map) City not found'));
	});

	test('handles variables', function () {
		expect(() => {
			const rentRemaining = 21200;
			$logFatal('Apartment', `Rent too high: ${rentRemaining}`);
		}).toThrow(new Error('(Apartment) Rent too high: 21200'));
	});

	test('domain can be an object', function () {
		expect(() => {
			$logFatal(new Error(), 'Error was an Error');
		}).toThrow(new Error('(Error) Error was an Error'));
	});

	test('domain can be a class instance', function () {
		const friend = {
			_name: 'Sarah',

			toString() {
				return 'Friend';
			},

			meet() {
				$logFatal(this, `Failed to meet up with ${this._name}`);
			},
		};
		expect(() => friend.meet()).toThrow(new Error('(Friend) Failed to meet up with Sarah'));
	});
});
