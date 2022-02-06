declare global {
	type Platform = 'android' | 'ios'
	type ReleaseType = 'dev' | 'prod'
	type BuildType = 'assemble' | 'bundle'
	type Commands = 'clean' | 'connect' | 'env' | 'move'
		| 'install' | 'gradle-update' | 'increment-version'
		| 'build' | 'run' | 'init' | 'emu' | 'git-switch' | 'explore'
	type MyObject<K extends string = string, V = string> = Record<K, V>
	function prettyConsole(...objects: any[]): void
}

export { }