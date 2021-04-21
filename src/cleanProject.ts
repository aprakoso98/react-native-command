import { exec } from 'child_process'
import { theParams } from '../bin'

function cleanProject() {
	const {
		'--platform': platform, '-p': _platform = 'android'
	} = theParams as MyObject<'--platform' | '-p', Platform>
	if ((platform ?? _platform) === 'ios') {
		exec('cd ios; xcodebuild clean', (_, stdout) => console.log(_, stdout))
	} else {
		exec('cd android; ./gradlew clean', (_, stdout) => console.log(_, stdout))
	}
}

export default cleanProject