# Star Wars- Assignment:

Star Wars console is used to provide information about planets to start wars users.

## Features:

1. Login Flow using name as username and birthdate as password. 

2. Search : Only authorized users can search and use the system. After search, planets are displayed in different sizes based on populations

3. Planet Information: On clicking planet, planet information is displayed.

4. Logout Flow

## Installation:

1. Make sure node and npm are installed.
2. run npm install in main directory where package.json is located.
3. npm start
4. Open localhost:8081 on browser.

## Technologies Used:

1. Node Js
2. React Js
3. Bootstrap CSS
4. Redux Library
5. Javascript
5. HTML
7. CSS
8. Webpack
9. BootstrapJs and Jquery
10. Mocha Chai Enzyme for test cases

## Component Structure:

1. Layout : Layout component is responsible for creating redux store and  includes bundle js and css files. Also, Screen component is called from Layout component.

2. Screen : screen component is responsible for header, PlanetComp and PlanetOverLay component. Also, Reducer , mapStateToProps and mapDispatchToProps functions are present in screen component.
Also, search box and logout button is available in Screen component.

3. header: header component is used to display heading. 

4. PlanetComp: PlanetComp is used to display all the planets searched.

5. PlanetOverLay : PlanetOverLay component is used to information about the planets.


## Assumptions Made :

1. A loader is shown as api response is slow sometimes.

## Unit Tests

Run npm run test to run unit test cases.