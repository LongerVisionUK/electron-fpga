const path = require('path');
const { Sim, Triple } = require('../../lib');

const inputs = [
  path.join(__dirname, 'bench.v'),
  path.join(__dirname, 'top.v')
];
const top = 'tb';

const sim = new Sim({
  triple: new Triple('ice40-hx8k-ct256')
});
const out = path.join(__dirname, 'build', 'sim.out');

sim.sim(inputs, out, top);
