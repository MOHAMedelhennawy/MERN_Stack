
(async () => {
    const apiKey = generateKey();
    const items = await getItemsData();
    
    
    logItems(items);
    
    async function getItemsData() {
        const response = await fetch('http://localhost:4000/users', {   // Theres no internet connecton so i will use my own api
            method: 'GET',
            mode: 'cors',
            headers: {
                'X-API-Key': apiKey,
                'Content-Type': 'application/json'
            }
        })
    
        return response.json();
    }
    
    function generateKey() {
        const chars = 'ABCDEF0123456789';
        let result = '';
    
        for(let i = 0; i < 16; i++) {
            result += chars.charAt(Math.floor(Math.random) * chars.length)
        }
    }
    
    
    function logItems(items) {
        // for (const item of items) {
        // }
        console.log(items)

        console.log(items.length)
    }

})()