import { execSync } from 'child_process'
import { Triple } from '../triple'

export class Pack {
    static supportedFamilies = [ 'ice40' ]

    constructor(readonly triple: Triple) {
        if (Pack.supportedFamilies.indexOf(triple.family) === -1) {
            throw new Error(`Unsupported target family '${triple.family}'.`)
        }
    }

    pack(input: string, output: string): void {
        execSync(`icepack '${input}' '${output}'`, { stdio: [0, 1, 2] })
    }
}
