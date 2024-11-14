import { Before, After, Given, When, Then } from "cypress-cucumber-preprocessor/steps";

Before(() => {
    cy.log("Démarrage du test");
});

After(() => {
    cy.log("Fin du test");
});

let ville = 'Douai';

function selectCity(city) {
    cy.get('#ville').select(city);
}



When("I select a city", ()=>{
    // cy.get('#ville').select('Douai');
    // cy.get('#ville').select(ville);
    selectCity(ville);
})

When("I select the city {string}", (city)=>{
    selectCity(city);
})

When("I type {string} in {string}", (value,input)=> {
    let locator;
    
    switch (input) {
        case 'lastname':
            locator = '#nom';
            break;
        case 'firstname':
            locator = '[data-testid="prenom"]';
            break;
        case 'telephone':
            locator = '#telephone';
            break;
        case 'email':
            locator = '#email';
            break;
    }

    try {
        cy.get(locator).type(value);
    } catch (err) {
        console.log('error in "I enter {string} in {string}" - unknow input')
    }
});

When("I fill the form", (dataTable)=>{
    dataTable.hashes().forEach((row) => {
        const { lastname, firstname, city, email, telephone } = row;
        cy.get('#nom').type(lastname);
        cy.get('[data-testid="prenom"]').type(firstname);
        cy.get('#ville').select(city);
        cy.get('#email').type(email);
        cy.get('#telephone').type(telephone);
    });
})


When("I submit the form", ()=>{
    cy.get('[data-testid="submit"]').click();
})


Then("the title contains the name of the city", ()=> {
    cy.get('#titre').should('have.text', 'Ce week-end je m\'évade à '+ ville + ' !');
});

Then("the title contains the name of the city {string}", (city)=> {
    cy.get('#titre').should('have.text', 'Ce week-end je m\'évade à '+ city + ' !');
});

// Then("the title contains the name of the city", (city = ville) => {
//     cy.get('#titre').should('have.text', 'Ce week-end je m\'évade à ' + city + ' !');
// });

Then("we have default title",()=> {
    cy.get('#titre').should('have.text', 'Ce week-end je m\'évade à ...');
})

Then("the popup contains the success message",()=>{
    cy.get('#modal-content').should('not.be.hidden');
    cy.get('#modal-content > p').should('have.text', 'Merci pour vos informations ! 🌟 Nous nous occupons de tout pour que vous puissiez vivre une expérience\n                inoubliable. 🌍 Votre prochaine destination de rêve sera bientôt prête. Restez à l\'écoute ! 🗺️');
})

Then("the form is not visible",()=>{
    cy.get('#destination-form').should('be.hidden');
})