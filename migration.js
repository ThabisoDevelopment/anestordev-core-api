import { program } from 'commander'
import { migrate } from "./src/database/makeMigrations.js";

program.version('1.0.0')
program.description('Command Line Interface for Tables migration')

program
    .command('migrate')
    .alias('M')
    .description('Make tables migrations')
    .action(()=> migrate())



program.parse(process.argv)