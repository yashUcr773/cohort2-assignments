const db = require("../db/index");

async function userMiddleware(req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
    let username = req.headers.username;
    let password = req.headers.password;
    let result = await db.User.findOne({ username, password });
    if (result) {
        res.locals.UserData = result;
        next();
    } else {
        res.status(404).send("User does not exist");
    }
}

module.exports = userMiddleware;
