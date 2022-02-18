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