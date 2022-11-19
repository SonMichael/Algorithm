var person1 = {firstName: 'Jon', lastName: 'Kuperman'};
var person2 = {firstName: 'Kelly', lastName: 'King'};

function say(greeting0, greeting1) {
 console.log(greeting0 + ',' + greeting1 + ' ' + this.firstName + ' ' + this.lastName);
}

var sayHelloJon = say.bind(person1, 'Hello', 'Good morning');
var sayHelloKelly = say.bind(person2, 'Hello', 'Good morning');

// var newFunction = fun.bind(thisArg[, arg1[, arg2[, ...]]])
sayHelloJon(); // => Hello,Good morning Jon Kuperman
sayHelloKelly(); // => Hello,Good morning Kelly King
