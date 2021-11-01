const M    = require('../');
const test = require('tape');

test('Method exports', t => {
  t.plan(7);

  // Main functions
  t.equal(typeof M                , 'object'  , 'Module is an object');
  t.equal(typeof M.hex_rmd160     , 'function', '\'hex_rmd160\' is a function');
  t.equal(typeof M.b64_rmd160     , 'function', '\'b64_rmd160\' is a function');
  t.equal(typeof M.any_rmd160     , 'function', '\'any_rmd160\' is a function');
  t.equal(typeof M.hex_hmac_rmd160, 'function', '\'hex_hmac_rmd160\' is a function');
  t.equal(typeof M.b64_hmac_rmd160, 'function', '\'b64_hmac_rmd160\' is a function');
  t.equal(typeof M.any_hmac_rmd160, 'function', '\'any_hmac_rmd160\' is a function');
});
