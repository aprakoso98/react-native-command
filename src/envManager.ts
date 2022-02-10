import fs from 'fs'
import { Option, program } from "commander"

function envManager({ env }: MyObject<'env'>) {
	const envFile = require(`./envs/${env}.json`)
	fs.writeFileSync("src/env.json", JSON.stringify(envFile.app, undefined, 2))
}

export const envManagerCommand = () => program
	.command('env')
	.action(envManager)
	.addOption(new Option('-e, --env <env>', 'env').default('dev'))