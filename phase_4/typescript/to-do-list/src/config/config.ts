import dotenv from 'dotenv';

dotenv.config();

interface Config {
    port: number;
    // databaseUrl: string;
    // jwtSecret: string;
    // logLevel: string;
    nodeEnv: string;
}

const config: Config = {
    port: Number(process.env.PORT) || 3000,
    nodeEnv: process.env.NODE_ENV || "development",
};

export default config;
