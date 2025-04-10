
const getPromise = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (getRandomBool()) {
                resolve('Resolved');
            } else {
                reject('Rejected');
            }
        }, 1000)
    })
}


getPromise()
    .then((message) => {
        console.log(message)
    })
    .catch((message) => {
        console.log(message)
    })

function getRandomBool() {
    let randomNumber = Math.random();

    console.log(randomNumber);

    return randomNumber < .5;
}