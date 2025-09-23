#!/usr/bin/env node
const { program } = require("commander");
const chalk = require("chalk");
const inquirer = require("inquirer");
const ora = require("ora");
const figlet = require("figlet");

figlet("Modify-Cli!", function (err, data) {
  if (err) {
    return;
  }
  console.log(data);
});
