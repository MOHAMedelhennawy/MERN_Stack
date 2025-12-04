# initialize pakcage.json
npm init -y
npm install express dotenv
npm install -D typescript ts-node @types/node @types/express nodemon eslit prettier
echo 'node_modules' > .gitignore

# initialize typescript
npx tsc --init
mkdir dist src

# Create edit json file
if [ ! -d scripts ]; then
    mkdir scripts && touch scripts/edit_json.sh
fi

if [ ! -f scripts/edit_json.sh ]; then
     touch scripts/edit_json.sh
     chmod +x scripts/edit_json.sh
fi

# Initialize scripts in json 
EDIT_PACKAGE_SCR=./scripts/edit_json.sh

$EDIT_PACKAGE_SCR build tsc
$EDIT_PACKAGE_SCR start "node dist/server.js"
$EDIT_PACKAGE_SCR dev "nodemon --watch 'src/**/*.ts' --exec 'ts-node' src/server.ts"
$EDIT_PACKAGE_SCR lint "eslit 'src/**/*.ts'"
