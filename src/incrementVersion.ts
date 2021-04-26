import * as fs from 'fs'
import { ROOT_PATH, theParams } from '../bin';

function incrementVersion() {
	type Params = '--type' | '-t' | '-vc' | '--platform' | '-p'
	const {
		'--type': _type, '-t': __type = 'dev',
		'--platform': _platform, '-p': __platform = 'android'
	} = theParams as MyObject<Params>
	const platform = (_platform ?? __platform) as Platform
	const releaseType = _type ?? __type
	const releaseConfigPath = `${ROOT_PATH}/envs/config-${releaseType}.json`
	const releaseConfig: MyObject<Platform, MyObject> = require(`${releaseConfigPath}`)
	const { [platform]: platformConfig, ...otherPlatform } = releaseConfig
	const keys = Object.keys(theParams)
	const newReleaseConfigPlatform = keys.reduce((ret, key) => {
		const versionFormat = theParams?.[key].split('.') ?? []
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
		[platform]: newReleaseConfigPlatform
	}
	fs.writeFileSync(releaseConfigPath, JSON.stringify(newReleaseConfig, undefined, 4))
}

export default incrementVersion