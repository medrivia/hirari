#!/usr/bin/env bun
import { Glob } from 'bun'
import remarkMan from 'remark-man'
import remarkParse from 'remark-parse'
import {unified} from 'unified'
import { version } from './package.json'
const MAN_DIR = './man'

for (const path of new Glob(`${MAN_DIR}/**/*.md`).scanSync('.')) {
    const file = await unified()
      .use(remarkParse)
      .use(remarkMan, {version, manual: "Modular dialog/visual novel system"})
      .process(await Bun.file(path).text())
    Bun.file(path.slice(0, -3)).write(String(file))
}
