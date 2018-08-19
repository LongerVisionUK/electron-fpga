import { execSync } from 'child_process'
import { Triple } from '../triple'

export class Time {
    static supportedFamilies = [ 'ice40' ]

    constructor(readonly triple: Triple) {
        if (Time.supportedFamilies.indexOf(triple.family) === -1) {
            throw new Error(`Unsupported target family '${triple.family}'.`)
        }
    }

    time(file: string): void {
        execSync(`iceprog -d ${this.triple.device} ` +
                 `-P ${this.triple.package} '${file}'`, { stdio: [ 0, 1, 2 ] })
    }
}
