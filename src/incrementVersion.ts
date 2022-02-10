import { Argument, Option, program } from 'commander';
import * as fs from 'fs'
import { ROOT_PATH } from '../bin';

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
	.action(incrementVersion)
	.addOption(new Option('-t, --type <type>', 'Platforms')
		.choices(['dev', 'prod'])
		.default('dev')
	)
	.addOption(new Option('-p, --platform <platform>', 'Platforms')
		.choices(['android', 'ios'])
		.default('android')
	)
	.addArgument(new Argument('[string]').argParser(value => {
		return value.split(' ').reduce((ret, val) => {
			const [key, value] = val.split('=')
			ret[key] = value
			return ret
		}, {})
	}))