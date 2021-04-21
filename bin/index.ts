#!/usr/bin/env node
/// <reference path="../global.d.ts" />
import { exec } from "child_process"
import cleanProject from "../src/cleanProject"
import connectDevice from "../src/connectDevice"
import envManager from "../src/envManager"
import gradleUpdate from "../src/gradleUpdate"
import incrementVersion from "../src/incrementVersion"
import installApp from "../src/installApp"
import moveApp from "../src/moveApp"

const [, , _command, ...params] = process.argv
const command = _command as Commands

const defaultCommandLog = `No command '${command ?? ''}' found

Available commands: 

clean
	--platform, -p		: ios | android
connect
	--target, -t		: i.e. wlan0
env
move
	--filename, -f		: i.e. new-app.apk
install
	not maintained
gradle-update
	--type, -t		: dev | prod
increment-version
	--type, -t		: dev | prod
	--version, -v		: x.x.+ (x: will not increment, + will increment)
	--version-code, -vc	: 1 (versionCode will add 1 from previous)`

let key: string
export const theParams = params.reduce((ret, data, i) => {
	if (i % 2 === 0) key = data
	else ret[key] = data
	return ret
}, {})

export const ROOT_PATH = process.env.PWD

export function prettyConsole(...objects: any[]) {
	objects.map(d => console.log(JSON.stringify(d, null, 4)));
}


function execCommand() {
	return new Promise<string | void>(resolve => {
		if (command === 'clean') {
			cleanProject()
		} else if (command === 'connect') {
			connectDevice()
		} else if (command === 'env') {
			envManager()
		} else if (command === 'move') {
			moveApp()
		} else if (command === 'install') {
			installApp()
		} else if (command === 'gradle-update') {
			gradleUpdate()
		} else if (command === 'increment-version') {
			incrementVersion()
		} else {
			resolve(defaultCommandLog)
		}
	})
}

execCommand().then(response => {
	if (typeof response === 'string') {
		console.error(response)
	}
})