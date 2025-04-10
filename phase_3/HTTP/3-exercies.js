// printCharStats(4)
try {
    printCharStats('4d')
} catch (error) {
    console.log(error)
}


function printCharStats(level) {
    if (isNaN(level)) {
        throw 'Paramater is not a number';
    }

    console.log('You character is level', level);
}