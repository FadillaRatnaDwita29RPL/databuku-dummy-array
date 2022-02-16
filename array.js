const express = require("express"); //inisialisasi aplikasi menggunakan express js

const app = express()
const port = 8000 

app.use(express.json())
app.use(express.urlencoded({extended: true}))

//data dummy
let nextId = 4;
const books = [
    {id : 1, title: "The First", year: 2019},
    {id : 2, title: "The Second", year: 2020},
    {id : 3, title: "The Third", year: 2021},
];

 // endpoint '/'
app.get('/', (req, res) => {      
    res.send({
        message: "Berhasil melakukan pemanggilan get",
        data: {
            description:
            "Endpoint ini untuk menampilkan data",
        }
    }) 
})

app.get('/books', (req, res) => {      
    res.send({
        message: "Berhasil menampilkan data buku",
        data: {books}
    }) 
})

app.post('/books', (req, res) => {      
    const book = {
        id: nextId++,
        title: req.body.title,
        year: req.body.year
    }
    books.push(book);
    res.send({
        message: "Berhasil melakukan penambahan data buku",
        data: { 
            newbook: book,
            totalBooks: books.length
         }
    }) 
})

app.get('/book/:id', (req, res) =>{
    const bookIndex = books.findIndex((item) => item.id == req.params.id);
    res.send({
        message: "Berhasil menampilkan perubahan data buku",
        data: { book: books[bookIndex]}
    })
})

//PUT
app.put("/books/:id", (req, res) => {
    const bookIndex = books.findIndex((item) => item.id == req.params.id);
    books[bookIndex].title = req.body.title;
    books[bookIndex].year = req.body.year;

    res.send({
        message: "Berhasil mengubah buku",
        data:{book: books[bookIndex]}
    })
})

//delete data
app.delete("/books/:id", (req, res) => {
    const id = req.params.id;
    const book = books.find(book => book.id == id);
    if (!book) {
        res.status(404).send({
            message: "Buku tidak ditemukan"
        })
    } else {
        const index = books.indexOf(book);
        books.splice(index, 1); //methode yang digunakan untuk menghapus array yang berindeks kan sesuai variabel index  
                                // --> dari jumlah index berapa index yang dihapus (1)
        res.send({
            message: "Berhasil menghapus buku",
            data: {
                book,
                totalBooks: books.length,
            }
        })
    }
})

app.listen(port, () => {            
    console.log(`Server di port ${port}`)
})
