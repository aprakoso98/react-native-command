import * as inquirer from "inquirer"
import { execSync } from "child_process"
import { thread, ROOT_PATH } from '../bin';

const outputFolder = "outputs"

async function installApp() {
	const deviceLists = execSync('adb devices').toString().split('\n')
		.reduce<string[]>((ret, list) => {
			const index = list.indexOf('\t')
			if (index > 0) ret.push(list.slice(0, index))
			return ret
		}, [])
	const fileLists = execSync(`ls ${outputFolder}`).toString()
	const { selectedDevice } = await inquirer.prompt([{
		type: "list",
		name: "selectedDevice",
		message: "Select device you want to set as target install",
		choices: deviceLists
	}])
	const choices = fileLists.split('\n').filter(l => l !== '')
	const { selectedApk } = await inquirer.prompt([{
		type: "list",
		name: "selectedApk",
		message: "Select apk you want to install",
		choices
	}])
	thread(`adb -s ${selectedDevice} install "${ROOT_PATH}/${outputFolder}/${selectedApk}"`)
}

export default installApp