PBKDF2
======

This is a pure-js implementation of the PBKDF2 algorithm, allowing you to
generate cryptographic keys from passwords in a way that makes it more
expensive for attackers to brute-force it.

For information on how it works, see
[the wikipedia page](https://en.wikipedia.org/wiki/PBKDF2).

Loading
-------

The PBKDF2 is both the default export and exported by name, allowing you to
load it into your application as follows:

```js
import   PBKDF2   from '@finwo/digest-pbkdf2';
import { PBKDF2 } from '@finwo/digest-pbkdf2';

const { PBKDF2 } = require('@finwo/digest-pbkdf2');
```

API
---

```js
PBKDF2(password, salt, num_iterations, num_bytes);
```

**arguments**

- password: string

  The master password from which a derived key is generated

- salt: string

  A [cryptographic salt](https://en.wikipedia.org/wiki/Salt_(cryptography)

- num_iterations: integer

  The number of iterations the PBKDF2 algorithm is executed for. Higher means
  more secure by requiring more computational resources to turn a password into
  a key.

- num_bytes: integer

  The number of bytes the output key should be.

**returns**

An object/instance of `PBKDF2` containing a `deriveKey` method.

```js
.deriveKey( status_callback, result_callback );
```

**arguments**

- status_callback: (percentage: integer) => void

  Function to be called between chunks to indicate progress

- result_callback: (key: string) => void

  Function to be called when done, getting a hex-encoded string of the generated
  key
