import { execSync } from 'child_process'
import { Triple } from '../triple'

export class Synth {
    static supportedFamilies = [
        'ecp5', 'ice40', 'intel', 'xilinx'
    ]

    constructor(readonly triple: Triple) {
        if (Synth.supportedFamilies.indexOf(triple.family) === -1) {
            throw new Error(`Unsupported target family '${triple.family}'.`)
        }
    }

    synth(input: string, output: string, top: string): void {
        execSync(`yosys -p 'synth_${this.triple.family} ` +
                 `-top ${top} -json ${output}' ${input}`,
                { stdio: [ 0, 1, 2 ] })
    }
}
