import { inRange } from 'es-toolkit'

export type HirariOpts = {
    twoNewlines: boolean
    loop: boolean,
}

export type DialogLine = {
    pos: number
    text: string
}

const defaultHirariOpts: HirariOpts = {
    twoNewlines: false,
    loop: false,
}

/**
 * @summary A class that stores your dialog.
 *
 * @param dialog - Dialog string
 * @param opts - Options
 */
export class Hirari {
    /**
     * @summary Separated dialog lines
     */
    lines: Array<string>
    opts: HirariOpts
    now: DialogLine
    next: DialogLine | undefined
    prev: DialogLine | undefined
    constructor(dialog: string, opts?: Partial<HirariOpts>) {
        this.opts = { ...defaultHirariOpts, ...opts }

        const _lines = dialog.trim()
        if (_lines === '') throw new Error("EMPTY_DIALOG")

        // H: Not sure why it needs `?:`
        this.lines = this.opts.twoNewlines ? _lines.split(/(?:\r?\n){2,}/g) : _lines.split(/\r?\n/g)
        this.now = { pos: 0, text: this.lines[0]! }
        this.to(0)
    }
    to(pos: number): void {
        if (!inRange(pos, 0, this.lines.length)) throw new Error("BEYOND_LINES")
        Object.assign(this, {
            prev: pos > 0 && { pos: pos - 1, text: this.lines[pos - 1] },
            now: { pos, text: this.lines[pos] },
            next: pos < this.lines.length ? { pos: pos + 1, text: this.lines[pos + 1] } : undefined,
        })
    }
    inc(count = 1): void {
        const _targetPos = this.now.pos + count
        if (!inRange(_targetPos, 0, this.lines.length) && !this.opts.loop) throw new Error("BEYOND_LINES")
        const targetPos = (_targetPos % this.lines.length) + (_targetPos < 0 ? this.lines.length : 0)
        this.to(targetPos)
    }
    dec(count = 1): void { this.inc(-count) }
    end(): void { this.to(this.lines.length - 1) }
}
