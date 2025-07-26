import { inRange } from 'es-toolkit'

type GetKeys<T> = T extends {
    readonly at: readonly [...(infer K)]
} ? K : undefined

type DialogLine<T> = T extends string[] ? Record<T[number], string> : string

type Opts = {
    readonly at: readonly string[]
}

class Hi<T extends GetKeys<U>, U extends Partial<Opts>> {
    lines: Array<DialogLine<T>>
    now: { pos: number, x: DialogLine<T> }
    next: { pos: number, x: DialogLine<T> } | undefined
    prev: { pos: number, x: DialogLine<T> } | undefined
    readonly at: T
    constructor(dialog: string, opts?: U) {
        this.at = opts?.at as T

        const _lines = dialog.trim().split(/(?:\r?\n){2,}/g)
        this.lines = this.processAt(_lines)
        this.now = { pos: 0, x: this.lines[0]! }
    }

    /**
     *
     *
     * H: Type-defective due to no conditional return type support yet.
     * l: https://github.com/microsoft/TypeScript/issues/33014
     * l: https://stackoverflow.com/a/78347755
     */
    processAt(lines: Array<string>): Array<DialogLine<T>> {
        if (!this.at) return lines as Array<DialogLine<T>>
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
        }
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
}
