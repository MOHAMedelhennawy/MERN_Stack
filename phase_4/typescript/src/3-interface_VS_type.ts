// ======================================= interface =======================================
interface Person {
    name: string,
    age: number,
};

const person: Person = {
    name: "Mohammed",
    age: 23,
};

// ======================================= type =======================================
type myType = number | string;

let x: myType = "Mohammed";
x = 512;

// x = {}; // error
// x = null; // error

type Person2 = {
    name: string,
    age: number,
};

const person2: Person2 = {
    name: "Mohammed",
    age: 23,
};


// What if you neet to add new optinal proporety?
interface Person3 {
    name: string,
    age: number,
    nick_name?: string,
}

type Person4 = {
    name: string,
    age: number,
    nick_name?: string,
}

// const josh: Person4 = {
//     name: "elhennaw",
//     age: 213,
//     nick_name: undefined,
// }