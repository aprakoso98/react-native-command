import { exec } from "child_process"
import * as moment from "moment"
import { theParams } from "../bin"
const ANDROID_PATH = "android"
const apkPath = `./${ANDROID_PATH}/app/build/outputs/apk/release/app-release.apk`
const aabPath = `./${ANDROID_PATH}/app/build/outputs/bundle/release/app.aab`
const outputFolder = "outputs"

function moveApp() {
	const { name: projectName }: { name: string } = require(`${process.env.PWD}/package.json`)
	type Params = '--filename' | '-f' | 'aab'
	const {
		'--filename': _filename, '-f': __filename,
	} = theParams as MyObject<Params>
	let filename = `${projectName}-Bundle-${moment().format('YYYY-MM-DD-HH-mm-ss')}.aab`
	let pathFile = apkPath
	if ('aab' in theParams) {
		pathFile = aabPath
	} else {
		filename = _filename ?? __filename ?? `${projectName}-${moment().format('YYYY-MM-DD-HH-mm-ss')}.apk`
	}
	exec(`cp "${pathFile}" "./${outputFolder}/${filename}"`, (err) => {
		if (err) { console.error(err); return }
		console.log(`${filename} copied`)
	})
}

export default moveApp