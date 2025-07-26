#!/usr/bin/env bun
import { Glob } from 'bun'
import remarkMan from 'remark-man'
import remarkParse from 'remark-parse'
import { unified } from 'unified'
import { version } from '../package.json'

for (const path of new Glob(`./**/*.md`).scanSync({
	cwd: import.meta.dir,
	absolute: true,
	onlyFiles: true,
})) {
	console.log(path)
	const file = await unified()
		.use(remarkParse)
		.use(remarkMan, { version, manual: 'Write with more freedom' })
		.process(await Bun.file(path).text())
	Bun.file(path.slice(0, -3)).write(String(file))
}
