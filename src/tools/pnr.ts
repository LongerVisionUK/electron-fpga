import { execSync } from 'child_process'
import { Triple } from '../triple'

export class Pnr {
    static supportedFamilies = [
        'ice40'
    ]

    constructor(readonly triple: Triple) {
        if (Pnr.supportedFamilies.indexOf(triple.family) === -1) {
            throw new Error(`Unsupported target family '${triple.family}'.`)
        }
    }

    pnr(input: string, output: string, pcf: string): void {
        execSync(`nextpnr-${this.triple.family} ` +
                 `--${this.triple.device} ` +
                 `--package ${this.triple.package} ` +
                 `--json ${input} ` +
                 `--pcf ${pcf} ` +
                 `--asc ${output}`,
                 { stdio: [ 0, 1, 2 ] })
    }
}
