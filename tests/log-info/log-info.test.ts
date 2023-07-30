import { expect } from 'chai';

declare global {
	function $logInfo(domain: object | string, message: string): void;
}

const output = `${$logInfo('Blah', 'stuff')}`;

expect(output).to.be.equal('console.log("(Blah) stuff")');
