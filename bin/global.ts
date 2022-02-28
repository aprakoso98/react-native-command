/// <reference path="global.d.ts" />

export const _TERMINAL_COLORS = {
	_Reset: "\x1b[0m",
	Bright: "\x1b[1m",
	Dim: "\x1b[2m",
	Underscore: "\x1b[4m",
	Blink: "\x1b[5m",
	Reverse: "\x1b[7m",
	Hidden: "\x1b[8m",

	FgBlack: "\x1b[30m",
	FgRed: "\x1b[31m",
	FgGreen: "\x1b[32m",
	FgYellow: "\x1b[33m",
	FgBlue: "\x1b[34m",
	FgMagenta: "\x1b[35m",
	FgCyan: "\x1b[36m",
	FgWhite: "\x1b[37m",

	BgBlack: "\x1b[40m",
	BgRed: "\x1b[41m",
	BgGreen: "\x1b[42m",
	BgYellow: "\x1b[43m",
	BgBlue: "\x1b[44m",
	BgMagenta: "\x1b[45m",
	BgCyan: "\x1b[46m",
	BgWhite: "\x1b[47m",
}

export const _COLORS = {
	black: "#000000",
	borderBg: "#cdd3e0",
	danger: "#e60f0f",
	pink: "#e831ae",
	dangerSoft: "#fbdbe7",
	greyFont: "#959595",
	greySoft: "#8b8b8b",
	info: "#288cf7",
	primary: "#354BC5",
	lightBlue: "#00C6FF",
	purple: "#904bb7",
	purpleSoft: "#ebcbfd",
	secondary: "#808080",
	success: "#55c09b",
	successHighlight: "#03DAC6",
	successSoft: "#d6f6eb",
	text: "#8b8b8b",
	warning: "#f28c71",
	white: "#ffffff"
}

globalThis.TERMINAL_COLORS = _TERMINAL_COLORS
globalThis.COLORS = _COLORS

globalThis.colorize = function (color) {
	const selectedColor = _TERMINAL_COLORS[color ?? 'FgWhite']
	return `${selectedColor}%s${_TERMINAL_COLORS._Reset}`
}

globalThis.prettyConsole = function (...objects) {
	objects.map(d => console.log(JSON.stringify(d, null, 4)));
}

globalThis.uuid = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & (0x3 | 0x8))
    return v.toString(16)
  })
}