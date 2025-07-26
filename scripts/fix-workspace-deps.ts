import fs from 'node:fs'
import path from 'node:path'

const packagesDir = path.join(process.cwd(), 'packages')
const packages = fs.readdirSync(packagesDir)

const versions = {}
for (const pkg of packages) {
	const pkgJsonPath = path.join(packagesDir, pkg, 'package.json')
	if (fs.existsSync(pkgJsonPath)) {
		const pkgJson = JSON.parse(fs.readFileSync(pkgJsonPath, 'utf8'))
		versions[pkgJson.name] = pkgJson.version
	}
}

for (const pkg of packages) {
	const pkgJsonPath = path.join(packagesDir, pkg, 'package.json')
	if (fs.existsSync(pkgJsonPath)) {
		let pkgJson = JSON.parse(fs.readFileSync(pkgJsonPath, 'utf8'))
		;[
			'dependencies',
			'devDependencies',
			'peerDependencies',
			'optionalDependencies',
		].forEach((depType) => {
			if (pkgJson[depType]) {
				for (const dep in pkgJson[depType]) {
					if (pkgJson[depType][dep].startsWith('workspace:')) {
						const symbol = pkgJson[depType][dep].slice(-1)
						pkgJson[depType][dep] = versions[dep]
							? `${symbol === '*' ? '' : symbol}${versions[dep]}`
							: pkgJson[depType][dep]
					}
				}
			}
		})
		fs.writeFileSync(pkgJsonPath, JSON.stringify(pkgJson, null, 2))
	}
}
