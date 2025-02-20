# TYPESCRIPT

## MODULE ALIASES

1. config `baseUrl` and `paths` in `tsconfig.ts`

   ```typescript
    ...
    "baseUrl": "./",                                  /* Specify the base directory to resolve non-relative module names. */
       "paths": {
         "@/*":["src/*"],
         "@/configs/*":["src/configs/*"],
         "@/controllers/*":["src/controllers/*"],
         "@/dtos/*":["src/dtos/*"],
         "@/repositories/*":["src/repositories/*"],
         "@/routes/*":["src/routes/*"],
         "@/models/*":["src/models/*"],
         "@/middlewares/*":["src/middlewares/*"],
         "@/services/*":["src/services/*"],
         "@/utils/*":["src/utils/*"],
         "@/types/*":["src/types/*"],
         "@/interfaces/*":["src/interfaces/*"],
       },          
       ...
   ```

2. import `module_aliases`

3. add module aliases for `js` in `package.json`

   ```typescript
   ...
   "_moduleAliases":{
       "@":"./dist"
   }
   ...
   ```

4. import and use `tsc-watch`

```typescript
nmp i tsc-watch --save-dev

"dev": "tsc && tsc-watch --onsuccess \" node dist/app.js\""
```

