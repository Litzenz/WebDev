import mongoose from 'mongoose';
import { User, Pet } from './schema';
import readline from 'readline-sync';
import moment from 'moment';

main();

/**
 * Main function. This is its own function rather than simply being written in the file, because this function calls
 * async functions, and we're not allowed to use "await" from outside async functions.
 */
async function main() {

    // Connect to database
    // For more extra options, see: https://mongoosejs.com/docs/connections.html
    await mongoose.connect('mongodb://localhost:27017/petRegistry', {
        useNewUrlParser: true
    });
    console.log('Connected to database!');

    await commandLineApp();

    // Disconnect when complete
    await mongoose.disconnect();
    console.log('Disconnected from database!');

}

/**
 * Continually asks for user input until they choose to Exit. Runs various commands based on the input given.
 */
async function commandLineApp() {

    while (true) {
        try {

            console.log('What would you like to do?');
            console.log('1) Create user');
            console.log('2) Register a pet');
            console.log('3) Query all users');
            console.log('4) Query specific user');
            console.log('5) Exit');

            const option = parseInt(readline.question('Option: '));
            switch (option) {
                case 1:
                    await createUser();
                    break;

                case 2:
                    await createPet();
                    break;

                case 3:
                    await queryAllUsers();
                    break;

                case 4:
                    await querySingleUser();
                    break;

                case 5:
                    return;

                default:
                    console.log(`Unknown option: ${option}`);
            }

        } catch (err) {
            console.error(err);
        }

        console.log();
    }
}

/**
 * Creates a new User based on console prompts, and adds it to the database.
 */
async function createUser() {
    const user = new User();
    console.log(user._id);
    user.username = readline.question('Username: ');
    user.fullName = readline.question('Full name: ');
    user.gender = readline.question('Gender: ');
    user.dateOfBirth = new Date(readline.question('Date of birth (yyyy-mm-dd): '));
    user.address = createAddress();
    user.creditCards = [];
    user.registeredPets = [];

    await user.save();
    console.log(`User saved! _id = ${user._id}`);

    readline.question('Press ENTER to continue...');
}

/**
 * Creates and returns a User's address based on console prompts.
 */
function createAddress() {
    return {
        line1: readline.question('Address line 1: '),
        line2: readline.question('Address line 2: '),
        suburb: readline.question('Address suburb: '),
        city: readline.question('Address city: '),
        postcode: parseInt(readline.question('Address postcode: '))
    }
}

/**
 * Creates a new Pet based on console prompts, and adds it to the database. Makes sure the pet has a valid owner.
 */
async function createPet() {
    const pet = new Pet();
    pet.number = readline.question('Registration number: ');
    pet.name = readline.question('Name: ');
    pet.species = readline.question('Species: ');
    pet.breed = readline.question('Breed: ');
    pet.initialRegistrationDate = Date.now();
    pet.expiryDate = moment().add(1, 'years').toDate();
    const neut = readline.question(`Has ${pet.name} been neutered? `);
    pet.isNeutered = neut.toLowerCase().substr(0, 1) === 'y';
    pet.notes = [];

    // Continually prompt until we enter a username of an existing user
    let user;
    while (!user) {
        const username = readline.question(`Owner's username: `);
        user = await User.findOne({ username });
        if (!user) console.log(`${username} not found!`);
    }

    // For the bidirectional relationship between Pet and User, we must set each side of the relationship, as shown here.
    pet.owner = user._id;
    await pet.save();
    console.log(`Pet registered! _id = ${user._id}`);
    user.registeredPets.push(pet._id); // Updates the user's registeredPets list
    await user.save();

    readline.question('Press ENTER to continue...');

}

/**
 * Gets a single User from the database and prints it to the console
 */
async function querySingleUser() {
    const username = readline.question('Enter username: ');

    const user = await User.findOne({ username });
    if (user) {
        console.log('User found!');
        await printUser(user, true);
    }
    else {
        console.log(`User ${username} not found!`);
    }

    readline.question('Press ENTER to continue...');
}

/**
 * Gets all Users in the database and prints them to the console
 */
async function queryAllUsers() {
    const users = await User.find();
    console.log(`${users.length} users found!`);

    for (const u of users) {
        await printUser(u, true);
    }

    readline.question('Press ENTER to continue...');
}

/**
 * Logs the given User to the console.
 * 
 * @param {User} u the user to print
 * @param {Boolean} printPets whether or not to also print this user's pets. Defaults to false.
 */
async function printUser(u, printPets = false) {
    console.log(`_id: ${u._id}`);
    console.log(`username: ${u.username}`);
    console.log(`name: ${u.fullName}`);
    console.log(`gender: ${u.gender}`);
    console.log(`date of birth: ${moment(u.dateOfBirth).format('MMMM Do, YYYY')}`);
    console.log(`address: ${u.address.line1}, ${u.address.line2}, ${u.address.suburb}, ${u.address.city}, ${u.address.postcode}`);
    console.log(`created: ${u.createdAt}`);
    console.log(`udpated: ${u.updatedAt}`);

    if (printPets) {
        console.log();
        console.log(`${u.registeredPets.length} registered pets:`);
        await User.populate(u, 'registeredPets');
        for (const pet of u.registeredPets) {

            await printPet(pet, '- ');
            console.log();

        }
    }
}

/**
 * Logs the given pet to the console
 * 
 * @param {Pet} p the pet to print
 */
async function printPet(p, prefix = '') {
    console.log(`${prefix}_id: ${p._id}`);
    console.log(`${prefix}registration number: ${p.number}`);
    console.log(`${prefix}name: ${p.name}`);
    console.log(`${prefix}species: ${p.species}`);
    console.log(`${prefix}breed: ${p.breed}`);
    console.log(`${prefix}initial registration date: ${moment(p.initialRegistrationDate).format('MMMM Do, YYYY')}`);
    console.log(`${prefix}registration expiry date: ${moment(p.expiryDate).fromNow()}`);
    console.log(`${prefix}is neutered?: ${p.isNeutered}`);

    await Pet.populate(p, 'owner');
    console.log(`${prefix}owner's name: ${p.owner.fullName}`);

    if (p.notes && p.notes.length > 0) {
        console.log(`${prefix}notes:`);
        for (const note of p.notes) {
            console.log(`${prefix}- ${note.content} (date: ${moment(note.date).fromNow()}`);
        }
    }
    else {
        console.log(`${prefix}notes: none`);
    }
}

// Queries in Mongo: https://docs.mongodb.com/manual/tutorial/query-documents/
// Queries in Mongoose: 