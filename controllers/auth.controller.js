const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');
const { admins } = require("../shared/shared");
dotenv.config();

class AuthController {
    login(req, res) {
        const { username, password } = req.body;
        const target = admins.find(
            (item) => item.username === username && item.password === password
        );
        // delete target.password;
        console.log(target)
        if (target) {
            const { id, username, role } = target;
            const accessToken = jwt.sign(
                {
                    id,
                    username,
                    role,
                },
                `${process.env.JWT_SECRET_KEY}`,
                { expiresIn: "2 days" }
            );
            res.json({ accessToken });
        } else {
            res.sendStatus(401);
        }
    }

    getUser(req, res) {
        res.json(req.user);
    };
}

module.exports = new AuthController;
