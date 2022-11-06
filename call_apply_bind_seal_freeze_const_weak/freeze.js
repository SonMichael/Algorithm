let alligator = {
  canItFly : false
};

Object.freeze(alligator);
alligator = { pi: 3.14159 };

console.log(alligator) // {pi: 3.14159}
