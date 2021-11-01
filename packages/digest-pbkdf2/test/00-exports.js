const M    = require('../');
const test = require('tape');

const running = {};

test('Method exports', t => {
  t.plan(2);

  t.equal(typeof M       , 'object'  , 'Module is an object');
  t.equal(typeof M.PBKDF2, 'function', '\'PBKDF2\' is a function');
});
