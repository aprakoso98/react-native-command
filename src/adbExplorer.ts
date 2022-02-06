import fs from 'fs'
import { prompt, Separator } from 'inquirer'
import { execSync } from "child_process"

import { theParams } from '../bin'

type Params = {
	root?: string
	androidRoot?: string
}

function adbExplorer() {
	const { androidRoot = '/storage/emulated/0', root = '~' } = theParams as Params
	explore(root, androidRoot)
}

function showCurrentFiles(root: string, androidRoot: string) {
	const rootFiles = execSync(`ls ${root}`).toString().split('\n').filter(e => e.length > 0)
	const androidRootFiles = execSync(`adb shell ls ${androidRoot}`).toString().split('\n').filter(e => e.length > 0)
	const file = rootFiles.length > androidRootFiles.length ? rootFiles : androidRootFiles
	let current = []
	for (let i = 0; i < file.length; i++) {
		if (!current[i]) current[i] = {}
		current[i][root] = rootFiles[i]
		current[i][androidRoot] = androidRootFiles[i]
	}
	console.table(current)
	return [rootFiles, androidRootFiles]
}

async function explore(root: string, androidRoot: string) {
	let index = 0
	const [rootFiles, androidRootFiles] = showCurrentFiles(root, androidRoot)
	const choices = [new Separator('Use this folder?'), '-- Yes --', new Separator('--- Root files ---'), ...rootFiles, new Separator('--- Android root files ---'), ...androidRootFiles]
		.map((choice) => {
			if (choice instanceof Separator || choice.includes('-- Yes --')) return choice
			index++
			return `${index})	${choice}`
		})
	const { selected } = await prompt([{
		type: "list",
		name: "selected",
		message: "Select folder",
		choices
	}])
	const regex = new RegExp(/^\d+\)\t/)
	const [selectedIndex, folder] = [selected.match(regex)?.[0]?.replace(/[^\d]/g, ''), selected.replace(regex, '') as string]
	const nextFolder = `${selectedIndex > rootFiles.length ? androidRoot : root}/${folder}`
	return { index: selectedIndex - 1, nextFolder, folder }
}

export default adbExplorer