const fs = require('fs');
const path = require('path');
const { Flow, Triple, Pcf } = require('../../lib');

/* Setup */
const input = path.join(__dirname, 'top.v');
const top = 'top';

const builddir = path.join(__dirname, 'build');
if (!fs.existsSync(builddir)) {
  fs.mkdirSync(builddir);
}

/* HX8K flow */
const hx8kdir = path.join(builddir, 'hx8k');
if (!fs.existsSync(hx8kdir)) {
  fs.mkdirSync(hx8kdir);
}
const hx8kbin = path.join(hx8kdir, 'top.bin');
const hx8kpcf = path.join(__dirname, 'pinmap.pcf');

const flow8k = new Flow(new Triple('ice40-hx8k-ct256'));
flow8k.flow(input, hx8kbin, top, hx8kpcf);


/* HX1K flow */
const hx1kdir = path.join(builddir, 'hx1k');
if (!fs.existsSync(hx1kdir)) {
  fs.mkdirSync(hx1kdir);
}
const hx1kbin = path.join(hx1kdir, 'top.bin');

const hx1kpcf = new Pcf();
hx1kpcf.setIo('hwclk', 'J3');
hx1kpcf.setIo('led1', 'B5');
hx1kpcf.setIo('led2', 'B4');
hx1kpcf.setIo('led3', 'A2');
hx1kpcf.setIo('led4', 'A1');
hx1kpcf.setIo('led5', 'C5');
hx1kpcf.setIo('led6', 'C4');
hx1kpcf.setIo('led7', 'B3');
hx1kpcf.setIo('led8', 'C3');

const flow1k = new Flow(new Triple('ice40-hx8k-ct256'));
flow1k.flow(input, hx1kbin, top, hx1kpcf);
