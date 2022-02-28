import { Argument, Option, program } from 'commander';
import { exec } from 'child_process';

import { thread } from '../methods';

const root = `~`
const rootGitFolder = `${root}/.git`
const movedRootGitFolder = `${root}/root-git`

async function rootGit({ rename }: { rename: boolean }) {
	exec(`ls ${rootGitFolder}`, (err) => {
		if (rename) {
			if (err) return thread(`mv ${movedRootGitFolder} ${rootGitFolder}; code ${root}`)
			return thread(`mv ${rootGitFolder} ${movedRootGitFolder}`)
		}
		console.log(colorize(err ? 'BgRed' : 'BgGreen'), ` ${rootGitFolder} ${err ? 'not found' : 'has found'} `)
	})
}

export const rootGitCommand = () => program
	.command('root-git')
	.alias('rg')
	.addOption(new Option('-r, --rename', 'Enable/Disable git in root folder').default(false))
	.description('Switch root git folder')
	.action(rootGit)