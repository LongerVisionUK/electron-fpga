import { execSync } from 'child_process'
import { Triple } from '../triple'

export interface IProgOptions {
    offset?: string
    device?: IUsbDevice
    ftdiInterface?: 'A' | 'B' | 'C' | 'D'
}

export interface IUsbDevice {
    vendor: string
    product: string
    serial?: string
}

export class Prog {
    static supportedFamilies = [ 'ice40' ]

    constructor(readonly triple: Triple) {
        if (Prog.supportedFamilies.indexOf(triple.family) === -1) {
            throw new Error(`Unsupported target family '${triple.family}'.`)
        }
    }

    prog(file: string, options: IProgOptions = {}): void {
        let strOptions = ''
        if (options.device) {
            strOptions += `-d i` +
                `:${options.device.vendor}` +
                `:${options.device.product}` +
                `:${options.device.serial || '0'}`
        }
        if (options.ftdiInterface) {
            strOptions += `-I ${options.ftdiInterface}`
        }
        if (options.offset) {
            strOptions += `-o ${options.offset}`
        }
        execSync(`iceprog ${strOptions} ${file}`, { stdio: [ 0, 1, 2 ] })
    }
}
