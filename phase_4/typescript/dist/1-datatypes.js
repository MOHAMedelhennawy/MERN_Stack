// Built-in Data Types in TypeScript
let fullName = "John Doe";
let age = 30;
let isStudent = false;
let printInfo = (fullName, age, isStudent) => {
    console.log(`fullName: ${fullName}, Age: ${age}, Is Student: ${isStudent}`);
};
printInfo(fullName, age, isStudent);
// User defined Data Types in TypeScript
class Person {
}
let pers = new Person();
let myCar;
var Color;
(function (Color) {
})(Color || (Color = {}));
let c;
// Any Data Type in TypeScript
let randomValue = 10;
randomValue = true;
randomValue = "Hello";
// multiple Data Types (Union Types) in TypeScript
let multiType;
multiType = 20;
multiType = true;
export {};
//# sourceMappingURL=1-datatypes.js.map