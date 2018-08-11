import { execSync } from 'child_process'
import { Triple } from '../triple'

export class Prog {
    static supportedFamilies = [ 'ice40' ]

    constructor(readonly triple: Triple) {
        if (Prog.supportedFamilies.indexOf(triple.family) === -1) {
            throw new Error(`Unsupported target family '${triple.family}'.`)
        }
    }

    prog(file: string): void {
        execSync(`iceprog ${file}`, { stdio: [ 0, 1, 2 ] })
    }
}
