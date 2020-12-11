import express from 'express';
import { User, Pet } from '../db/schema';
import mongooseCrudify from 'mongoose-crudify';

const router = express.Router();

/**
 * This will create five API endpoints by default:
 * - Get all pets: GET /pets/
 * - Create a new pet: POST /pets/
 * - Get a single pet by id: GET /pets/{id}/
 * - Update an existing pet: PUT /pets/{id}/
 * - Delete an existing pet: DELETE /pets/{id}/
 */
router.use('/pets', mongooseCrudify({
    Model: Pet
}));

/**
 * This "users" route has some non-default options.
 */
router.use('/users', mongooseCrudify({
    Model: User,

    identifyingKey: 'username', // Get / update / delete by username instead of by id

    endResponseInAction: true, // Defaults to true. Set to false to allow any after-actions to modify the response if required.

    beforeActions: [ // This defines extra functions to be called before the CRUD operation. There's also afterActions.
        {
            middlewares: [ensureLogin], // This middleware function will be run before each CRUD operation...
            except: ['list', 'read'] // except the 'list' and 'read' (Get and Get by identifier) operations.
        },
        // { // We can chain as many of these blocks as we'd like, using different "except" and "only" clauses if required.
        //     middlewares: [....]
        // }
    ],

    actions: {
        // Override the "read" (GET by identifer) action: when we get a User this way, also get that user's pets.
        read: (req, res) => {
            User.populate(req.crudify.user, 'registeredPets').then(() => res.json(req.crudify.user));
        },

        // Override the "list" (GET all) to do pagination
        list: async (req, res) => {
            const users = await User.find({});
            const start = req.query.start || 0;
            const size = req.query.size || users.length;
            res.json(users.slice(start, start + size));
        }
    },

    afterActions: [
        {
            middlewares: [logToConsole]
        }
    ]
}));

/**
 * Checks that the user is logged in. Sends back an unauthenticated status code otherwise.
 */
function ensureLogin(req, res, next) {

    const isLoggedIn = true; // Very thorough authentication algorithm

    if (isLoggedIn) {
        console.log('User is logged in!');
        next();
    }
    else {
        return res.sendStatus(401);
    }
}

/**
 * A more useful middleware, called after we obtain one or more Users. Populates the "registeredPets" field.
 */
// function populatePets(req, res, next) {

//     User.populate(req.crudify.result, 'registeredPets').then(next);
// }

function logToConsole(req, res, next) {
    console.log(req.crudify.err || req.crudify.result);
    next();
}

export default router;