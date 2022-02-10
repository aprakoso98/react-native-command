#!/usr/bin/env node

import './global'
import { spawn } from "child_process"
import { program } from 'commander'
import { connectDeviceCommand } from "../src/connectDevice"
import { incrementVersionCommand } from "../src/incrementVersion"
import { runEmulatorCommand } from "../src/emulator"
import { switchGitCommand } from "../src/switchGit"
import { initCommand } from '../src/init'
import { cleanProjectCommand } from '../src/cleanProject'
import { buildRunCommand } from '../src/buildRun'
import { gradleUpdateCommand } from '../src/gradleUpdate'
import { envManagerCommand } from '../src/envManager'
import { installAppCommand } from '../src/installApp'
import { moveAppCommand } from '../src/moveApp'

const [, , command, ...params] = process.argv

export const theParams = params.reduce((ret, data) => {
	const [key, ...value] = data.split('=')
	ret[key] = value.join('=')
	return ret
}, {})

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

initCommand()
cleanProjectCommand()
runEmulatorCommand()
switchGitCommand()
buildRunCommand()
gradleUpdateCommand()
connectDeviceCommand()
envManagerCommand()
incrementVersionCommand()
installAppCommand()
moveAppCommand()
program.parse()