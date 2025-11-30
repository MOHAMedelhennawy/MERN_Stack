// Generics

function identity<Type>(arg: Type): Type {
    return arg;
}

const value: String = identity<String>("Elhennawy");

console.log(value)

//  =======================
function getFristElement<ElementType>(array: ElementType[]) {
    return array[0];
}

const array = ["Mohammed", "Mustafa", "Mahmoud"];
getFristElement(array);

const array2 = [1, 2, 3, 4, 5];
getFristElement(array2);

