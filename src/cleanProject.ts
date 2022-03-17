import { program } from 'commander'
import { platformTarget, thread } from '../methods'

function cleanProject({ platform }: MyObject<'platform'>) {
	if (platform === 'ios') {
		thread('cd ios; xcodebuild clean')
	} else {
		thread('cd android; ./gradlew clean')
	}
}

export const cleanProjectCommand = () => program
	.command('clean')
	.alias('cl')
	.description('Clean react-native project')
	.action(cleanProject)
	.addOption(platformTarget)