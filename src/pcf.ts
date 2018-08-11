import * as fs from 'fs'

export class Pcf {
    readonly io: [string, string][] = []

    constructor() {}

    setIo(pin: string, pad: string) {
        this.io.push([pin, pad])
    }

    write(file: string): void {
        const pcfStr = this.io.map((pin, pad) => {
            return `set_io ${pin} ${pad}`
        }).join('\n')
        fs.writeFileSync(file, pcfStr)
    }
}
