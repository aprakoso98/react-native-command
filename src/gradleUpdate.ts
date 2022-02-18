import * as fs from 'fs'
import { Option, program } from 'commander';

import { ROOT_PATH } from '../methods';

function gradleUpdate({ platform, type: releaseType }: MyObject<'platform' | 'type'>) {
	const gradleFile = `${ROOT_PATH}/android/gradle.properties`
	const configFilePath = `${ROOT_PATH}/envs/gradle-properties.json`
	const releaseConfigPath = `${ROOT_PATH}/envs/config-${releaseType}.json`
	const releaseConfigAll: MyObject<string, MyObject> = require(`${releaseConfigPath}`)
	const { [platform]: releaseConfig } = releaseConfigAll
	if (['dev', 'prod'].includes(releaseType)) {
		const properties = fs.readFileSync(gradleFile, { encoding: 'utf8' })
			.split(/\n/g)
			.reduce((ret, val) => {
				const [key, ...value] = val?.split('=') ?? []
				if (key !== '') ret[key] = value.join('=')
				return ret
			}, {} as MyObject)
		const config = require(`${configFilePath}`)
		const newConfig = { ...properties, ...config, ...releaseConfig, CURRENT_CONFIG: releaseType }
		const parsed = Object.keys(newConfig)
			.map(key => `${key}=${newConfig[key]}`)
			.join('\n')
		fs.writeFileSync(gradleFile, parsed)
		fs.writeFileSync(configFilePath, JSON.stringify(newConfig, undefined, 4))
	}
}

export const gradleUpdateCommand = () => program
	.command('gradle-update')
	.action(gradleUpdate)
	.addOption(new Option('-p, --platform <platform>', 'Platforms')
		.choices(['android', 'ios'])
		.default('android')
	)
	.addOption(new Option('-t, --type <type>', 'Platforms')
		.choices(['dev', 'prod'])
		.default('dev')
	)