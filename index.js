const express = require("express");
const app = express();
const {User} = require("./db/mongo");
const cors = require("cors");
const bcrypt = require("bcrypt");
const PORT = 4000;

app.use(cors());
app.use(express.json());

function sayHi(req, res) {
    res.send("Hello World");
}

app.get("/", sayHi);
app.post("/api/auth/signup", signUp);
app.post("/api/auth/login", login);

app.listen(PORT, function () {
    console.log(`Server is running on : ${PORT}`);
});



async function signUp(req, res) {
    const email = req.body.email;
    const password = req.body.password;
    

    const userInDb = await User.findOne({
        email : email
    });
    
    if (userInDb != null) {
        res.status(400).send("Email already exists");
        return;
    }
    const user = {
        email: email,
        password: hashPassword(password)
    };
    try {
        await User.create(user);
        } catch (e) {
        console.error(e);
        res.status(500).send("Something went wrong");
        return;
    }
     
    res.send("Sign Up");
}



async function login(req, res) {
    const body = req.body;


    const userInDb = await User.findOne({
        email : body.email
    });
    if (userInDb == null) {
        res.status(400).send("Wrong email");
        return;
    }

    const passwordInDb = userInDb.password;
    if (!isPaswwordCorrect(req.body.password, passwordInDb)) {
        res.status(400).send("Wrong password");
        return;
    }

    res.send({
        userId: userInDb._id,
        token: "token"
    });
}

function hashPassword(password) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    return hash;
}

function isPasswordCorrect(password, hash) {
return bcrypt.compareSync(password, hash);

}