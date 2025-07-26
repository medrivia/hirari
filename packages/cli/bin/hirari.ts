#!/usr/bin/env bun
if (typeof Bun === 'undefined' || !process.versions.bun) {
	throw new Error('This app needs to be executed with Bun.')
}

import {
	assertBins,
	inlineFzf,
	showHelp,
	styleText as stx,
	getProjectRoot,
	showMan,
} from '../utils'

const EXT_BINS = ['fzf', 'less']
assertBins(EXT_BINS)

const exit = () => {
	console.log('Keep writing!')
	process.exit(0)
}

process.on('SIGINT', () => {
	exit()
})

const cmd = await inlineFzf()

if (!cmd) {
	console.log(stx(['dim'], 'You didn’t choose anything.'))
	exit()
}

if (cmd === 'man') {
	showMan()
}

if (cmd === 'help') {
	showHelp()
}

if (cmd === 'quit') {
	exit()
}

console.log('you choose: ' + cmd)
