const Login = require('../schemas/Login');

const bcrypt = require('bcrypt');
const saltRounds = 10;

const jwt = require('jsonwebtoken');
const jwtKey = "supersecret";
const jwtExpirySeconds = 3600;

const register = async (res, user) => {

    const tmpUser = new Login(user);
    tmpUser.password = await bcrypt.hash(user.password, saltRounds);

    try {
        await tmpUser.save((err, currentUser) => {
            if (err) {
                throw "Record Already Exists";
            }

            return currentUser._id;
        });
    } catch (err) {
        res.status(400).json({ status: "failure", message: err.message }).end();
    }

    // Creates Token
    // TODO replace username with database location
    const token = jwt.sign({ username }, jwtKey, {
        algorithm: "HS256",
        expiresIn: jwtExpirySeconds,
    });

    res.status(200).json({ status: "sucess", token: token }).end();


};

const autheticate = async (req, res) => {
    // TODO change
    const { username, password } = req;

    // Get Account From DB
    const user = await Login.findOne({ username });

    if (!user || !await bcrypt.compare(password, account.password)) {
        res.status(400).json({ status: "failure", message: "User does not exist!" }).end();
    } else {
        // TODO replace username with database location
        const token = jwt.sign({ username }, jwtKey, {
            algorithm: "HS256",
            expiresIn: jwtExpirySeconds,
        });

        res.status(200).json({ status: "success", token: token }).end();
    }
};


module.exports = { register, autheticate };