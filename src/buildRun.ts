import { Argument, Option, program } from 'commander';
import { THE_COMMAND, thread } from '../methods';

async function buildRun(args: 'build', options: MyObject<'type' | 'platform' | 'clean' | 'buildType' | 'additional'>) {
	const { buildType, clean, platform, type: releaseType, additional } = options
	const isBuild = args === 'build'
	const command = additional.replace(/^"|"$/g, '')
	if (platform === 'android') {
		await thread(`${THE_COMMAND} gradle-update -p ${platform} -t ${releaseType}`)
	}

	async function runApp() {
		if (platform === 'android') {
			if (clean) await thread(`${THE_COMMAND} clean`)
			await thread(`npx react-native run-android ${command}`)
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

export const buildRunCommand = () => program
	.command('run')
	.action(buildRun)
	.addArgument(new Argument('[string]').choices(['build']))
	.addOption(new Option('-c, --clean', 'Platforms').default(false))
	.addOption(new Option('-a, --additional <string>', 'Platforms').default(''))
	.addOption(new Option('-p, --platform <platform>', 'Platforms')
		.choices(['android', 'ios'])
		.default('android')
	)
	.addOption(new Option('-t, --type <type>', 'Platforms')
		.choices(['dev', 'prod'])
		.default('dev')
	)
	.addOption(new Option('-b, --build-type <build-type>', 'Platforms')
		.choices(['assemble', 'bundle'])
		.default('assemble')
	)