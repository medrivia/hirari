import { __ } from '@mdrv/m/v257'

type Opts = {
    pos: number
    at: string | undefined
    defaultAt: string | undefined
    multiline: boolean
    choices: boolean
    speaker: any
}

const RE = {
    speaker: /^(?<name>\w+)(\((?<alias>\S+)\))?(?<type>\+\+|--)(\s|$)/,
    at: /^@(?<at>\w+)\+(\s|$)/,
} satisfies Record<string, RegExp>

export class HirariProcessor {
    lines: Array<any> = []
    o: Opts
    static defaultOpts: Opts = {
        pos: 0,
        at: undefined,
        defaultAt: undefined,
        multiline: false,
        choices: false,
        speaker: undefined,
    }

    addPlain(str: string): void {
        const len = this.lines.length
        if (len === this.o.pos)
            this.lines.push(str)
        else
            this.lines[len-1] += str
    }

    constructor(str: string) {
        this.o = HirariProcessor.defaultOpts

        const lines = str.trim().split(/(?:\r?\n){1,}/g)

        for (const l of lines) {
            __(this.o)

            /**
             * 🔍: End multiline
             *
             * @example
             * 
             * ```md
             * __
             * ```
             */
            if (l.startsWith('__')) {
                Object.assign(this.o, {
                    multiline: false,
                    at: this.o.defaultAt
                })
                continue
                this.o.pos++
            }

            /**
             * 🔍: Init function mode
             *
             * @example
             *
             * ```md
             * >>> at.[id,ja,en] default.id
             * ```
             */
            if (l.startsWith('>>> ')) {
                for (const phrase of l.split(/\s+/)) {
                    if (phrase.startsWith('default.')) {
                        this.o.defaultAt = phrase.slice(8)
                    }
                }
                continue
            }

            /**
             * 🔍: Choice mode
             *
             * @example
             *
             * ```md
             * >> choice.pick
             * 
             *     Iya
             * 
             * zoe(?)-- He, kalau begitu selamat datang.
             * 
             *     Bukan
             * 
             * > zoe.sweating
             * 
             * zoe(?)-- Masa? Soalnya kamu terlihat kebingungan.
             * 
             * >> choice.end
             * ```
             */
            if (l.startsWith('>> ')) {
                for (const phrase of l.split(/\s+/)) {
                    if (phrase === 'choice.pick') {
                        this.o.choices = true
                    } else if (phrase === 'choice.end') {
                        this.o.choices = false
                    }
                }
                continue
            }

            /**
             * 🔍: Function mode
             *
             * @example
             *
             * ```md
             * > hide.miyo-fadeout-bg.taman-fadein-
             * > sfx.nyaa-
             * ```
             */
            if (l.startsWith('> ')) {
                continue
            }

            /**
             * 🔍: At mode
             *
             * @example
             *
             * ```md
             * @ja+ やあ、そこの:ruby[君(きみ)]
             * ```
             */
            const match_at = RE.at.exec(l)
            if (match_at) {
                const { at } = match_at.groups!
                // 🔥: Should check whether at exists.
                this.o.at  = at

                this.addPlain(l.slice(match_at[0].length))
                if (this.o.multiline) continue
                this.o.pos++
                continue
            }

            /**
             * 🔍: Speaker mode
             *
             * @example
             *
             * ```md
             * pia-- Itu mah yang di belakang gedung kelas, Miyo.
             *
             * zoe(?)++ Hai, kamu yang di sana.
             * @ja+ やあ、そこの:ruby[君(きみ)]
             * __
             * ```
             */
            const match_speaker = RE.speaker.exec(l)
            if (match_speaker) {
                const speaker = match_speaker.groups!
                if (speaker.type === '++') this.o.multiline = true
                this.o.speaker = speaker

                this.addPlain(l.slice(match_speaker[0].length))
                if (this.o.multiline) continue
                this.o.pos++
                continue
            }


        }

        __(this.lines)
    }
}
