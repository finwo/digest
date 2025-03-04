import {
  rstr2hex,
  rstr2b64,
  binb2rstr,
  rstr2binb,
  bit_rol,
} from '@finwo/digest-common';

/*
 * A JavaScript implementation of the Secure Hash Algorithm, SHA-1, as defined
 * in FIPS 180-1
 * Version 2.2 Copyright Paul Johnston 2000 - 2009.
 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
 * Distributed under the BSD License
 * See http://pajhome.org.uk/crypt/md5 for details.
 */

/*
 * These are the functions you'll usually want to call
 * They take string arguments and return either hex or base-64 encoded strings
 */
export function hex_sha1(s: string): string {
  return rstr2hex(rstr_sha1(str2rstr_utf8(s)));
}
export function b64_sha1(s: string): string {
  return rstr2b64(rstr_sha1(str2rstr_utf8(s)));
}
export function any_sha1(s: string, e: string): string {
  return rstr2any(rstr_sha1(str2rstr_utf8(s)), e);
}
export function hex_hmac_sha1(k: string, d: string): string {
  return rstr2hex(rstr_hmac_sha1(str2rstr_utf8(k), str2rstr_utf8(d)));
}
export function b64_hmac_sha1(k: string, d: string): string {
  return rstr2b64(rstr_hmac_sha1(str2rstr_utf8(k), str2rstr_utf8(d)));
}
export function any_hmac_sha1(k: string, d: string, e: string): string {
  return rstr2any(rstr_hmac_sha1(str2rstr_utf8(k), str2rstr_utf8(d)), e);
}

/*
 * Calculate the SHA1 of a raw string
 */
export function rstr_sha1(s: string): string {
  return binb2rstr(binb_sha1(rstr2binb(s), s.length * 8));
}

/*
 * Calculate the HMAC-SHA1 of a key and some data (raw strings)
 */
export function rstr_hmac_sha1(key: string, data: string): string {
  var bkey = rstr2binb(key);
  if(bkey.length > 16) bkey = binb_sha1(bkey, key.length * 8);

  var ipad = Array(16), opad = Array(16);
  for(var i = 0; i < 16; i++) {
    ipad[i] = bkey[i] ^ 0x36363636;
    opad[i] = bkey[i] ^ 0x5C5C5C5C;
  }

  var hash = binb_sha1(ipad.concat(rstr2binb(data)), 512 + data.length * 8);
  return binb2rstr(binb_sha1(opad.concat(hash), 512 + 160));
}

/*
 * Convert a raw string to an arbitrary string encoding
 */
export function rstr2any(input: string, encoding: string): string {
  var divisor = encoding.length;
  var remainders = Array();
  var i, q, x, quotient;

  /* Convert to an array of 16-bit big-endian values, forming the dividend */
  var dividend = Array(Math.ceil(input.length / 2));
  for(i = 0; i < dividend.length; i++) {
    dividend[i] = (input.charCodeAt(i * 2) << 8) | input.charCodeAt(i * 2 + 1);
  }

  /*
   * Repeatedly perform a long division. The binary array forms the dividend,
   * the length of the encoding is the divisor. Once computed, the quotient
   * forms the dividend for the next step. We stop when the dividend is zero.
   * All remainders are stored for later use.
   */
  while(dividend.length > 0) {
    quotient = Array();
    x = 0;
    for(i = 0; i < dividend.length; i++) {
      x = (x << 16) + dividend[i];
      q = Math.floor(x / divisor);
      x -= q * divisor;
      if(quotient.length > 0 || q > 0) {
        quotient[quotient.length] = q;
      }
    }
    remainders[remainders.length] = x;
    dividend = quotient;
  }

  /* Convert the remainders to the output string */
  var output = "";
  for(i = remainders.length - 1; i >= 0; i--) {
    output += encoding.charAt(remainders[i]);
  }

  /* Append leading zero equivalents */
  var full_length = Math.ceil(input.length * 8 /
    (Math.log(encoding.length) / Math.log(2)));
  for(i = output.length; i < full_length; i++) {
    output = encoding[0] + output;
  }

  return output;
}

/*
 * Encode a string as utf-8.
 * For efficiency, this assumes the input is valid utf-16.
 */
