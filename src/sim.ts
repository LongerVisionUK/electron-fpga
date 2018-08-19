import { execSync } from 'child_process'
import { Triple } from './triple'
import { Synth } from './tools/synth'
import { getRelPath } from './relpath'

export interface ISimOptions {
    triple?: Triple
    vpiSearchPath?: string[]
    vpiModules?: string[]
}

export class Sim {

    constructor(readonly options: ISimOptions = {}) {}

    sim(input: string[], output: string, top: string): void {
        this.iverilog(input, output, top)
        this.vvp(output)
    }

    iverilog(input: string[], output: string, top: string): void {
        if (this.options.triple) {
            const synth = new Synth(this.options.triple)
            input.push(synth.cellsPath())
        }
        execSync(`iverilog -s ${top} -o ${output} ${input.join(' ')}`)
    }

    vvp(input: string): void {
        let options = ''
        if (!this.options.vpiSearchPath) {
            this.options.vpiSearchPath = [
                getRelPath('vvp', '../lib/ivl')
            ]
        }
        options += `-M ${this.options.vpiSearchPath.join(':')}`
        if (this.options.vpiModules) {
            options += this.options.vpiModules
                .map((m) => `-m ${m}`).join(' ')
        }
        execSync(`vvp ${options} ${input}`)
    }
}
