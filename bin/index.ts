#!/usr/bin/env node
/// <reference path="../global.d.ts" />
import { spawn } from "child_process"
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

const [, , _command, ...params] = process.argv
const command = _command as Commands


// else if (command === 'connect') connectDevice()
// else if (command === 'emu') runEmulator()
// else if (command === 'env') envManager()
// else if (command === 'git-switch') switchGit()
// else if (command === 'move') moveApp()
// else if (command === 'install') installApp()
// else if (command === 'gradle-update') gradleUpdate()
// else if (command === 'increment-version') incrementVersion()
// else if (command === 'build') buildRun(true)
// else if (command === 'run') buildRun()
// else if (command === 'init') init()

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
const COLORS = {
	_Reset: "\x1b[0m",
	Bright: "\x1b[1m",
	Dim: "\x1b[2m",
	Underscore: "\x1b[4m",
	Blink: "\x1b[5m",
	Reverse: "\x1b[7m",
	Hidden: "\x1b[8m",

	FgBlack: "\x1b[30m",
	FgRed: "\x1b[31m",
	FgGreen: "\x1b[32m",
	FgYellow: "\x1b[33m",
	FgBlue: "\x1b[34m",
	FgMagenta: "\x1b[35m",
	FgCyan: "\x1b[36m",
	FgWhite: "\x1b[37m",

	BgBlack: "\x1b[40m",
	BgRed: "\x1b[41m",
	BgGreen: "\x1b[42m",
	BgYellow: "\x1b[43m",
	BgBlue: "\x1b[44m",
	BgMagenta: "\x1b[45m",
	BgCyan: "\x1b[46m",
	BgWhite: "\x1b[47m",
}

export function colorize(color?: keyof typeof COLORS) {
	const selectedColor = COLORS[color ?? 'FgWhite']
	return `${selectedColor}%s${COLORS._Reset}`
}

export function prettyConsole(...objects: any[]) {
	objects.map(d => console.log(JSON.stringify(d, null, 4)));
}

export function thread(command: string): Promise<true | Error> {
	return new Promise(resolve => {
		console.log(colorize('BgGreen'), command)
		console.log(colorize('FgCyan'), `=== Child process started command \`${command}\` ===`)
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
		else resolve(defaultCommandLog)
	})
}

execCommand().then(response => {
	if (typeof response === 'string') {
		console.error(response)
	}
})