import dotenvParseVariables from 'dotenv-parse-variables'


console.log(`:rocket: ~ file: environment.js ~ line 5 ~ env`, process.env);

console.log(`:rocket: ~ file: environment.js ~ line 2 ~ dotenvParseVariables`, dotenvParseVariables(process.env));
console.log(process.env.Debug);


export default {
    data: () => ({
        env: 'environment'
    }),

};
