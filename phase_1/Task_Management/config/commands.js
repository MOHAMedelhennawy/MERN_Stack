import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import { clearDB, createNewTask, getAllTasks, getTaskByID, removeTaskByID } from '../models/tasks.js';

const listTasks = async (tasks) => {
    if (!tasks) {
        tasks = await getAllTasks()
    }
    tasks.forEach(task => {
        console.log(task.id);
        console.log(task.content);
        console.log('\n');
    });
}

yargs(hideBin(process.argv))
    .command('new <task>', 'Add a new task', (yargs) => {
        return yargs
            .positional('task', {
                alias: 'n',
                type: 'string',
                describe: 'The content of the task that you wanna to create',
            })
    }, async (argv) => {
        const data = await createNewTask(argv.task)
        console.log('Task is added successfully!, taskID:', `'${data.id}'`);
    })
    .command('all', 'Get all tasks', _ => {}, async (_) => {
        const tasks = await getAllTasks()
        listTasks();
    })
    .command('find <id>', "Search in tasks with ID", (yargs) => {
        return yargs
            .positional('id', {
                alias: 'f',
                type: 'string',
                describe: 'Task id to search'
            })
    }, async (argv) => {
        const matches = await getTaskByID(argv.id);
        listTasks(matches)
    })
    .command('remove <id>', 'Remove a task with ID', (yargs) => {
        return yargs
            .positional('id', {
                alias: 'd',
                type: 'string',
                describe: 'Task id to delete',
            })
    }, async (argv) => {
        await removeTaskByID(argv.id);
        listTasks()
    })
    .command('clean', 'Clear all tasks', (_) => {}, async (_) => {
        await clearDB()
    })
    .demandCommand(1, 'You need at least one positional argument')
    .parse()
