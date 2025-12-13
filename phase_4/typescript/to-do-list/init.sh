# initialize pakcage.json
npm init -y
npm install express dotenv
npm install -D typescript ts-node @types/express nodemon prettier
echo 'node_modules' > .gitignore

# initialize typescript
npx tsc --init
mkdir dist src

# Create edit json file
if [ ! -d scripts ]; then
    mkdir scripts && touch scripts/edit_json.sh
fi

if [ ! -f scripts/edit_json.sh ]; then
    mkdir -p scripts
    touch scripts/edit_json.sh

    cat << EOF > scripts/edit_json.sh
#!/bin/bash

# Bash script to either add or remove the test script in package.json
PACKAGE_JSON_PATH="./package.json"
SCRIPT_KEY=\$1
SCRIPT_VALUE=\$2

TMP_FILE=\$(mktemp)
jq ".scripts.\${SCRIPT_KEY} = \"\${SCRIPT_VALUE}\"" "\$PACKAGE_JSON_PATH" > "\$TMP_FILE" && mv "\$TMP_FILE" "\$PACKAGE_JSON_PATH"
EOF

    chmod +x scripts/edit_json.sh
fi

# Initialize scripts in json 
EDIT_PACKAGE_SCR=./scripts/edit_json.sh

$EDIT_PACKAGE_SCR build tsc
$EDIT_PACKAGE_SCR start "node dist/server.js"
$EDIT_PACKAGE_SCR dev "nodemon --watch 'src/**/*.ts' --exec 'ts-node' src/server.ts"

# Eslint setup
npm install --save-dev eslint @eslint/js typescript-eslint
npx eslint --init
$EDIT_PACKAGE_SCR lint "eslint"

if [ ! -f eslint.config.js ]; then
    touch eslint.config.js
    cat << EOF > eslint.config.js
// @ts-check

import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";

export default defineConfig([
  // JS recommended rules
  eslint.configs.recommended,

  // TS strict rules (type-aware)
  ...tseslint.configs.strict,

  // TS stylistic rules
  ...tseslint.configs.stylistic,

  {
    files: ["**/*.ts"],
    languageOptions: {
      parserOptions: {
        project: true, // enables type-aware rules
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },

  // custom project rules
  {
    rules: {
      indent: ["error", "tab"],
      quotes: ["error", "double"],
      semi: ["error", "always"],
      "no-unused-vars": "warn",
      "no-console": "off",
      "no-debugger": "warn",

      // better for TS readability
      "arrow-body-style": "off",

      // keep ESLint version (TS version is disabled in strict mode)
      "require-await": "error",
    },
  },
]);
EOF

# Create dirs
mkdir -p src/{config,controllers,middlewares,models,routes,services}
touch src/{app.ts,server.ts}

# Initialize prisma
npm install prisma @types/pg --save-dev
npm install @prisma/client @prisma/adapter-pg pg

# cat << EOF > tsconfig.json
# {
#   "compilerOptions": {
#     "target": "ES2023",
#     "module": "ESNext",
#     "outDir": "./dist",
#     "rootDir": "./src",
#     "strict": true,
#     "esModuleInterop": true,
#     "skipLibCheck": true,
#     "forceConsistentCasingInFileNames": true
#   }
# }
# EOF

npx prisma init --db --output ./src/prisma