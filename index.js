// const User=require('../models/User.js');
// const SocialNetwork=require('../models/SocialNetwork.js')

const { Command } = require('commander');

const inquirer = require('inquirer');
const chalk = require('chalk');

const program = new Command();

class User {
  constructor(name, email, password) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.follows = new Set();
  }

}
// module.exports=User;



class SocialNetwork {
  constructor() {
    this.users = new Set();
  }

  signup(name, email, password) {
    return Authentication.signup(name, email, password, this.users);
  }

  login(email, password) {
    return Authentication.login(email, password, this.users);
  }
}
class Authentication {
  static login(email, password, users) {
    for (const user of users) {
      if (user.email === email && user.password === password) {
        return user;
      }
    }
    return null;
  }

  static signup(name, email, password, users) {
    const newUser = new User(name, email, password);
    users.add(newUser);
    return newUser;
  }
}

program
  .name('gameberry-newsfeed')
  .description('CLI to a demo newsfeed app')
  .version('1.0.0');



program
  .command('signup')
  .description('Create a new user account')
  .action(() => {
    inquirer.prompt([
      { type: 'input', name: 'name', message: 'Enter your name:' },
      { type: 'input', name: 'email', message: 'Enter your email:' },
      { type: 'password', name: 'password', message: 'Enter your password:' },
    ])
      .then((answers) => {
        const { name, email, password } = answers;
        const user = new User(name, email, password);
        SocialNetwork.signup(user.name, user.email, user.password);
        console.log(chalk.green('User created successfully!'));
      })
      .catch((error) => {
        console.error(chalk.red(error));
      });
  });
program
  .command('login')
  .description('Log in to your account')
  .action(() => {
    inquirer.prompt([
      { type: 'input', name: 'email', message: 'Enter your email:' },
      { type: 'password', name: 'password', message: 'Enter your password:' },
    ])
      .then((answers) => {
        const { email, password } = answers;
        const user = new SocialNetwork.login(email, password);
        console.log(chalk.green(`Welcome back, ${user.name}!`));
      })
      .catch((error) => {
        console.error(chalk.red(error));
      });
  });



program
  .command('*')
  .description('Invalid command')
  .action((cmd) => {
    console.error('Invalid command: %s\nSee --help for a list of available commands.', cmd);
  });

program.parse(process.argv);
// console.log('User:', User);
// console.log('SocialNetwork:', SocialNetwork);