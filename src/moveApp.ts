import moment from "moment"
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
		filename = _filename ?? `${projectName}-${moment().format('YYYY-MM-DD-HH-mm-ss')}.apk`
	}
	filename = `${additional}${filename}`

	const command = `cp "${pathFile}" "./${outputFolder}/${filename}"`
	exec(command, (err) => {
		if (err) { console.error(err); return }
		console.log(`${filename} copied`)
	})
}

export const moveAppCommand = () => program
	.command('move')
	.alias('mv')
	.description('Move apk to /outputs folder')
	.action(moveApp)
	.addArgument(new Argument('[string]', 'Move aab file').choices(['aab']))
	.addOption(new Option('-s, --source <source>', 'Source apk you want to move'))
	.addOption(new Option('-f, --filename <filename>', 'Filename of moved apk'))
	.addOption(new Option('-a, --additional <string>', 'Additional filename will be added to first character. e.g. "-a SG-" -> "SG-{filename}"').default(''))