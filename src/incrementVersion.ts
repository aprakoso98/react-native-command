import * as fs from 'fs'
import { ROOT_PATH, theParams } from '../bin';

function incrementVersion() {
	type Params = '--type' | '-t' | '--version' | '-v' | '--version-code' | '-vc' | '--platform' | '-p'
	const {
		'--type': _type, '-t': __type = 'dev',
		'--platform': _platform, '-p': __platform = 'android',
		'--version': version, '-v': _version = 'x.x.+',
		'--version-code': verCode, '-vc': _verCode = '0'
	} = theParams as MyObject<Params>
	const platform = (_platform ?? __platform) as Platform
	const releaseType = _type ?? __type
	const releaseConfigPath = `${ROOT_PATH}/envs/config-${releaseType}.json`
	const releaseConfig: MyObject<Platform, MyObject> = require(`${releaseConfigPath}`)
	const versionFormat = (version ?? _version).split('.')
	const versionCode = parseInt(verCode ?? _verCode)
	const { [platform]: { VERSION_CODE, VERSION_NAME }, ...otherPlatform } = releaseConfig
	const newReleaseConfig = {
		...otherPlatform,
		[platform]: {
			VERSION_CODE: `${parseInt(VERSION_CODE) + versionCode}`,
			VERSION_NAME: VERSION_NAME.split('.').map((ver, i) => {
				const v = versionFormat[i] === '+' ? parseInt(ver) + 1 : ver
				return v
			}).join('.')
		}
	}
	fs.writeFileSync(releaseConfigPath, JSON.stringify(newReleaseConfig, undefined, 4))
}

export default incrementVersion