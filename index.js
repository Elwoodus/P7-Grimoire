const {app} = require("./config/app");
const { usersRouter } = require("./controllers/users.controller");
const { booksRouter } = require("./controllers/books.controller");

app.get("/", (req,res) => res.send ("Server running!"));



app.use("/api/auth", usersRouter);
app.use("/api/books", booksRouter);








