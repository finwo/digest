const M    = require('../');
const test = require('tape');

test('Method exports', t => {
  t.plan(7);

  // Main functions
  t.equal(typeof M              , 'object'  , 'Module is an object');
  t.equal(typeof M.hex_sha1     , 'function', '\'hex_sha1\' is a function');
  t.equal(typeof M.b64_sha1     , 'function', '\'b64_sha1\' is a function');
  t.equal(typeof M.any_sha1     , 'function', '\'any_sha1\' is a function');
  t.equal(typeof M.hex_hmac_sha1, 'function', '\'hex_hmac_sha1\' is a function');
  t.equal(typeof M.b64_hmac_sha1, 'function', '\'b64_hmac_sha1\' is a function');
  t.equal(typeof M.any_hmac_sha1, 'function', '\'any_hmac_sha1\' is a function');
});
