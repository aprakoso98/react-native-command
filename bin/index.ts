#!/usr/bin/env node

import './global'
import inquirer from 'inquirer'
import { program } from 'commander'

import { connectDeviceCommand } from "../src/connectDevice"
import { incrementVersionCommand } from "../src/incrementVersion"
import { runEmulatorCommand } from "../src/emulator"
import { switchGitCommand } from "../src/switchGit"
import { initCommand } from '../src/init'
import { cleanProjectCommand } from '../src/cleanProject'
import { buildRunCommand } from '../src/buildRun'
import { gradleUpdateCommand } from '../src/gradleUpdate'
import { envManagerCommand } from '../src/envManager'
import { installAppCommand } from '../src/installApp'
import { moveAppCommand } from '../src/moveApp'

initCommand()
cleanProjectCommand()
runEmulatorCommand()
switchGitCommand()
buildRunCommand()
gradleUpdateCommand()
connectDeviceCommand()
envManagerCommand()
incrementVersionCommand()
installAppCommand()
moveAppCommand()

program.parse()