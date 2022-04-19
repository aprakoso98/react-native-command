import { exec } from "child_process";
import { Option, program } from "commander";
import inquirer from "inquirer";

type Device = MyObject<"ip" | "dev" | "proto" | "scope" | "src">;
function getDeviceLists(): Promise<Device[] | undefined> {
  return new Promise((resolve) => {
    exec("adb shell ip route", (err, stdout) => {
      if (err) {
        console.error("error: No devices/emulators found");
      } else {
        const devices = stdout
          .split(/\n/g)
          .map((d) => {
            let key = "ip";
            const device = d.split(" ").reduce((ret, s, i) => {
              if (i % 2 === 1) key = s; // @ts-ignore
              else ret[key] = s;
              return ret;
            }, {} as Device);
            if (device.src) return device;
            else return {} as Device;
          })
          .filter((d) => d?.src);
        resolve(devices);
      }
    });
  });
}

async function connectDevice({ target }: MyObject<"target">) {
  const devices = (await getDeviceLists()) ?? [];

  if (devices?.length > 0) {
    const selectedTarget =
      devices.length > 1
        ? (
            await inquirer.prompt<{ selectedDevice: string }>([
              {
                type: "list",
                name: "selectedDevice",
                message: "Select device you want to connect",
                choices: devices.map((e) => e.dev),
              },
            ])
          ).selectedDevice
        : devices[0].dev;
    const selectedDevice = devices.find((a) => a?.dev === selectedTarget);

    exec(
      `adb disconnect; adb tcpip 5555; adb connect ${selectedDevice?.src}:5555`,
      (err, msg) => {
        if (err) console.error(err);
        else console.log(msg);
      }
    );
  } else console.error("error: No devices/emulators found");
}

export const connectDeviceCommand = () =>
  program
    .command("connect")
    .alias("c")
    .description("Connect your physical device using adb wireless")
    .action(connectDevice)
    .addOption(new Option("-t, --target <target>", "target").default("wlan0"));
