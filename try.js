#! /usr/bin/env node

const { program } = require('commander')
const list = require('./list')
const add = require('./add')

program
	.command('list')
	.description('List all the TODO tasks')
	.action(list.list)

program
	.command('add <task>')
	.description('Add a new TODO task')
	.action(add)

program
	.command('mark-done')
	.description('Mark commands done')
	.option('-t, --tasks <tasks...>', 'The tasks to mark done. If not specified, all tasks will be marked done.')
	.action(list.markDone)

program.parse()