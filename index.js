const express = require("express");
const app = express();
const cors = require("cors");
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

const users = [];

function signUp(req, res) {
    const email = req.body.email;
    const password = req.body.password;
    

    const userInDb = users.find(user => user.email === email);
    
    if (userInDb != null) {
        res.status(400).send("Email already exists");
        return;
    }
    const user = {
        email: email,
        password: password
    };
    users.push(user);
    res.send("Sign Up");

}



function login(req, res) {
    const body = req.body;


    const userInDb = users.find((user) => user.email === email);
    if (userInDb == null) {
        res.status(400).send("Wrong email");
        return;
    }

    const passwordInDb = userInDb.password;
    if (passwordInDb != body.password) {
        res.status(400).send("Wrong password");
        return;
    }

    res.send({
        userId: "123",
        token: "token"
    });
}