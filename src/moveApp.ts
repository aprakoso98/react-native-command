import fs from "fs";
import moment from "moment";
import { exec } from "child_process";
import { Argument, Option, program } from "commander";
import inquirer from "inquirer";

const ANDROID_PATH = "android";
const outputFolder = "outputs";

async function moveApp(
  args: "aab",
  options: MyObject<"source" | "filename" | "additional"> & { list?: boolean }
) {
  if (!fs.existsSync(outputFolder)) fs.mkdirSync(outputFolder);

  const isAab = args === "aab";
  const { list, additional, source, filename: _filename } = options;
  const {
    name: projectName,
  }: { name: string } = require(`${process.env.PWD}/package.json`);

  const apkPath = `./${ANDROID_PATH}/app/build/outputs/apk${
    source || "/release/app-release.apk"
  }`;
  const aabPath = `./${ANDROID_PATH}/app/build/outputs/bundle${
    source || "/release/app.aab"
  }`;

  let filename = `${projectName}-Bundle-${moment().format(
    "YYYY-MM-DD-HH-mm-ss"
  )}.aab`;
  let pathFile = apkPath;
  if (isAab) {
    pathFile = aabPath;
  } else {
    filename =
      _filename ||
      `${projectName}-${moment().format("YYYY-MM-DD-HH-mm-ss")}.apk`;
  }
  filename = `${additional}${filename}`;

  const fileChoossed = await getListApk(isAab);
  if (list && fileChoossed) {
    pathFile = fileChoossed;
  }

  const command = `cp "${pathFile}" "./${outputFolder}/${filename}"`;

  exec(command, (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(`${filename} copied`);
  });
}

export const moveAppCommand = () =>
  program
    .command("move")
    .alias("mv")
    .description("Move apk to /outputs folder")
    .action(moveApp)
    .addArgument(new Argument("[string]", "Move aab file").choices(["aab"]))
    .addOption(
      new Option("-l, --list", "Show list apk, and select to move").default(
        false
      )
    )
    .addOption(
      new Option("-s, --source <source>", "Source apk you want to move")
    )
    .addOption(new Option("-f, --filename <filename>", "Filename of moved apk"))
    .addOption(
      new Option(
        "-a, --additional <string>",
        'Additional filename will be added to first character. e.g. "-a SG-" -> "SG-{filename}"'
      ).default("")
    );

function getListApk(isAab: boolean) {
  return new Promise<string | false>((resolve) => {
    exec(
      `find ./android -iname '*.${isAab ? "aab" : "apk"}'`,
      async (err, listFile) => {
        if (err) resolve(false);
        const choices = listFile.split("\n").filter((l) => l !== "");
        const { file } = await inquirer.prompt([
          {
            type: "list",
            name: "file",
            message: "Select file you want to move",
            choices,
          },
        ]);

        resolve(file);
      }
    );
  });
}
