import * as fs from 'fs'
import { colorize, ROOT_PATH } from '../bin';

function errHandling(err: NodeJS.ErrnoException) {
	if (err?.message) console.log(colorize('FgRed'), err?.message)
}

async function init() {
	const data = JSON.stringify({ ios: {}, android: {} }, null, 4)
	const flag = 'wx'
	fs.mkdir(`${ROOT_PATH}/envs`, errHandling)
	fs.writeFile(`${ROOT_PATH}/envs/config-dev.json`, data, { flag }, errHandling)
	fs.writeFile(`${ROOT_PATH}/envs/config-prod.json`, data, { flag }, errHandling)
	fs.writeFile(`${ROOT_PATH}/envs/gradle-properties.json`, `{}`, { flag }, errHandling)
}

export default init