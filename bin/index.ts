#!/usr/bin/env node

import './global'
import { program } from 'commander'

import { connectDeviceCommand } from "../src/connectDevice"
import { incrementVersionCommand } from "../src/incrementVersion"
import { runEmulatorCommand } from "../src/emulator"
import { switchGitCommand } from "../src/switchGit"
import { initCommand } from '../src/init'
import { cleanProjectCommand } from '../src/cleanProject'
import { buildRunCommand } from '../src/buildRun'
import { gradleUpdateCommand } from '../src/gradleUpdate'
import { installAppCommand } from '../src/installApp'
import { moveAppCommand } from '../src/moveApp'
import { rootGitCommand } from '../src/rootGit'

initCommand()
runEmulatorCommand()
installAppCommand()
moveAppCommand()
cleanProjectCommand()
rootGitCommand()
switchGitCommand()
connectDeviceCommand()
buildRunCommand()
gradleUpdateCommand()
incrementVersionCommand()

program.parse(process.argv)