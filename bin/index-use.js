#!/usr/bin/env node
const { program } = require("commander");
const chalk = require("chalk");
const inquirer = require("inquirer");
const ora = require("ora");
const figlet = require("figlet");

console.log(chalk.blue.bold.underline.bgWhite("Welcome Use Modify-Cli!"));


figlet("Modify-Cli!", function (err, data) {
  if (err) {
    console.log("Something went wrong...");
    console.dir(err);
    return;
  }
  console.log(data);
});

inquirer
  .prompt([
    {
      type: "input",
      name: "name",
      message: "What is your name?",
      default: "modify-cli",
    },
    {
      type: "confirm",
      name: "confirm",
      message: "Are you sure?",
      default: false,
    },
  ])
  .then((answers) => {
    console.log("answers:", answers);
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  });

const spinner = ora("Loading...").start();

setTimeout(() => {
  spinner.text = "Downloading...";
  spinner.color = "red";
}, 2000);

setTimeout(() => {
  // spinner.succeed("Downloading done!");
  spinner.fail("Loading failed!");
}, 4000);


program.name("modify-cli").usage("<command> [options]");

program
  .option("-d, --debug", "output extra debugging")
  .option("-s, --small", "small pizza size")
  .option("-p, --pizza-type <type>", "flavour of pizza");

program
  .command("clone <source> [destination]")
  .description("clone a repository into a newly created directory")
  .action((source, destination) => {
    // action接收到的参数分别是source和destination
    console.log("clone command called", source, destination);
  });

program.parse(process.argv);

const options = program.opts();

console.log("options:", options);
