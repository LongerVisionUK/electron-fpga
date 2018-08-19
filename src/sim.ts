import { execSync } from 'child_process'

export class Sim {

    constructor(readonly searchPath: string[] = [],
                readonly modules: string[] = []) {}

    sim(input: string[], output: string): void {
        this.iverilog(input, output)
        this.vvp(output)
    }

    iverilog(input: string[], output: string): void {
        execSync(`iverilog -o ${output} ${input.join(' ')}`)
    }

    vvp(input: string): void {
        const spath = this.searchPath.join(':')
        const marg = spath === '' ? '' : `-M ${spath}`
        const mods = this.modules.map((m) => `-m ${m}`).join(' ')
        execSync(`vvp ${marg} ${mods} ${input}`)
    }
}
