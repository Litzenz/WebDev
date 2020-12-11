import mongoose from 'mongoose';

const Schema = mongoose.Schema;

// Generate the schema for your data.
// See: https://mongoosejs.com/docs/guide.html
// timestamps
// With ES6 classes!!!
// Note how we don't need an ID - that's generated for us.
// We also don't need to manually do created / updated timestamps if we need them.

const userSchema = new Schema({

    username: { type: String, unique: true }, // Each user must have a unique username
    firstName: String,  // Basic fields
    lastName: String,
    gender: String,
    dateOfBirth: Date,

    address: { // address is a nested document
        line1: String,
        line2: String,
        suburb: String,
        city: String,
        postcode: Number
    },

    creditCards: [{ lastFourDigits: String, encryptedInfo: String }], // The array syntax means we can have multiple credit cards for a given person

    registeredPets: [{ type: Schema.Types.ObjectId, ref: 'Pet' }], // This is how we reference a different collection.

}, { /* This second object allows us to specify more config info. In this case, we're enabling automatic timetamps using the default options.
        For more options, see the URL above. */
    timestamps: {}
});

// Allows us to add an extra "virtual property" to the schema. This value won't actually be stored in the DB, but can be used like
// a normal property, e.g. console.log(myUser.firstName); or myUser.firstName = 'Bob Marley';
userSchema.virtual('fullName')
    .get(function () { return `${this.firstName} ${this.lastName}`; })
    .set(function (value) {
        this.firstName = value.substr(0, value.indexOf(' '));
        this.lastName = value.substr(value.indexOf(' ') + 1);
    });

export const User = mongoose.model('User', userSchema);

const petSchema = new Schema({
    number: { type: String, unique: true },
    name: String,
    species: String,
    breed: String,
    initialRegistrationDate: Date,
    expiryDate: Date,
    isNeutered: Boolean,
    notes: [{ date: Date, content: String }],
    owner: { type: Schema.Types.ObjectId, ref: 'User' }
}, {
    timestamps: {}
});

export const Pet = mongoose.model('Pet', petSchema);