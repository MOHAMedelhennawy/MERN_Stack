#!/bin/bash

# Bash script to either add or remove the test script in package.json
PACKAGE_JSON_PATH="./package.json"
SCRIPT_KEY=$1
SCRIPT_VALUE=$2

TMP_FILE=$(mktemp)
jq ".scripts.${SCRIPT_KEY} = \"${SCRIPT_VALUE}\"" "$PACKAGE_JSON_PATH" > "$TMP_FILE" && mv "$TMP_FILE" "$PACKAGE_JSON_PATH"
