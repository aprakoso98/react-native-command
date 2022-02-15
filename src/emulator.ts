import * as inquirer from "inquirer"
import { execSync } from "child_process"
import { program } from "commander";

import { thread } from '../bin';

async function runEmulator() {
	const listAvds = execSync('emulator -list-avds')
		.toString()
		.split('\n')
		.filter(avd => avd !== '')

	const selectedAvd = listAvds.length > 1
		? (await inquirer.prompt<{ selectedAvd: string }>([{
			type: "list",
			name: "selectedAvd",
			message: "Select avd you want to run",
			choices: listAvds
		}])).selectedAvd
		: listAvds[0]

	thread(`cd $ANDROID_HOME/emulator; ./emulator @${selectedAvd}`)
}

export const runEmulatorCommand = () => program
	.command('emu')
	.description('Run emulator with selected device')
	.action(runEmulator)