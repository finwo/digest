const M    = require('../');
const test = require('tape');

test('Common test values', async t => {
  const cases = [
    { msg: ''                                           , hex: '9c1185a5c5e9fc54612808977ee8f548b2258d31', b64: 'nBGFpcXp/FRhKAiXfuj1SLIljTE=' },
    { msg: 'rmd160 this string'                         , hex: 'f54ba7b02ff30e6608b28f7eca8a139fa9233cf7', b64: '9UunsC/zDmYIso9+yooTn6kjPPc=' },
    { msg: 'crackme'                                    , hex: '1024260add63ba1aace360fd4704294efd80a79a', b64: 'ECQmCt1juhqs42D9RwQpTv2Ap5o=' },
    { msg: 'crackme123'                                 , hex: 'ec3fcc0a3d808f1cf10ab40134ba2684764799fa', b64: '7D/MCj2AjxzxCrQBNLomhHZHmfo=' },
    { msg: 'The quick brown fox jumps over the lazy dog', hex: '37f332f68db77bd9d7edd4969571ad671cf9dd3b', b64: 'N/My9o23e9nX7dSWlXGtZxz53Ts=' },
    { msg: 'The quick brown fox jumps over the lazy cog', hex: '132072df690933835eb8b6ad0b77e7b6f14acad7', b64: 'EyBy32kJM4NeuLatC3fntvFKytc=' },
  ];

  t.plan(cases.length * 2);
  for(const known of cases) {
    t.equal(M.hex_rmd160(known.msg), known.hex, `Hex digest of '${known.msg}'`);
    t.equal(M.b64_rmd160(known.msg), known.b64, `B64 digest of '${known.msg}'`);
  }
});
