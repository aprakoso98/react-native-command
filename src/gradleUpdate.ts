import * as fs from 'fs'
import { program } from 'commander';

import { platformTarget, releaseType, ROOT_PATH } from '../methods';

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
	.alias('gu')
	.description('Switch gradle.properties value from env value')
	.action(gradleUpdate)
	.addOption(releaseType)
	.addOption(platformTarget)