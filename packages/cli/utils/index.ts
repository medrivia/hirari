import nodeUtil from 'node:util'
import nodeFs from 'node:fs/promises'
import nodePath from 'node:path'

/**
 * @summary Gets parent directory
 *
 * @remarks Be aware of trailing slash when returned
 */
export const getParentDir = (path: string, level = 1): string => {
	return nodePath.join(path, '../'.repeat(level))
}

/**
 * @summary Get this package/module root directory
 *
 * @remarks Be aware of trailing slash when returned
 */
export const getProjectRoot = (): string => {
	return getParentDir(Bun.resolveSync('./package.json', '.'))
}

/**
 * @summary Throws error if one of supplied binaries is not found.
 *
 * @remarks Requires Bun.which
 *
 * @link https://bun.sh/docs/api/utils#bun-which
 */
export const assertBins = (bins = ['fzf', 'less']): void => {
	const missing = bins.filter((bin) => !Bun.which(bin))
	if (missing.length > 0) {
		throw new Error(
			'Missing these binaries: ' + styleText(['blue'], missing.join(' ')),
		)
	}
}

/**
 * @summary Executes fzf inline with supplied choices (in array)
 *
 * @remarks Requires Bun.spawn
 * @remarks Return can be empty string
 *
 * @link https://bun.sh/docs/api/spawn
 */
export const inlineFzf = async (
	choices = ['man', 'help', 'quit'],
): Promise<string> => {
	const proc = Bun.spawn(['fzf'], {
		stdin: 'pipe',
		stdout: 'pipe',
	})
	proc.stdin.write(choices.join('\n') + '\n')
	proc.stdin.flush()
	proc.stdin.end()
	await proc.exited
	const output = (await new Response(proc.stdout).text()).trim()
	return output
}

/**
 * @alpha
 * @summary Show manual (static)
 *
 * @remarks Requires Bun.spawn
 */
export const showMan = async (): Promise<void> => {
	const proc = Bun.spawn(
		['man', nodePath.join(getProjectRoot(), 'man/man1/hirari.1')],
		{
			stdout: 'inherit',
		},
	)
	await proc.exited
}

/**
 * @beta
 * @summary Show help/overview section
 *
 * @remarks Requires Bun.spawn
 */
export const showHelp = async (): Promise<void> => {
	const proc = Bun.spawn(['less'], {
		stdin: 'pipe',
		stdout: 'inherit',
	})
	proc.stdin.write('This is a help section.')
	proc.stdin.flush()
	proc.stdin.end()
	await proc.exited
}

/**
 * @summary Give color in terminal
 *
 * @alpha Only show list of formats for `util.styleText`, atm.
 *
 * @link https://bun.sh/reference/node/util/styleText#node:util.styleText
 * @link https://github.com/chalk/chalk
 */
export const styleText = (
	formats: Parameters<typeof nodeUtil.styleText>[0],
	text: string,
): string => {
	const available_formats: Partial<Parameters<typeof nodeUtil.styleText>[0]> = [
		'black',
		'red',
		'green',
		'yellow',
		'blue',
		'magenta',
		'cyan',
		'white',
		'gray',
		'bold',
		'dim',
		'italic',
		'underline',
		'inverse',
		'strikethrough',
		'reset',
	]
	const missing = Array.isArray(formats)
		? formats.filter((f) => !available_formats.includes(f))
		: !available_formats.includes(formats)
			? [formats]
			: []
	if (missing.length > 0)
		throw new Error(
			'Invalid format(s): ' + nodeUtil.styleText(['red'], missing.join(' ')),
		)
	return nodeUtil.styleText(formats, text)
}
