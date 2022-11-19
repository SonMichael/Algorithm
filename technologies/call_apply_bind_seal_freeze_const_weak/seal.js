const toBeSealed = {
  prop1: 'some value',
  prop2: 'some other value'
};
  
const sealedObject = Object.seal(toBeSealed);

sealedObject.prop1 = 'new value'; // no error, value changed
// Cannot add property newProp, object is not extensible
sealedObject.newProp = 'won\'t be added'; 
// Cannot delete property 'prop2' of #<Object>
delete sealedObject.prop2; 
// Cannot define property newProp, object is not extensible
Object.defineProperty(sealedObject, 'newProp', { 
writable: true
});


Object.isSealed(sealedObject); // true
Object.isSealed(toBeSealed); // true
Object.isSealed({}); // false
  