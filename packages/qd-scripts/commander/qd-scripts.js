import chalk from 'chalk'
import inquirer from 'inquirer'
import figlet from 'figlet'
import ora from 'ora'

const program = require('commander')
const fs = require('fs')
const path = require('path')
const moment = require('moment')

class CommandSet {
  constructor(){
    this.baseDir = process.cwd().replace(/\\/g,'/');
    this.commands = ["init"];
    this.program = program;
    this.config = {};
  }

  async run(){
    this.options();
    this.command();
    this.parse();
  }

  options(){
    this.program.on('--help', this.showHelpInfo);
    this.program.version('0.0.1', '-v, --version');
  }
  showHelpInfo(){
    console.log('react工程脚手架')
    console.log()
    console.log('     Examples: qd init myApp(省略时，则为当前所在目录文件夹名称)');
    console.log('     执行qd -h查看更多')
  }
  command(){
    const self = this;
    this.program.command('init [env]')
      .option('-y --yes', '使用默认值')
      .description('初始化项目命令')
      .action( (env, options)=> {
        if(!env){
          const AppName = this.baseDir.split('/')[(this.baseDir.split('/').length-1)]
          console.log(AppName)
          inquirer.prompt([{
            type: 'confirm',
            name: 'appName',
            message: `项目名称${AppName}`,
          }]).then(boilerplateAnswer => {
            if(boilerplateAnswer.appName){
              this.config.appName = AppName
              this.config.isDefault = options.yes;
              this.generateTemplate()
            }else{
              inquirer.prompt([{
                type: 'input',
                name: 'appName',
                default:AppName,
                message: `请输入项目名称`,
              }]).then(boilerplateAnswer => {
                this.config.defineAppName = true;
                this.config.appName = boilerplateAnswer.appName;
                this.config.isDefault = options.yes;
                this.generateTemplate()
              })
            }
          })
        } else {
          console.log(env)
          this.config.appName = env;
          this.config.defineAppName = true;
          this.config.isDefault = options.yes;
          this.generateTemplate()
        }
      })
      this.program.command('install').action( (env, options)=> {
        if(!env){

        } else {

        }

      })
      // this.program.on('option:verbose', function () {
      //   process.env.VERBOSE = this.verbose;
      // });
      this.program.on('command:*', function () {
        //console.error('Invalid command: %s\nSee --help for a list of available commands.', program.args.join(' '));

      });
      //给所有命令添加操作
      this.program
      .command('*')
      .action(function(env){
        if(!new Set(this.commands).has(env)){
          ora(chalk.red(`${env}命令不存在`)).fail()
          self.showHelpInfo()
        }
      });
  }
  parse(){
    this.program.parse(process.argv)
    if(process.argv.length < 3){
      this.showCli();
      this.showHelpInfo();
    }
  }

  showCli(){
    console.log(
		  chalk.green(
			  figlet.textSync("qd xx")
		));
  }

  checkLanguage(){
    return new Promise( resolve => {
      inquirer.prompt([{
        type: 'list',
        name: 'language',
        default: 'js',
        message: `请选择语言`,
        choices:[
          { value: 'js', name: 'js' },
          { value: 'ts', name: 'ts' }
        ],
      }]).then(boilerplateAnswer => {
        resolve(boilerplateAnswer.language)
      })
    })
  }

  async generateTemplate(){
    const self = this;
    const language = await this.checkLanguage()
    console.log('language', language)
    this.templatePath = path.join(__dirname, `../../packages/qd-scripts/lib/template/${language}`)
    try {
      //const spinner = ora(chalk.green('正在生成项目配置文件')).start();
      console.log()
      const packageJson = fs.readFileSync(path.resolve(__dirname + `../../qd-scripts/lib/template/${language}/package.json`), {flag: 'r+', encoding: 'utf8'})
      // packageJson.replace("appname", self.config.appName)
      const newPackageJson = JSON.parse(packageJson);
      console.log(self.config.appName)
      newPackageJson.name = self.config.appName;
      if(self.config.defineAppName){
        await self.mkdir(`${self.baseDir}/${self.config.appName}`)
        fs.writeFileSync(`${self.baseDir}/${self.config.appName}/package.json`, JSON.stringify(newPackageJson, null, 2));
      }else{
        fs.writeFileSync(`${self.baseDir}/package.json`, JSON.stringify(newPackageJson, null, 2));
      }
      await this.readAndWriteDir(path.resolve(__dirname + `../../qd-scripts/lib/template/${language}`))
      //spinner.succeed(chalk.green('项目创建成功'));

    } catch(err) {
      console.log(chalk.red(err))
    }
  }

  async readAndWriteDir(url){
    const self = this;
    const stats = await this.getStat(url);
    if(stats.isFile()){
      // package.json跳过
      if(path.parse(url).base === 'package.json'){
        return
      }
      try {
        let newUrl;
        if(self.config.defineAppName){
          newUrl = url.replace(self.templatePath,`${self.baseDir}/${self.config.appName}`)
        }else{
          newUrl = url.replace(self.templatePath,self.baseDir)
        }
        const mkdirStatus = await self.dirExists(path.parse(newUrl).dir)//判断是否存在文件夹，不存在就创建, 同一层级文件夹只在第一次创建
        if(!mkdirStatus){
          await self.dirExists(path.parse(newUrl).dir)//判断是否存在文件夹，不存在就创建
        }
        const writeStatus =  fs.writeFileSync(newUrl,fs.readFileSync(url,{flag: 'r+', encoding: 'utf8'}))
        console.log(chalk.green(`${moment().format('YY-MM-DD HH:MM:SS')}  ${newUrl}  创建完成`));
        return writeStatus;
      } catch(err) {
        console.log(chalk.red(err))
      }
    }else if(stats.isDirectory()){
      const files = fs.readdirSync(url);
      if(files.length > 0 ){
        await files.forEach(async function(file, index){
          try {
            await self.readAndWriteDir(`${url}/${file}`)
          } catch(err) {
            console.log(chalk.red(err))
          }
        })
      } else {
        return null;
      }
    }
  }
/**
 * 读取路径信息
 * @param {string} path 路径
 */
getStat(path){
  return new Promise((resolve, reject) => {
    fs.stat(path, (err, stats) => {
      if(err){
        resolve(false);
      }else{
        resolve(stats);
      }
    })
  })
}

/**
 * 创建路径
 * @param {string} dir 路径
 */
mkdir(dir){
  return new Promise((resolve, reject) => {
    fs.mkdir(dir, err => {
      if(err){
        resolve(false);
      }else{
        resolve(true);
      }
    })
  })
}

/**
* 路径是否存在，不存在则创建
* @param {string} dir 路径
*/
async dirExists(dir){
  let isExists = await this.getStat(dir);
  //如果该路径且不是文件，返回true
  if(isExists && isExists.isDirectory()){
    return true;
  }else if(isExists){     //如果该路径存在但是文件，返回false
    return false;
  }
  //如果该路径不存在
  let tempDir = path.parse(dir).dir;      //拿到上级路径
  //递归判断，如果上级目录也不存在，则会代码会在此处继续循环执行，直到目录存在
  let status = await this.dirExists(tempDir);
  let mkdirStatus;
  if(status){
      mkdirStatus = await this.mkdir(dir);
  }
  return mkdirStatus;
}
  //后期优化
  // generateStructure* (){
  //   yield fs.mkdirSync(`${this.baseDir}/code`)
  // }
}
export default CommandSet;

