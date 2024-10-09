import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import { getTaskById, getAllTasks, addNewTask, updateTask, deleteTaskById } from '../controller/tasks.js'

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
  .command('find <id>', 'Search in task with id', (yargs) => {
    return yargs
      .positional('id', {
        describe: 'Task id to seach',
        type: "string",
        alias: "n"
      })
  }, async (argv) => {
    const task = await getTaskById(argv.id)

    listTasks([task])
  })
  .command('all', 'Get all tasks', (yargs) => {
    listTasks()
  })
  .command('add <content>', 'Add new task', (yargs) => {
    return yargs
      .positional('task', {
        describe: 'Task title',
        type: 'string'
      })
  }, async (argv) => {

    await addNewTask(argv.content)
    console.log('Added Successfully!')
  })
  .command('update', 'Update task', (yargs) => {
    return yargs
    .option('id', {
      alias: 'i',
      describe: 'ID of the task to update',
      type: 'string',
      demandOption: true,
    })
    .option('task', {
      alias: 't',
      describe: 'New task description',
      type: 'string',
      demandOption: true,
    })
  }, async (argv) => {
    await updateTask(argv.id, argv.task)
    console.log('Task updated successfully');
  })
  .command('remove <id>', 'Remove task', (yargs) => {
    return yargs
      .positional('id', {
        describe: 'Task id to remvoe',
        type: 'string'
      })
  }, async (argv) => {
    deleteTaskById(argv.id)
  })
  .demandCommand(1, 'You need at least one positional argument')
  .parse()
