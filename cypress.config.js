const cucumber = require('cypress-cucumber-preprocessor').default;
const { defineConfig } = require("cypress");
const pg = require("pg");

module.exports = defineConfig({
  
  e2e: { 
    setupNodeEvents(on, config) {
       on('file:preprocessor', cucumber()),
       on('task', {
        READFROMDB({dbConfig,sql})
        {
          const client = new pg.Pool(dbConfig);
          return client.query(sql);
        }
       })
    }, 
    specPattern: "cypress/e2e/*.feature", 
  },
  UAT : {
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: '1344',
    port: '5432'
  }
});
