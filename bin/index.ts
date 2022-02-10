#!/usr/bin/env node

import './global'
import { spawn } from "child_process"
// import { program } from 'commander'
import cleanProject from "../src/cleanProject"
import connectDevice from "../src/connectDevice"
import envManager from "../src/envManager"
import gradleUpdate from "../src/gradleUpdate"
import incrementVersion from "../src/incrementVersion"
import installApp from "../src/installApp"
import moveApp from "../src/moveApp"
import buildRun from '../src/buildRun';
import init from "../src/init"
import runEmulator from "../src/emulator"
import switchGit from "../src/switchGit"
import adbExplorer from "../src/adbExplorer"

const [, , _command, ...params] = process.argv
const command = _command as Commands

const defaultCommandLog = `No command '${command ?? ''}' found

Available commands: 

- init: generate env folder structure
- emu: run avd with select option
- git-switch: switch git user with select option
- clean
	--platform, -p		: ios | android
- connect
	--target, -t		: i.e. wlan0
- env
- move
	--filename, -f		: i.e. new-app.apk
- install
	not maintained
- gradle-update
	--type, -t		: dev | prod
- increment-version
	--type, -t		: dev | prod
	--platform, -p		: ios | android
	[configkey]	: x | + | 0-9
		e.g. VERSION_NAME: x.x.+`

export const theParams = params.reduce((ret, data) => {
	const [key, ...value] = data.split('=')
	ret[key] = value.join('=')
	return ret
}, {})

export const ROOT_PATH = process.env.PWD
export const THE_COMMAND = 'r-native'

export function thread(command: string): Promise<true | Error> {
	return new Promise(resolve => {
		console.log(colorize('BgGreen'), command)
		const execCommand = spawn(command, [], { shell: true, stdio: 'inherit' })
		execCommand.on('error', resolve)
		execCommand.on('close', () => resolve(true))
	})
}

function execCommand() {
	return new Promise<string | void>(resolve => {
		if (command === 'clean') cleanProject()
		else if (command === 'connect') connectDevice()
		else if (command === 'emu') runEmulator()
		else if (command === 'env') envManager()
		else if (command === 'git-switch') switchGit()
		else if (command === 'move') moveApp()
		else if (command === 'install') installApp()
		else if (command === 'gradle-update') gradleUpdate()
		else if (command === 'increment-version') incrementVersion()
		else if (command === 'build') buildRun(true)
		else if (command === 'run') buildRun()
		else if (command === 'init') init()
		else if (command === 'explore') adbExplorer()
		else resolve(defaultCommandLog)
	})
}

execCommand().then(response => {
	if (typeof response === 'string') {
		console.error(response)
	}
})

// program
// 	.command('clean')
// 	.action(cleanProject)
// 	.description('List all the TODO tasks')

// program
// 	.command('connect')
// 	.action(connectDevice)
// 	.description('List all the TODO tasks')

// program
// 	.command('emu')
// 	.action(runEmulator)
// 	.description('List all the TODO tasks')

// program
// 	.command('env')
// 	.action(envManager)
// 	.description('List all the TODO tasks')

// program
// 	.command('git-switch')
// 	.action(switchGit)
// 	.description('List all the TODO tasks')

// program
// 	.command('move')
// 	.action(moveApp)
// 	.description('List all the TODO tasks')

// program
// 	.command('install')
// 	.action(installApp)
// 	.description('List all the TODO tasks')

// program
// 	.command('gradle-update')
// 	.action(gradleUpdate)
// 	.description('List all the TODO tasks')

// program
// 	.command('increment-version')
// 	.action(incrementVersion)
// 	.description('List all the TODO tasks')

// program
// 	.command('build')
// 	.action(() => buildRun(true))
// 	.description('List all the TODO tasks')

// program
// 	.command('run')
// 	.action(buildRun)
// 	.description('List all the TODO tasks')

// program
// 	.command('init')
// 	.action(init)
// 	.description('List all the TODO tasks')

// program.parse()