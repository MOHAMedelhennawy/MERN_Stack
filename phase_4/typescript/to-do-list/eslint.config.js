import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default ([
    {
        parser: '@typescript-eslint/parser',
        parserOptions: {
            project: './tsconfig.json',
            tsconfigRootDir: __dirname,
            sourceType: 'module',
        },
        plugins: ['@typescript-eslint'],
        extends: [
            'eslint:recommended',
            'plugin:@typescript-eslint/recommended',
        ],
        rules: {
            // Custom rules can be added here
        },
    },
    {
        files: ['**/*.ts'],
    },
    
]);