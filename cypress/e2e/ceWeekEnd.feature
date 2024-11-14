@ceweekend @wip
Feature: ceWeekEnd
    Formulaire permettant d'avoir des informations de voyage sur une destination

    Background: 
    Given I visit "ceWeekEnd.html"

    @title
    Scenario: The title change when the city change
        Given I visit ceWeekEnd.html
        When I select a city
        Then the title contains the name of the city
    
    @title
    Scenario: The default title finish with ...
        Given I visit "ceWeekEnd.html"
        Then we have default title

    @title
    Scenario: The title change when the city change
        Given I visit "ceWeekEnd.html"
        When I select the city "Quesnoy-sur-Deûle"
        Then the title contains the name of the city "Quesnoy-sur-Deûle"

    @title
    Scenario Outline: The title change when the city change
        Given I visit "ceWeekEnd.html"
        When I select the city "<city>"
        Then the title contains the name of the city "<city>"

        @smoke
        Examples:
                | city                   |
                | Wasquehal              |
                | Armentières            |
                | Saint-Georges-sur-l'Aa |

        @regression
        Examples:
                | city               |
                | Cappelle-en-Pévèle |
                | Douai              |
                | Quesnoy-sur-Deûle  |

    # Rule: name, firstname are mandatory ; telephone and/or email is mandatory

    @title @form
    Scenario: I fill the form correctly
        Given I visit "ceWeekEnd.html"
        When I type "Brunet" in "lastname"
        When I type "Etienne" in "firstname"
        When I select the city "Douai"
        When I type "etienne.brunet@mail.com" in "email"
        When I type "0612345678" in "telephone"
        When I submit the form
        Then the title contains the name of the city "Douai"
        Then the popup contains the success message
        Then the form is not visible

    @form
     Scenario: I fill the form correctly
        Given I visit "ceWeekEnd.html"
        When I fill the form
        | lastname | firstname | city | email | telephone | 
        | Brunet | Etienne | Douai | etienne.brunet@mail.com | 0612345678 | 
        And I submit the form
        Then the title contains the name of the city "Douai"
        And Start to type your And step here the popup contains the success message
        But the form is not visible


    Scenario: I fill the form correctly
        Given I visit "ceWeekEnd.html"
        When I type "Brunet" in "lastname"
        * I type "Etienne" in "firstname"
        * I select the city "Douai"
        * I type "etienne.brunet@mail.com" in "email"
        * I type "0612345678" in "telephone"
        And I submit the form
        Then the title contains the name of the city "Douai"
        And the popup contains the success message
        But the form is not visible

    # Scenario: I fill the form correctly
    #     Given I visit "ceWeekEnd.html"
    #     When I type a name
    #     * I type a firstname
    #     * I select the city "Lille"
    #     * I type a email
    #     * I type a phone
    #     And I submit the form
    #     Then the title contains the name of the city "<city>"
    #     And the popup contains the success message
    #     But the form is not visible