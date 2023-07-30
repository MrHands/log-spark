import { expect } from 'chai';

declare global {
	function $logInfo(domain: object | string, message: string): void;
}

function CaptureMacro(run: () => void) {
	let result = '';
	const original = console.log;
	console.log = (value: string) => result += value;

	run();
	
	console.log = original;

	return result;
}

let result = '';
const original = console.log;
console.log = (value: string) => result += value;

const output = () => $logInfo('Blah', 'stuff');

output();

console.log = original;

expect(result).to.be.equal('(Blah) stuff');
// expect(CaptureMacro(() => $logInfo('Blah', 'stuff'))).to.be.equal('(Blah) stuff');
