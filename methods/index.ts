import { Option } from "commander"
import { spawn } from "child_process"

export const ROOT_PATH = process.env.PWD
export const THE_COMMAND = 'helper'

export function thread(command: string): Promise<true | Error> {
	return new Promise(resolve => {
		console.log(colorize('BgGreen'), command)
		const execCommand = spawn(command, [], { shell: true, stdio: 'inherit' })
		execCommand.on('error', resolve)
		execCommand.on('close', () => resolve(true))
	})
}

export const releaseType = new Option('-t, --type <type>', 'Release type').choices(['dev', 'prod']).default('dev')
export const androidBuildTypeOption = new Option('-b, --build-type <build-type>', 'Android build type').choices(['assemble', 'bundle']).default('assemble')
export const platformTarget = new Option('-p, --platform <platform>', 'Platform target').choices(['android', 'ios']).default('android')
