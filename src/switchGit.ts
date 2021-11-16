import * as inquirer from "inquirer"
import { thread } from '../bin';

type E = Record<'name' | 'email', string>

const USERS: Record<string, E> = {
	aprakoso98: {
		name: 'aprakoso98',
		email: 'adhyt.scott@gmail.com'
	},
	flashCoffee: {
		name: 'bambang.ap',
		email: 'bambang.ap@flash-coffee.com'
	}
}

async function switchGit() {
	const listUsers = Object.keys(USERS)
	const { selectedUser } = await inquirer.prompt([{
		type: "list",
		name: "selectedUser",
		message: "Select user you want to replace",
		choices: listUsers
	}])
	const { email, name }: E = USERS[selectedUser]
	thread(`git config --global user.name "${name}"; git config --global user.email "${email}"; git config --list`)
}

export default switchGit