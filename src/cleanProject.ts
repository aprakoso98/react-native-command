import { theParams, thread } from '../bin'

function cleanProject() {
	const {
		'--platform': platform, '-p': _platform = 'android'
	} = theParams as MyObject<'--platform' | '-p', Platform>
	if ((platform ?? _platform) === 'ios') {
		thread('cd ios; xcodebuild clean')
	} else {
		thread('cd android; ./gradlew clean')
	}
}

export default cleanProject