import { inRange } from 'es-toolkit'

// @issue Needs to fix not-narrowing type
type GetKeys<T> = T extends {
    readonly at: readonly [...(infer K)]
} ? K : []

export type HirariOpts = {
    twoNewlines: boolean
    loop: boolean,
    at?: Array<string> | undefined
}

type DialogLine<T> = T extends string[] ? Record<T[number], string> : string

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
export class Hirari<T extends GetKeys<U>, U extends Partial<HirariOpts>> {
    /**
     * @summary Separated dialog lines
     */
    opts: HirariOpts
    readonly at: T
    lines: Array<DialogLine<T>>
    now: { pos: number, x: DialogLine<T> }
    next: { pos: number, x: DialogLine<T> } | undefined
    prev: { pos: number, x: DialogLine<T> } | undefined
    constructor(dialog: string, opts?: U) {
        this.opts = { ...defaultHirariOpts, ...opts }
        this.at = opts?.at as T

        // H: Not sure why it needs `?:`
        const _lines = dialog.trim().split(/(?:\r?\n){2,}/g)
        console.log(_lines.length)
        this.lines = this.processAt(_lines)

        this.now = { pos: 0, x: this.lines[0]! }
        this.to(0)
    }

    /**
     *
     *
     * H: Type-defective due to no conditional return type support yet.
     * l: https://github.com/microsoft/TypeScript/issues/33014
     * l: https://stackoverflow.com/a/78347755
     */
    processAt(lines: Array<string>): Array<DialogLine<T>> {
        if (!this.at || this.at.length === 0) return lines as Array<DialogLine<T>>
        let res: Array<Record<string, string>> = []
        for (const l of lines) {
            let _res: Record<string, string> = {}
            for (const ll of l.split(/\r?\n/g)) {
                for (const at of this.at) {
                    if (ll.startsWith(`@${at}`)) {
                        _res[at] = ll
                    }
                }
            }
            res.push(_res)
        }
        console.log(res)
        return res as Array<DialogLine<T>>
    }

    /**
     * H: Type-defective due to no conditional return type support yet.
     * l: https://github.com/microsoft/TypeScript/issues/33014
     * l: https://stackoverflow.com/a/78347755
     */

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
