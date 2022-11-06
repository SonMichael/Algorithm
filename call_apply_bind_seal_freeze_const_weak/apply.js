

var person1 = {firstName: 'Jon', lastName: 'Kuperman'};
var person2 = {firstName: 'Kelly', lastName: 'King'};

function say(greeting0, greeting1) {
 console.log(greeting0 + ',' + greeting1 + ' ' + this.firstName + ' ' + this.lastName);
}
// fun.apply(thisArg, [argsArray])
say.apply(person1, ['Hello', 'Good moring'], "Hello1");//Note*: The difference between call
say.apply(person2, ['Hello', 'Good moring']); // => Hello,Good moring Kelly King


