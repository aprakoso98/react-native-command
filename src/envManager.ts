import { theParams } from "../bin"
import fs from 'fs'

function envManager() {
	type Params = '--env' | '-f'
	const {
		'--env': _env, '-f': __env = `dev`
	} = theParams as MyObject<Params>
	const env = _env ?? __env
	const envFile = require(`./envs/${env}.json`)
	fs.writeFileSync("src/env.json", JSON.stringify(envFile.app, undefined, 2))
}

export default envManager