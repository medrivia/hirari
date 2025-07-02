import { expect, test } from 'bun:test'
import { Hirari } from './index.ts'
import { literal as markdown } from '@mdrv/m/v257'

// const dialog01 = `
// This is me, Hirari.
// Do you accept me as a friend?
// I would be very happy if you accept.
// `.trim()
//
// test('Simple dialog', async () => {
// 	const H = new Hirari(dialog01)
// 	expect(H.now.text).toBe('This is me, Hirari.')
// 	H.inc()
// 	expect(H.now.text).toBe('Do you accept me as a friend?')
// 	H.dec()
// 	expect(H.now.text).toBe('This is me, Hirari.')
// 	H.end()
// 	expect(H.now.text).toBe('I would be very happy if you accept.')
// })

const dialog02 = `
This is me, Hirari.

Do you accept me as a friend?

I would be very happy if you accept.
`.trim()

test('twoNewlines dialog', async () => {
	const H = new Hirari(dialog02, { twoNewlines: true })
	expect(H.opts.twoNewlines).toBeTrue()
	console.log(H.lines)
	expect(H.now.x).toBe('This is me, Hirari.')
	H.inc()
	expect(H.now.x).toBe('Do you accept me as a friend?')
	H.dec()
	expect(H.now.x).toBe('This is me, Hirari.')
	H.end()
	expect(H.now.x).toBe('I would be very happy if you accept.')
})

/**
 * With multi-language
 */
const dialog03 = markdown`
HIRARI>>
@en> This is me, Hirari.
@id> Ini aku, Hirari.
@ja> こちらはヒラリです。
::

HIRARI>>
@en> Do you accept me as a friend?
@id> Apa kamu menerimaku sebagai teman?
@ja> :ruby[私(わたし)]を:ruby[友達(ともだち)]として:ruby[受(う)]け:ruby[入(い)]れてくれる？
::

HIRARI>>
@en> I would be very happy if you accept.
@id> Aku sangat senang jika kamu menerima.
@ja> もし:ruby[受(う)]け:ruby[入(い)]れて:ruby[頂(いただ)]ければとても:ruby[嬉(うれ)]しいです。
::

`.trim()

test('twoNewlines dialog', async () => {
	const H = new Hirari(dialog03, { twoNewlines: true, at: ['en', 'id', 'ja'] })
	expect(H.opts.twoNewlines).toBeTrue()
	console.log(H.lines)
	expect(H.now.x.id).toBe('Ini aku, Hirari.')
	H.inc()
	expect(H.now.x.en).toBe('Do you accept me as a friend?')
	H.dec()
	expect(H.now.x.ja).toBe('こちらはヒラリです。')
})
