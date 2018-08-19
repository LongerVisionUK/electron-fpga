import { execSync } from 'child_process'
import { Triple } from '../triple'
import { getRelPath } from '../relpath'

export class Synth {
    static supportedFamilies = [
        'ecp5', 'ice40', 'intel', 'xilinx'
    ]

    constructor(readonly triple: Triple) {
        if (Synth.supportedFamilies.indexOf(triple.family) === -1) {
            throw new Error(`Unsupported target family '${triple.family}'.`)
        }
    }

    synth(input: string[], output: string, top: string): void {
        const inputs = input.map((input) => `'${input}'`).join(' ')
        execSync(`yosys -p 'synth_${this.triple.family} ` +
                 `-top ${top} -json ${output}' ${inputs}`,
                { stdio: [ 0, 1, 2 ] })
    }

    cellsPath(): string {
        return getRelPath('yosys', `../share/yosys/${this.triple.family}/cells_sim.v`)
        //return spawnSync('yosys-config', [
        //    `--datdir/${this.triple.family}/cells_sim.v`
        //]).stdout
    }
}
