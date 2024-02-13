// Middleware for handling auth
const db = require("../db/index");

async function adminMiddleware(req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
    let username = req.headers.username;
    let password = req.headers.password;

    if (await db.Admin.findOne({ username, password })) {
        next();
    } else {
        res.status(404).send("User does not exist");
    }
}

module.exports = adminMiddleware;
