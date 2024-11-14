import { Before, After, Given, When, Then } from "cypress-cucumber-preprocessor/steps";
Before(() => {
    cy.log("Démarrage du test - common");
});

After(() => {
    cy.log("Fin du test  - common");
});


Given("I visit ceWeekEnd.html", ()=>{
    cy.visit('http://localhost:3030/ceWeekEnd.html');
})

Given("I visit {string}", (title)=>{
    cy.visit('http://localhost:3030/'+title);
})

