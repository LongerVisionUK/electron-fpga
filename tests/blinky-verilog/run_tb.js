const { Sim } = require('../../lib');

const sim = new Sim(['/opt/nextpnr/lib/ivl']);
sim.sim('bench.v', 'build/sim.out');
