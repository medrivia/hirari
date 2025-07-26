import {HirariProcessor as HP} from './process.ts'
import { expect, test } from 'bun:test'

test('Simple', async () => {
    const text = await Bun.file('./examples/untitled-ch01.md').text()
    const hp = new HP(text)
})

