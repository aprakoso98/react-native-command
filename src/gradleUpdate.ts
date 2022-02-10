import * as fs from 'fs'
import { ROOT_PATH, theParams } from '../bin';

function gradleUpdate() {
	type Params = '--type' | '-t' | '--version' | '-v' | '--version-code' | '-vc' | '--platform' | '-p'
	const gradleFile = `${ROOT_PATH}/android/gradle.properties`
	const configFilePath = `${ROOT_PATH}/envs/gradle-properties.json`
	const {
		'--type': type, '-t': _type = 'dev',
		'--platform': _platform, '-p': __platform = 'android'
	} = theParams as MyObject<Params>
	const platform = (_platform ?? __platform) as Platform
	const releaseType = type ?? _type
	const releaseConfigPath = `${ROOT_PATH}/envs/config-${releaseType}.json`
	const releaseConfigAll: MyObject<Platform, MyObject> = require(`${releaseConfigPath}`)
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

export default gradleUpdate