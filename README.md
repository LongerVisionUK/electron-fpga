# Electron FPGA Toolchain wrapper

Wrapps fpga tools with a js api.

## Getting Started
Synthesize and flash example.

```ts
import { Flow, Triple, Pcf } from 'electron-fpga'

const flow8k = new Flow(new Triple('ice40-hx8k-ct256'))
flow8k.flow('top.v', 'build/hx8k/top.bin', 'top', 'hx8k.pcf')
flow8k.time()
flow8k.prog('build/hx8k/top.bin')
```

You can also construct a pcf file inline.

```ts
const hx1kpcf = new Pcf();
hx1kpcf.setIo('led1', '4');
hx1kpcf.setIo('led2', '5');
hx1kpcf.setIo('led3', '6');
hx1kpcf.setIo('led4', '7');
hx1kpcf.setIo('led5', '8');

const flow1k = new Flow(new Triple('ice40-hx1k-tq144'));
flow1k.flow('top.v', 'build/hx1k/top.bin', 'top', pcf);
```

## License
ISC License

Copyright (c) 2017, David Craven and others

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted, provided that the above
copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE
OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
