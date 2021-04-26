import { exec, execSync } from "child_process"
import { theParams } from "../bin"

type Device = MyObject<'ip' | 'dev' | 'proto' | 'scope' | 'src'>
export function getDeviceLists(): Promise<Device[] | undefined> {
	return new Promise(resolve => {
		exec('adb shell ip route', (err, stdout) => {
			if (err) {
				console.error('error: No devices/emulators found')
			} else {
				const devices = stdout
					.split(/\n/g)
					.map(d => {
						let key = 'ip'
						const device = d.split(' ').reduce((ret, s, i) => {
							if (i % 2 === 1) key = s
							else ret[key] = s
							return ret
						}, {} as Device)
						if (device.src) return device
						else return {} as Device
					})
					.filter(d => d?.src)
				resolve(devices)
			}
		})
	})
}

async function connectDevice() {
	type Params = '--target' | '-t'
	const {
		'--target': _target, '-t': __target = 'wlan0'
	} = theParams as MyObject<Params>
	const target = _target ?? __target
	const devices = await getDeviceLists()
	if (devices?.length > 0) {
		const selectedDevice = devices.filter((a) => a?.dev === target)
		if (selectedDevice.length > 0) {
			exec(
				`adb disconnect; adb tcpip 5555; adb connect ${selectedDevice[0].src}:5555`,
				(err, msg) => {
					if (err) console.error(err)
					else console.log(msg)
				}
			)
		} else console.error('error: No devices/emulators found')
	}
}

export default connectDevice