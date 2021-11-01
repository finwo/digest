const M    = require('../');
const test = require('tape');

test('Method exports', t => {
  t.plan(7);

  // Main functions
  t.equal(typeof M              , 'object'  , 'Module is an object');
  t.equal(typeof M.hex_md5     , 'function', '\'hex_md5\' is a function');
  t.equal(typeof M.b64_md5     , 'function', '\'b64_md5\' is a function');
  t.equal(typeof M.any_md5     , 'function', '\'any_md5\' is a function');
  t.equal(typeof M.hex_hmac_md5, 'function', '\'hex_hmac_md5\' is a function');
  t.equal(typeof M.b64_hmac_md5, 'function', '\'b64_hmac_md5\' is a function');
  t.equal(typeof M.any_hmac_md5, 'function', '\'any_hmac_md5\' is a function');
});
