#!/usr/bin/env node
const { program } = require("commander");
const chalk = require("chalk");
const inquirer = require("inquirer");
const ora = require("ora");
const figlet = require("figlet");
const fs = require("fs-extra");
const path = require("path");
const gitClone = require("git-clone");
const { read } = require("fs");

const gieResponse = {
  vue: "https://gitee.com/iamkun/dayjs.git",
  react: "https://gitee.com/iamkun/dayjs.git",
  "react-ts": "https://gitee.com/iamkun/dayjs.git",
  "vue-ts": "https://gitee.com/iamkun/dayjs.git",
};

// 首行提示
program.name("modify-cli").usage("<command> [options]");
// 设置版本号
program.version(`v${require("../package.json").version}`);
// 监听 --help 执行
program.on("--help", () => {
  console.log(
    `\r\nRun ${chalk.cyan(
      "modify-cli <command> --help"
    )} for detailed usage of given command\r\n`
  );
});
// 添加命令
program
  .command("create <project-name>")
  .description("create a new project")
  .action(async (name) => {
    // 判断是否存在
    const targetPath = path.join(process.cwd(), name);
    const isExist = fs.existsSync(targetPath);
    if (isExist) {
      const answers = await inquirer.prompt([
        {
          type: "confirm",
          name: "overwrite",
          message: "当前文件夹已存在，是否覆盖",
          default: false,
        },
      ]);
      if (answers.overwrite) {
        // 覆盖（先做删除）再做拉取
        fs.removeSync(targetPath);
      } else {
        console.log(chalk.red.underline("请更换一个项目名称，再重新创建"));
        return;
      }
    }

    inquirer
      .prompt([
        {
          type: "list",
          name: "template",
          message: "请选择技术框架",
          default: "vue",
          choices: ["vue", "react"],
        },
        {
          type: "confirm",
          name: "ts",
          message: "是否使用 typescript",
          default: true,
        },
      ])
      .then((answers) => {
        // 通过选择的结果，拉取对应的模板
        const { template, ts } = answers;
        const key = ts ? `${template}-ts` : template;
        const gitUrl = gieResponse[key];
        const spinner = ora(`${name} Code Loading...`).start();
        gitClone(gitUrl, name, { checkout: "master" }, (err) => {
          if (err) {
            console.log(chalk.red(err));
            spinner.fail(`${name} 项目创建失败！`);
          } else {
            spinner.succeed(`${name} 项目创建成功！`);
            // 把 .git 目录删除，把 .github 目录删除
            fs.removeSync(path.join(targetPath, ".git"));
            fs.removeSync(path.join(targetPath, ".github"));
            console.log(chalk.green(`\r\n  cd ${name}`));
            console.log(chalk.green("  npm install"));
            console.log(chalk.green("  npm run dev"));

            figlet("Modify-Cli!", function (err, data) {
              if (err) {
                console.dir(err);
                return;
              }
              console.log(data);
            });
          }
        });
      });
  });
program.parse(process.argv);
