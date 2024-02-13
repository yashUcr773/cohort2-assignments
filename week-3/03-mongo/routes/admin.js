const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const router = Router();
const db = require("../db/index");

// Admin Routes
router.post("/signup", async (req, res) => {
    // check if valid input
    // check if admin exists
    // signup

    let username = req.body.username;
    let password = req.body.password;

    try {
        const adminUser = new db.Admin({
            username,
            password,
        });

        let result = await adminUser.save();
        return res.status(200).send("Admin created successfully");
    } catch (e) {
        console.log(e);
        res.status(500).send("Some Error Occurred");
    }
});

router.post("/courses", adminMiddleware, async (req, res) => {
    let title = req.body.title;
    let description = req.body.description;
    let price = req.body.price;
    let imageLink = req.body.imageLink;

    let result = await db.Course.create({
        title,
        description,
        price,
        imageLink,
    });
    return res.status(200).json({
        message: "Course created successfully",
        courseId: result._id,
    });
});

router.get("/courses", adminMiddleware, async (req, res) => {
    let courses = await db.Course.find({});
    return res.status(200).json({ courses });
});

module.exports = router;
