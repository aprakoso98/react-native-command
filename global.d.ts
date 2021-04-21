declare global {
	type Platform = 'android' | 'ios'
	type Commands = 'clean' | 'connect' | 'env' | 'move' | 'install' | 'gradle-update' | 'increment-version'
	type MyObject<K extends string = string, V = string> = Record<K, V>
	function prettyConsole(...objects: any[]): void
}

export { }