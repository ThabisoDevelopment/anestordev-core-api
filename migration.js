const { program } =  require('commander')


program.version('1.0.0')
program.description('Command Line Interface for Tables migration')

program
    .command('migrate')
    .alias('M')
    .description('Make tables migrations')
    .action(()=> console.info('Sorry This command havent assign any action yet!'))



program.parse(process.argv)