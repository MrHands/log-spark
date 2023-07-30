import { expect } from 'chai';

declare global {
	function $logInfo(domain: object | string, message: string): void;
}

let result = '';
const original = console.log;
console.log = (value: string) => result += value;

const output = () => $logInfo('Blah', 'stuff');

output();

console.log = original;

expect(result).to.be.equal('(Blah) stuff');
