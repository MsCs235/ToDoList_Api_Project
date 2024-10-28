const express = require("express");
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const bcrypt = require('bcryptjs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// ==================== database connection =========================
mongoose.connect('mongodb+srv://admin:admin@todolist.nplr6.mongodb.net/?retryWrites=true&w=majority&appName=ToDoList', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("DB connected");
    })
    .catch((err) => {
        console.log("ERROR");
        console.log(err);
    });
// ==================================================================

// ========================= Use session middleware ===============================
app.use(session({
    secret: "thisismysecretkey",   // A secret key to sign the session ID
    resave: false,                 // Do not save session if nothing is modified
    saveUninitialized: false,      // Do not create session until something is stored
    store: MongoStore.create({
        mongoUrl: 'mongodb+srv://admin:admin@todolist.nplr6.mongodb.net/?retryWrites=true&w=majority&appName=ToDoList',    // MongoDB URI
        collectionName: 'sessions'   // Name of the collection to store session data
    }),
    cookie: {
        secure: false,               // Set to true if using HTTPS
        httpOnly: true,              // Prevents client-side access to the cookie
        maxAge: 1000 * 60 * 60 * 24  // Cookie expiry time (24 hours)
    }
}));
// ================================================================================

// =============== include all routes in app.js file ================
const authRoutes = require('./routes/auth'); 
const noteRoutes = require('./routes/note');

// Register the routes after session middleware
app.use('/auth', authRoutes);
app.use('/note', noteRoutes);

// ==================================================================

// Set up view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

// ================= listen to port ================
const port = 3000;
app.listen(port, () => {
    console.log(`server is running on port ${port}.`);
});
// =================================================