export function str2rstr_utf8(input: string): string {
  var output = "";
  var i = -1;
  var x, y;

  while(++i < input.length) {
    /* Decode utf-16 surrogate pairs */
    x = input.charCodeAt(i);
    y = i + 1 < input.length ? input.charCodeAt(i + 1) : 0;
    if(0xD800 <= x && x <= 0xDBFF && 0xDC00 <= y && y <= 0xDFFF) {
      x = 0x10000 + ((x & 0x03FF) << 10) + (y & 0x03FF);
      i++;
    }

    /* Encode output as utf-8 */
    if(x <= 0x7F) {
      output += String.fromCharCode(x);
    } else if(x <= 0x7FF) {
      output += String.fromCharCode(0xC0 | ((x >>> 6 ) & 0x1F),
        0x80 | ( x         & 0x3F));
    } else if(x <= 0xFFFF) {
      output += String.fromCharCode(0xE0 | ((x >>> 12) & 0x0F),
        0x80 | ((x >>> 6 ) & 0x3F),
        0x80 | ( x         & 0x3F));
    } else if(x <= 0x1FFFFF) {
      output += String.fromCharCode(0xF0 | ((x >>> 18) & 0x07),
        0x80 | ((x >>> 12) & 0x3F),
        0x80 | ((x >>> 6 ) & 0x3F),
        0x80 | ( x         & 0x3F));
    }
  }
  return output;
}

/*
 * Encode a string as utf-16
 */
export function str2rstr_utf16le(input: string): string {
  var output = "";
  for(var i = 0; i < input.length; i++) {
    output += String.fromCharCode( input.charCodeAt(i)        & 0xFF,
      (input.charCodeAt(i) >>> 8) & 0xFF);
  }
  return output;
}

export function str2rstr_utf16be(input: string): string {
  var output = "";
  for(var i = 0; i < input.length; i++) {
    output += String.fromCharCode((input.charCodeAt(i) >>> 8) & 0xFF,
      input.charCodeAt(i)        & 0xFF);
  }
  return output;
}

/*
 * Calculate the SHA-1 of an array of big-endian words, and a bit length
 */
export function binb_sha1(x: number[], len: number): number[] {
  /* append padding */
  x[len >> 5] |= 0x80 << (24 - len % 32);
  x[((len + 64 >> 9) << 4) + 15] = len;

  var w = Array(80);
  var a =  1732584193;
  var b = -271733879;
  var c = -1732584194;
  var d =  271733878;
  var e = -1009589776;

  for(var i = 0; i < x.length; i += 16) {
    var olda = a;
    var oldb = b;
    var oldc = c;
    var oldd = d;
    var olde = e;

    for(var j = 0; j < 80; j++) {
      if(j < 16) {
        w[j] = x[i + j];
      } else {
        w[j] = bit_rol(w[j-3] ^ w[j-8] ^ w[j-14] ^ w[j-16], 1);
      }
      var t = safe_add(safe_add(bit_rol(a, 5), sha1_ft(j, b, c, d)),
        safe_add(safe_add(e, w[j]), sha1_kt(j)));
      e = d;
      d = c;
      c = bit_rol(b, 30);
      b = a;
      a = t;
    }

    a = safe_add(a, olda);
    b = safe_add(b, oldb);
    c = safe_add(c, oldc);
    d = safe_add(d, oldd);
    e = safe_add(e, olde);
  }
  return Array(a, b, c, d, e);

}

/*
 * Perform the appropriate triplet combination function for the current
 * iteration
 */
export function sha1_ft(t: number, b: number, c: number, d: number): number {
  if(t < 20) return (b & c) | ((~b) & d);
  if(t < 40) return b ^ c ^ d;
  if(t < 60) return (b & c) | (b & d) | (c & d);
  return b ^ c ^ d;
}

/*
 * Determine the appropriate additive constant for the current iteration
 */
export function sha1_kt(t: number): 1518500249 | 1859775393 | -1894007588 | -899497514 {
  return (t < 20) ?  1518500249 : (t < 40) ?  1859775393 :
    (t < 60) ? -1894007588 : -899497514;
}

/*
 * Add integers, wrapping at 2^32. This uses 16-bit operations internally
 * to work around bugs in some JS interpreters.
 */
export function safe_add(x: number, y: number): number {
  var lsw = (x & 0xFFFF) + (y & 0xFFFF);
  var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
  return (msw << 16) | (lsw & 0xFFFF);
}
