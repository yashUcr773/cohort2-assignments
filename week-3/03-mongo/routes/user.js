const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const db = require("../db/index");

// User Routes
router.post("/signup", async (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    let purchasedCourses = [];
    try {
        const adminUser = new db.User({
            username,
            password,
            purchasedCourses,
        });

        let result = await adminUser.save();
        return res.status(200).send("Admin created successfully");
    } catch (e) {
        console.log(e);
        res.status(500).send("Some Error Occurred");
    }
});

router.get("/courses", userMiddleware, async (req, res) => {
    let courses = await db.Course.find({}, {});
    return res.status(200).json({ courses });
});

router.post("/courses/:courseId", userMiddleware, async (req, res) => {
    try {
        let courseId = req.params.courseId;

        let courseDBId = await db.Course.findOne({ id: courseId });
        if (courseDBId) {
            res.locals.UserData.purchasedCourses.push(courseDBId);
            db.User.update(
                { username, password },
                { purchasedCourses: res.locals.UserData.purchasedCourses }
            );

            res.status(200).json({ message: "Course purchased successfully" });
        } else {
            req.status(404).send("Course not Found");
        }
    } catch (e) {
        res.status(500).send("Some Error Occurred");
    }
});

router.get("/purchasedCourses", userMiddleware, async (req, res) => {
    let username = req.headers.username;
    let password = req.headers.password;

    let purchasedCourses = await db.User.find(
        { username, password },
        { purchasedCourses: 1, _id: 0 }
    );
    return res.status(200).json({ purchasedCourses });
});

module.exports = router;
