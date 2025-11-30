// Built-in Data Types in TypeScript
let fullName: string = "John Doe";

let age: number = 30;

let isStudent: boolean = false;

let printInfo: Function = (fullName: string, age: number, isStudent: boolean): void =>  {
    console.log(`fullName: ${fullName}, Age: ${age}, Is Student: ${isStudent}`);
};

printInfo(fullName, age, isStudent);

// User defined Data Types in TypeScript
class Person { }
let pers: Person = new Person();

interface Car { }
let myCar: Car;

enum Color { }
let c: Color;


// Any Data Type in TypeScript
let randomValue: any = 10;
randomValue = true;
randomValue = "Hello";

// multiple Data Types (Union Types) in TypeScript
let multiType: number | boolean;
multiType = 20;
multiType = true;

const lis: [string, number] = ["elhennawy", 23];
const lis2: (string | number)[] = [1, "yes", 4, 5, "no"];

// you can costumize your own type
type MyType = number | string;

const name: MyType = "Mohamed";