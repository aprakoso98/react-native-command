import * as fs from 'fs'
import { program } from 'commander';

import { ROOT_PATH } from '../methods';

function errHandling(err: NodeJS.ErrnoException) {
	if (err?.message) console.log(colorize('FgRed'), err?.message)
}

async function init() {
	const data = JSON.stringify({ ios: {}, android: {} }, null, 4)
	const flag = 'wx'
	fs.mkdirSync(`${ROOT_PATH}/envs`)
	fs.mkdirSync(`${ROOT_PATH}/outputs`)
	fs.writeFileSync(`${ROOT_PATH}/envs/config-dev.json`, data, { flag })
	fs.writeFileSync(`${ROOT_PATH}/envs/config-prod.json`, data, { flag })
	fs.writeFileSync(`${ROOT_PATH}/envs/gradle-properties.json`, `{}`, { flag })
}

export const initCommand = () => program
	.command('init')
	.description('Initialize env files')
	.action(init)