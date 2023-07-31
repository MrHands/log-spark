import { expect } from 'chai';
import { describe } from 'mocha';

import { CaptureConsoleLog } from './helpers';

describe('$logInfo', function () {
	it('prints to console.log', function () {
		expect(CaptureConsoleLog(() => $logInfo('GroceryList', 'Cheese'))).to.be.equal('(GroceryList) Cheese');
	});

	it('handles variables', function () {
		const cheeseLeft = 200;
		expect(CaptureConsoleLog(() => $logInfo('Shopping', `Milk: 0, Cheese: ${cheeseLeft}`))).to.be.equal('(Shopping) Milk: 0, Cheese: 200');
	});

	it('domain can be an object', function () {
		expect(CaptureConsoleLog(() => $logInfo(new Error(), 'Look at the time!'))).to.be.equal('(Error) Look at the time!');
	});

	it('domain can be a class instance', function () {
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

		expect(CaptureConsoleLog(() => mouse.print())).to.be.equal('([Mouse]) Health - 3');
	});
});
