var person1 = {firstName: 'Jon', lastName: 'Kuperman'};
var person2 = {firstName: 'Kelly', lastName: 'King'};

function say(greeting1, greeting2) {
 console.log(greeting1 + ',' + greeting2 + ' ' + this.firstName + ' ' + this.lastName);
}
// function.call(thisArg, arg1, arg2, ...)
say.call(person1, ['Hello', 'Hello1']); //Note*: The difference between apply
say.call(person2, 'Hello', 'Good morning'); // => Hello,Good morning Kelly King
