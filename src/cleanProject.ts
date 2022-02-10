import { Option, program } from 'commander'
import { thread } from '../bin'

function cleanProject({ platform }: MyObject<'platform'>) {
	if (platform === 'ios') {
		thread('cd ios; xcodebuild clean')
	} else {
		thread('cd android; ./gradlew clean')
	}
}

export const cleanProjectCommand = () => program
	.command('clean')
	.addOption(new Option('-p, --platform <platform>', 'Platforms')
		.choices(['android', 'ios'])
		.default('android')
	)
	.description('Clean project')
	.action(cleanProject)