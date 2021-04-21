import inquirer from "inquirer"
import { exec } from "child_process"

const outputFolder = "outputs"

function installApp() {
	exec('cd outputs; ls', async (_, _choices) => {
		const choices = _choices.split('\r\n').filter(l => l !== '')
		const { selectedApk } = await inquirer.prompt([{
			type: "list",
			name: "selectedApk",
			message: "Select apk you want to install",
			choices
		}])
		exec(`adb install "${outputFolder}/${selectedApk}"`, (err, msg) => {
			if (err) console.error(err)
			else console.log(msg)
		})
	})
}

export default installApp