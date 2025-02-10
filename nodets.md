# NODE TYPESCRIPT

## Initiation
```json
sudo apt install node-typescript

npm i typescript ts-node ts-node-dev tsc-watch --save-dev

npx tsc --init --rootDir src --outDir build \
--esModuleInterop --resolveJsonModule --lib es6 \
--module commonjs --allowJs true --noImplicitAny true


// add this line in tsconfig.json

"include": ["./src/*.ts"],
"exclude": ["node_modules"]

// advanced script
"scripts": {
        "start": "pm2 start ./dist/app.js --name \"Acceptance-api\" --watch",
        "build": "tsc && \\cp -r ./src/views ./dist",
        "dev": "nodemon src/app.ts",
        "dev-watch1": "tsc-node-dev app.ts",
        "dev-watch": "tsc-watch --onSuccess \"node ./dist/app.js\" --compiler typescript/bin/tsc && \\cp -r ./src/views ./dist"
    },
 
```
