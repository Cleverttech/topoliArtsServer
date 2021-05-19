// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv/config");

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most middlewares
require("./config")(app);

const projectName = "topoliArts";
const capitalized = (string) =>
  string[0].toUpperCase() + string.slice(1).toLowerCase();

app.locals.title = `${capitalized(projectName)}`;

const session = require("express-session");
const MongoStore = require("connect-mongo");

app.use(
  session({
    secret: process.env.SESSION_KEY,
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000,
    },
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI || "mongodb://localhost/topoliArts",
      ttl: 24 * 60 * 60,
    }),
  })
);
//----------------------------------------------------------
 //link static files here- should be pasted above the routes
const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));
//----------------------------------------------------------

// 👇 Start handling routes here
// Contrary to the views version, all routes are controled from the routes/index.js
const allRoutes = require("./routes");
app.use("/api", allRoutes);

const authRoutes = require("./routes/auth.routes");
app.use("/api", authRoutes);

const coursesRoutes = require("./routes/courses.routes");
app.use("/api", coursesRoutes);

const portfolioRoutes = require("./routes/portfolio.routes");
app.use("/api", portfolioRoutes);

const artistsRoutes = require("./routes/artists.routes");
app.use("/api", artistsRoutes);

const userRoutes = require("./routes/user.routes");
app.use("/api", userRoutes);

const cloudinaryRoutes = require("./routes/file-upload.routes");
app.use("/api", cloudinaryRoutes);

const stripeRoutes = require("./routes/stripe.routes");
app.use("/api", stripeRoutes);

<<<<<<< HEAD
//----------------------------------------------------------
//should be pasted below all routes before error handling
app.use((req, res, next) => {
	// If no routes match, send them the React HTML.
	res.sendFile(__dirname + "/public/index.html");
});
//----------------------------------------------------------

=======
const chatRoutes = require("./routes/chat.routes");
app.use("/api", chatRoutes);
>>>>>>> 5cb1c1236c74e404f32225928487eb02e1eec9fd
// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
