# SmartStudy


## Description

This is a simple quiz game written in Javascript. It uses [Node.js](https://nodejs.org/en/) for the backend, which runs in the terminal environment. We have created a front-facing version that uses input from the user to login and sign up, which run in the web browser. We have also created back-end functionality to store the user's highest score.

![Quiz Game](/client/assets/images/logo.png)

## Installation

To play the game first, the user must  clone or download the repository.

### Create Server

In the terminal navigate to the server folder and run the below commands
```
npm init
```
```
npm install
```
```
npm start run
```

#### Web

Use an extension to go live on the index.html file. This will then allow the user to play the game in the browser.

## How to Play

The user will be asked to select a category. After a category has been selected, the user will be asked whether they want to play with or without a timer. A question will be asked based on the selected category. Each question will have multiple choice answers. If the user selects the correct answer, the score will be increased by one and the answer will flash green.If the user selects the incorrect answer, the score does not increase, the answer flashes red, and the correct answer flashes green.By pressing the restart button, the user can restart the quiz again.

## Unit Testing

Install dependencies using below commands
```
npm install supertest --save-dev
```
```
npm install jest
```
```
npm install jest-coverage
```

For test back-end navigate to server folder then run below command
```
npm test
```

## Technologies

* HTML
* CSS
* Javascript
* Node.js
* Express
* Supertest

## Credits

* [Rosie](https://github.com/rjj21)
* [Bart](https://github.com/brayson98)
* [Farhan](https://github.com/farhan3311)

