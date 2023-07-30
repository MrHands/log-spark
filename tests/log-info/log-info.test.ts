import { $logInfo } from '../../build';
import { expect } from 'chai';

const output = `${$logInfo('Blah', 'stuff')}`;

expect(output).to.be.equal('console.log("(Blah) stuff")');
