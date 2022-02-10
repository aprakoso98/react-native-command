import * as moment from "moment"
import { exec } from "child_process"
import { Argument, Option, program } from "commander"

const ANDROID_PATH = "android"
const outputFolder = "outputs"

function moveApp(args: 'aab', options: MyObject<'source' | 'filename' | 'additional'>) {
	const isAab = args === 'aab'
	const { additional, source, filename: _filename } = options
	const { name: projectName }: { name: string } = require(`${process.env.PWD}/package.json`)

	const apkPath = `./${ANDROID_PATH}/app/build/outputs/apk${source ?? '/release/app-release.apk'}`
	const aabPath = `./${ANDROID_PATH}/app/build/outputs/bundle${source ?? '/release/app.aab'}`

	let filename = `${projectName}-Bundle-${moment().format('YYYY-MM-DD-HH-mm-ss')}.aab`
	let pathFile = apkPath
	if (isAab) {
		pathFile = aabPath
	} else {
		filename = _filename ?? __filename ?? `${projectName}-${moment().format('YYYY-MM-DD-HH-mm-ss')}.apk`
	}
	filename = `${additional}${filename}`
	exec(`cp "${pathFile}" "./${outputFolder}/${filename}"`, (err) => {
		if (err) { console.error(err); return }
		console.log(`${filename} copied`)
	})
}

export const moveAppCommand = () => program
	.command('move')
	.action(moveApp)
	.addArgument(new Argument('[string]').choices(['aab']))
	.addOption(new Option('-s, --source <source>', 'Platforms'))
	.addOption(new Option('-f, --filename <filename>', 'Platforms'))
	.addOption(new Option('-a, --additional <string>', 'Platforms').default(''))