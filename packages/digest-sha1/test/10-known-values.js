const M    = require('../');
const test = require('tape');

test('Common test values', async t => {
  const cases = [
    { msg: ''                                           , hex: 'da39a3ee5e6b4b0d3255bfef95601890afd80709', b64: '2jmj7l5rSw0yVb/vlWAYkK/YBwk=' },
    { msg: 'sha1 this string'                           , hex: 'cf23df2207d99a74fbe169e3eba035e633b65d94', b64: 'zyPfIgfZmnT74Wnj66A15jO2XZQ=' },
    { msg: 'crackme'                                    , hex: '8786ba517f024e479b20982567f998e58cde951e', b64: 'h4a6UX8CTkebIJglZ/mY5YzelR4=' },
    { msg: 'crackme123'                                 , hex: '717de03c9158ae10675c659c2fe8b27b71d50073', b64: 'cX3gPJFYrhBnXGWcL+iye3HVAHM=' },
    { msg: 'The quick brown fox jumps over the lazy dog', hex: '2fd4e1c67a2d28fced849ee1bb76e7391b93eb12', b64: 'L9ThxnotKPzthJ7hu3bnORuT6xI=' },
    { msg: 'The quick brown fox jumps over the lazy cog', hex: 'de9f2c7fd25e1b3afad3e85a0bd17d9b100db4b3', b64: '3p8sf9JeGzr60+haC9F9mxANtLM=' },
  ];

  t.plan(cases.length * 2);
  for(const known of cases) {
    t.equal(M.hex_sha1(known.msg), known.hex, `Hex digest of '${known.msg}'`);
    t.equal(M.b64_sha1(known.msg), known.b64, `B64 digest of '${known.msg}'`);
  }
});
