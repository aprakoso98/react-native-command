import { THE_COMMAND, theParams, thread } from '../bin';

async function buildRun(isBuild?: boolean) {
	type Params = '--type' | '-t' | '--platform' | '-p' | '--clean' | '-c' | '--build-type' | '-b'
	const {
		'--type': _type, '-t': __type = 'dev',
		'--clean': _clean, '-c': __clean = 'false',
		'--platform': _platform, '-p': __platform = 'android',
		'--build-type': _buildType, '-b': __buildType = 'assemble',
		...additionalCommand
	} = theParams as MyObject<Params>
	const command = Object.keys(additionalCommand).reduce((ret, key) => {
		ret.push(key, additionalCommand[key])
		return ret
	}, []).join(' ')
	const buildType = (_buildType ?? __buildType) as BuildType
	const platform = (_platform ?? __platform) as Platform
	const releaseType = (_type ?? __type) as ReleaseType
	const clean = ((_clean ?? __clean) as 'true' | 'false' === 'true') ? true : false

	if (platform === 'android') {
		await thread(`${THE_COMMAND} gradle-update -p="${platform}" -t="${releaseType}"`)
	}

	async function runApp() {
		if (platform === 'android') {
			if (clean) await thread(`${THE_COMMAND} clean`)
			await thread(`react-native run-android ${command}`)
		}
	}

	async function buildApp() {
		if (platform === 'android') {
			if (clean) await thread(`${THE_COMMAND} clean`)
			if (buildType === 'assemble')
				await thread(`cd android; ./gradlew assembleRelease`)
			else if (buildType === 'bundle')
				await thread(`cd android; ./gradlew bundleRelease`)
		}
	}

	if (isBuild) buildApp()
	else runApp()
}


export default buildRun