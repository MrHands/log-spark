import { expect } from 'chai';

import { CaptureConsoleLog } from '../helpers';

let result = '';
const original = console.log;
console.log = (value: string) => result += value;

const output = () => $logInfo('Blah', 'stuff');

output();

console.log = original;

expect(result).to.be.equal('(Blah) stuff');
expect(CaptureConsoleLog(() => $logInfo('Blah', 'stuff'))).to.be.equal('(Blah) stuff');
