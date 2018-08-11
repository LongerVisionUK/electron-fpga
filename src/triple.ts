export class Triple {
    readonly family: string
    readonly device: string
    readonly package: string

    constructor(readonly triple: string) {
        const parts = triple.split('-')
        if (parts.length !== 3) {
            throw new Error(`Invalid triple '${triple}'.`)
        }
        this.family = parts[0]
        this.device = parts[1]
        this.package = parts[2]
    }
}
