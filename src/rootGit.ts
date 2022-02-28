import { Argument, Option, program } from 'commander';
import { exec } from 'child_process';

import { thread } from '../methods';

const root = `~`
const rootGitFolder = `${root}/.git`
const movedRootGitFolder = `${root}/root-git`
const gitignore = `${root}/.gitignore`
const movedGitignore = `${root}/root-gitignore`

function rootGit({ rename }: { rename: boolean }) {
	exec(`ls ${rootGitFolder}`, async (err) => {
		if (rename) {
			if (err) {
				await thread(`mv ${movedRootGitFolder} ${rootGitFolder}; code ${root}`)
				await thread(`mv ${movedGitignore} ${gitignore}`)
				return
			}
			await thread(`mv ${rootGitFolder} ${movedRootGitFolder}`)
			await thread(`mv ${gitignore} ${movedGitignore}`)
			return
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