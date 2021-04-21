import { exec } from "child_process"
import * as moment from "moment"
import { theParams } from "../bin"
const ANDROID_PATH = "android"
const apkPath = `./${ANDROID_PATH}/app/build/outputs/apk/release/app-release.apk`
const outputFolder = "outputs"

function moveApp() {
	const { name: projectName }: { name: string } = require(`${process.env.PWD}/package.json`)
	type Params = '--filename' | '-f'
	const {
		'--filename': _filename, '-f': __filename
	} = theParams as MyObject<Params>
	const filename = _filename ?? __filename ?? `${projectName} ${moment().format('YYYY-MM-DD-HH-mm-ss')}.apk`
	exec(`cp "${apkPath}" "./${outputFolder}/${filename}"`, (err) => {
		if (err) { console.error(err); return }
		console.log(`${filename} copied`)
	})
}

export default moveApp