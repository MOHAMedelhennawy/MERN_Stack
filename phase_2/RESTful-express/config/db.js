import fs from 'node:fs/promises'

const DB_PATH = new URL('../data/db.json', import.meta.url).pathname

// get
export const getDB = async () => {
    try {
        const tasks = await fs.readFile(DB_PATH, 'utf-8');
        return JSON.parse(tasks)
    } catch (erro) {
        throw new Error(`Failed to retrieve data from database: ${error.message}`)
    }
}

// save
export const saveDB = async (db) => {
    try {
        await fs.writeFile(DB_PATH, JSON.stringify(db, null, 2))
        return db;
    } catch (error) {
        throw new Error(`Failed to store data to database: ${error.message}`)
    }
}

// insert
export const insertDB = async (data) => {
    
    try {
        const { tasks } = await getDB();
    
        if (!Array.isArray(tasks)) {
            throw new Error("Database is corrupted: tasks should be array.");
        }

        tasks.push(data);
        await saveDB({ tasks });

        return data;

    } catch (error){
        throw new Error(`Failed to instert data into database: ${error.message}`);
        
    }
}
