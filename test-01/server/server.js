import express from 'express';
import bodyParser from 'body-parser';
import session from 'express-session';
import apiRoutes from './api-routes';
import path from 'path';
import mongoose from 'mongoose';

// Setup Express
const app = express();
const port = process.env.PORT || 10000;

// Setup body-parser
app.use(bodyParser.json({ extended: false }));

// Setup express-session
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: "CS732SE750"
}));

// Initialize database on MongoDB Atlas. When we quit the server, the db connection will close automatically.
mongoose.connect('mongodb+srv://test:cs732@cluster0-jnh20.mongodb.net/galleryApp', { useNewUrlParser: true }).then(
    () => console.log('Connected to database!'),
    err => console.error(err));

// Setup our routes. These will be served as first priority.
// Any request to /api will go through these routes.
app.use("/api", apiRoutes);

// Make the public folder available statically
const oneHour = 60 * 60 * 1000;
app.use(express.static(path.join(__dirname, "./public"), { maxAge: oneHour }));

// If we're in production...
if (process.env.NODE_ENV === 'production') {
    console.log("Running in production!");

    // Make the "build" folder available statically
    app.use(express.static(path.join(__dirname, "../client/build")));

    // If we don't match ANYTHING else, return client/build/index.html on another GET request.
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
    });
}

// Start the server running. Once the server is running, the given function will be called, which will
// log a simple message to the server console. Any console.log() statements in your node.js code
// can be seen in the terminal window used to run the server.
app.listen(port, () => console.log(`App server listening on port ${port}!`));