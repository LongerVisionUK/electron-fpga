const path = require('path');
const { Flow, Triple } = require('../../lib');

const top = path.join(__dirname, 'top.v');
const bin = path.join(__dirname, './build/top.bin');
const pcf = path.join(__dirname, 'pinmap.pcf');

const flow8k = new Flow(new Triple('ice40-hx8k-ct256'));
flow8k.flow(top, bin, 'top', pcf);

//const flow1k = new Flow(new Triple('ice40-hx1k-tq144'));
//flow1k.flow(top, bin, 'top', pcf);
