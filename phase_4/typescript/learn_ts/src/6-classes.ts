class Car {
    model: string;
    year: number;

    constructor(model: string, year: number) {
        this.model = model;
        this.year = year;
    }

    getDetails(): string {
        return `Car Model: ${this.model}, Year: ${this.year}`;
    }
}

interface ICar {
    model: string;
    year: number;
    getDetails(): string;
}

const myCar: ICar = new Car("Toyota", 2020);

console.log(myCar.getDetails());



// Example 2
interface IUser {
    username: string;
    email: string;
    getInfo(): string;
}

class User implements IUser {
    username: string;
    email: string;

    constructor(username: string, email: string) {
        this.username = username;
        this.email = email;
    }

    getInfo(): string {
        return `Username: ${this.username}, Email: ${this.email}`;
    }
};

const user1: IUser = new User("john_doe", "john@example.com");