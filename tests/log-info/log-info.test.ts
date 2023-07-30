import { expect } from 'chai';

import { CaptureConsoleLog } from '../helpers';

expect(CaptureConsoleLog(() => $logInfo('Blah', 'stuff'))).to.be.equal('(Blah) stuff');
