const M    = require('../');
const test = require('tape');

test('Common test values', async t => {
  const cases = [
    { msg: ''                                           , hex: 'd41d8cd98f00b204e9800998ecf8427e', b64: '1B2M2Y8AsgTpgAmY7PhCfg==' },
    { msg: 'md5 this string'                            , hex: 'd77bff3a550c1bf39b78ad2136c5d604', b64: '13v/OlUMG/ObeK0hNsXWBA==' },
    { msg: 'crackme'                                    , hex: '33c5d4954da881814420f3ba39772644', b64: 'M8XUlU2ogYFEIPO6OXcmRA==' },
    { msg: 'crackme123'                                 , hex: 'e425adc17b1e4feed1dc295b82d16cbd', b64: '5CWtwXseT+7R3ClbgtFsvQ==' },
    { msg: 'The quick brown fox jumps over the lazy dog', hex: '9e107d9d372bb6826bd81d3542a419d6', b64: 'nhB9nTcrtoJr2B01QqQZ1g==' },
    { msg: 'The quick brown fox jumps over the lazy cog', hex: '1055d3e698d289f2af8663725127bd4b', b64: 'EFXT5pjSifKvhmNyUSe9Sw==' },
  ];

  t.plan(cases.length * 2);
  for(const known of cases) {
    t.equal(M.hex_md5(known.msg), known.hex, `Hex digest of '${known.msg}'`);
    t.equal(M.b64_md5(known.msg), known.b64, `B64 digest of '${known.msg}'`);
  }
});
