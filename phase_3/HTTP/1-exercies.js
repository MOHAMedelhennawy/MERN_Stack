function getDomainFromURL(url) {

    const domain = new URL(url);
    return domain
}

const bootdevURL = 'https://boot.dev/learn/learn-python';
const domain = getDomainFromURL(bootdevURL);


console.log(`The domain name is "${domain.hostname}", Pathname is "${domain.pathname}"`);