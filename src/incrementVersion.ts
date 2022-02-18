import * as fs from 'fs'
import { Argument, program } from 'commander';

import { platformTarget, releaseType, ROOT_PATH, THE_COMMAND } from '../methods';

function incrementVersion(args: MyObject, { platform, type }: MyObject<'type' | 'platform'>) {
	const releaseConfigPath = `${ROOT_PATH}/envs/config-${type}.json`
	const releaseConfig: MyObject<string, MyObject> = require(`${releaseConfigPath}`)
	const { [platform]: platformConfig, ...otherPlatform } = releaseConfig
	const keys = Object.keys(args)
	const newReleaseConfigPlatform = keys.reduce((ret, key) => {
		const versionFormat = args?.[key].split('.') ?? []
		if (key in platformConfig) {
			const exValue = platformConfig[key] as string
			const newValue = exValue.split('.').map((ver, i) => {
				const verFormat: string = versionFormat[i]
				if (verFormat === '+') return parseInt(ver) + 1
				if (verFormat.match(/^[0-9]*$/)) return parseInt(verFormat)
				return ver
			}).join('.')
			ret[key] = newValue
		}
		return ret
	}, {})
	const newReleaseConfig = {
		...otherPlatform,
		[platform]: { ...platformConfig, ...newReleaseConfigPlatform }
	}
	fs.writeFileSync(releaseConfigPath, JSON.stringify(newReleaseConfig, undefined, 4))
}

export const incrementVersionCommand = () => program
	.command('increment-version')
	.description(`Increment your version in env files. e.g. ${THE_COMMAND} increment-version VERSION=2.x.+.-
2 mean in that position will replaced with 2
x mean in that position will be the same
+ mean in that position will plus 1
- mean in that position will minus 1`)
	.action(incrementVersion)
	.addOption(releaseType)
	.addOption(platformTarget)
	.addArgument(new Argument('[string]', 'Additional properties').argParser(value => {
		return value.split(' ').reduce((ret, val) => {
			const [key, value] = val.split('=')
			ret[key] = value
			return ret
		}, {})
	}))