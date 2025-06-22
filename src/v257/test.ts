import { expect, test } from 'bun:test'
import { Hirari } from './index.ts'

const dialog01 = `
This is me, Hirari.
Do you accept me as a friend?
I would be very happy if you accept.
`.trim()

test('Simple dialog', async () => {
    const H = new Hirari(dialog01)
    expect(H.now.text).toBe('This is me, Hirari.')
    H.inc()
    expect(H.now.text).toBe('Do you accept me as a friend?')
    H.dec()
    expect(H.now.text).toBe('This is me, Hirari.')
    H.end()
    expect(H.now.text).toBe('I would be very happy if you accept.')
})

const dialog02 = `
This is me, Hirari.

Do you accept me as a friend?

I would be very happy if you accept.
`.trim()

test('twoNewlines dialog', async () => {
    const H = new Hirari(dialog02, { twoNewlines: true })
    expect(H.opts.twoNewlines).toBeTrue()
    console.log(H.lines)
    expect(H.now.text).toBe('This is me, Hirari.')
    H.inc()
    expect(H.now.text).toBe('Do you accept me as a friend?')
    H.dec()
    expect(H.now.text).toBe('This is me, Hirari.')
    H.end()
    expect(H.now.text).toBe('I would be very happy if you accept.')
})
