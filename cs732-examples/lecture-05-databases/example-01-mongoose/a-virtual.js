class Person {
    
    constructor() {
        this.firstName = 'Bob';
        this.lastName = 'Marley';
    }

    toString() {
        return `${this.firstName} ${this.lastName}`;
    }

    get fullName() {
        return `${this.firstName} ${this.lastName}`;
    }

    set fullName(value) {
        this.firstName = value.substr(0, value.indexOf(' '));
        this.lastName = value.substr(value.indexOf(' ') + 1);
    }

}

const person = new Person();

person.firstName = 'Andrew';
person.lastName = 'Meads';

console.log(person.fullName); // Andrew Meads

person.fullName = 'Anne Hathaway';
console.log(fullName); // Anne Hathaway
console.log(person.lastName) // Hathaway