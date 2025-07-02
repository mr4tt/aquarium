## aquarium

### env file
To set up .env file, copy .env.example and fill out the blanks. 

Discord developer portal: https://discord.com/developers/applications/

- clientID is the Application ID, found in General Information under your app in the developer portal
- publicKey is the Public Key, found in General Information under your app
- token is only shown once when you generate it, under the Bots tab of your app
- testServerID is the guild ID of your testing Discord server
- quarterly is for my credit card's quarterly cashback category 


### setup
1. make sure you're using node >= 23.6.0 (first version with native ts type stripping)
2. `node index.ts test` or `node index.ts prod`


### setup with tsc (untested)
1. run `tsc --init` (after installing typescript) to create a `tsconfig.json` file
2. run `tsc` to generate `.js` version of files 
3. in each `.js` file, remove `.ts` extension from import statements
4. in `package.json`, remove `type:module`
5. run `node index.js test` or `node index.js prod`