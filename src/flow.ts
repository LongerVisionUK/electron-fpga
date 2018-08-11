import * as path from 'path'
import { Triple } from './triple'
import { Synth, Pnr, Pack, Prog, Time } from './tools'
import { Pcf } from './pcf'

export class Flow {
    protected _synth: Synth | undefined
    protected _pnr: Pnr | undefined
    protected _pack: Pack | undefined
    protected _prog: Prog | undefined
    protected _time: Time | undefined

    constructor(readonly triple: Triple) {}

    _getTmpFileBase(file: string): string {
        const builddir = path.dirname(file)
        const filename = path.basename(file)
        const parts = filename.split('.')
        if (parts.length > 1) {
            parts.pop()
        }
        return path.join(builddir, parts.join('.'))
    }

    flow(input: string, output: string, top: string, pcf: string | Pcf): void {
        const tmpBase = this._getTmpFileBase(output)
        const synth_output = tmpBase + '.json'
        const pnr_output = tmpBase + '.asc'

        if (pcf instanceof Pcf) {
            const pcf_output = tmpBase + '.pcf'
            pcf.write(pcf_output)
            pcf = pcf_output
        }

        this.synth(input, synth_output, top)
        this.pnr(synth_output, pnr_output, pcf)
        this.pack(pnr_output, output)
    }

    synth(input: string, output: string, top: string): void {
        if (!this._synth) {
            this._synth = new Synth(this.triple)
        }
        this._synth.synth(input, output, top)
    }

    pnr(input: string, output: string, pcf: string): void {
        if (!this._pnr) {
            this._pnr = new Pnr(this.triple)
        }
        this._pnr.pnr(input, output, pcf)
    }

    pack(input: string, output: string): void {
        if (!this._pack) {
            this._pack = new Pack(this.triple)
        }
        this._pack.pack(input, output)
    }

    prog(input: string): void {
        if (!this._prog) {
            this._prog = new Prog(this.triple)
        }
        this._prog.prog(input)
    }

    time(input: string): void {
        if (!this._time) {
            this._time = new Time(this.triple)
        }
        this._time.time(input)
    }
}
