const { Book } = require("../models/Book");
const express = require("express")
const { upload } = require("../middlewares/multer");

async function postBook(req, res) {
    const file = req.file;
    const stringifiedBook = req.body.book;
    const book = JSON.parse(stringifiedBook);
    const filename = req.file.filename;
    book.imageUrl = filename;
    try {
    const result = await Book.create(book);
    res.send({ message: "Book posted", book: result });
        } catch (e) {
            console.error(e);
            res.status(500).send("Something went wrong :" + e.message);
        }
}

async function getBooks(req, res) {
    const books = await Book.find();
    books.forEach(book =>  {
        book.imageUrl = getAbsoluteImagePath(book.imageUrl)
    });
    res.send(books);
}

function getAbsoluteImagePath (fileName) {
return process.env.PUBLIC_URL + "/" + process.env.IMAGES_FOLDER_PATH + "/" + fileName;
}

const booksRouter = express.Router();
booksRouter.get("/", getBooks);
booksRouter.post("/", upload.single("image"), postBook);



module.exports = { booksRouter };