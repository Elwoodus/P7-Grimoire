const mongoose = require('mongoose');
const PASSWORD = "OMsXG3SHS7OC8Env";
const USER = "theguard";
const DB_URL =
`mongodb+srv://${USER}:${PASSWORD}@cluster0.qldiayi.mongodb.net/?retryWrites=true&w=majority`
console.log("DB_URL", DB_URL);

async function connect() {
    try {
await mongoose.connect(DB_URL);
console.log("Connected to DB");
} catch (e) {
    console.error(e);
}
}
connect();


module.exports = {};