
/*
 * Configurable variables. You may need to tweak these to be compatible with
 * the server-side, but the defaults work in most cases.
 */
var hexcase = 0;   /* hex output format. 0 - lowercase; 1 - uppercase        */
var b64pad  = "=";  /* base-64 pad character. "=" for strict RFC compliance   */

/*
 * Convert a raw string to a hex string
 */
export function rstr2hex(input) {
  try { hexcase } catch(e) { hexcase=0; }
  var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
  var output = "";
  var x;
  for(var i = 0; i < input.length; i++) {
    x = input.charCodeAt(i);
    output += hex_tab.charAt((x >>> 4) & 0x0F)
      +  hex_tab.charAt( x        & 0x0F);
  }
  return output;
}

/*
 * Convert a raw string to a base-64 string
 */
export function rstr2b64(input) {
  try { b64pad } catch(e) { b64pad=''; }
  var tab = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  var output = "";
  var len = input.length;
  for(var i = 0; i < len; i += 3) {
    var triplet = (input.charCodeAt(i) << 16)
      | (i + 1 < len ? input.charCodeAt(i+1) << 8 : 0)
      | (i + 2 < len ? input.charCodeAt(i+2)      : 0);
    for(var j = 0; j < 4; j++) {
      if(i * 8 + j * 6 > input.length * 8) {
        output += b64pad;
      } else {
        output += tab.charAt((triplet >>> 6*(3-j)) & 0x3F);
      }
    }
  }
  return output;
}

/*
 * Convert an array of big-endian words to a string
 */
export function binb2rstr(input) {
  var output = "";
  for(var i = 0; i < input.length * 32; i += 8) {
    output += String.fromCharCode((input[i>>5] >>> (24 - i % 32)) & 0xFF);
  }
  return output;
}

/*
 * Convert a raw string to an array of big-endian words
 * Characters >255 have their high-byte silently ignored.
 */
export function rstr2binb(input) {
  var output = Array(input.length >> 2);
  for(var i = 0; i < output.length; i++) {
    output[i] = 0;
  }
  for(var i = 0; i < input.length * 8; i += 8) {
    output[i>>5] |= (input.charCodeAt(i / 8) & 0xFF) << (24 - i % 32);
  }
  return output;
}

/*
 * Bitwise rotate a 32-bit number to the left.
 */
export function bit_rol(num, cnt) {
  return (num << cnt) | (num >>> (32 - cnt));
}
