const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require('cors');
const port = process.env.PORT || 5500;

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

const mysql2 = require("mysql2");


const db = mysql2.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_DT || "test",
    password: process.env.DB_PASS,
    connectionLimit: 100
});

app.get('/task', (req, res) => {
    const q = `select * from user`;
    db.query(q, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    })
});

app.post("/task", (req, res) => {
    const q = "INSERT INTO user(`username`, `email`, `password`) VALUES (?)";

    const values = [
        req.body.username,
        req.body.email,
        req.body.password
    ];

    db.query(q, [values], (err, data) => {
        if (err) return res.send(err);
        return res.json(data);
    });
});

app.delete("/task/:id", (req, res) => {
    const bookId = req.params.id;
    const q = " DELETE FROM user WHERE email = ? ";

    db.query(q, [bookId], (err, data) => {
        if (err) return res.send(err);
        return res.json(data);
    });
});

app.put("/edit/:id", (req, res) => {
    const bookId = req.params.id;
    const q = "UPDATE user SET `username`= ?, `email`= ?, `password`= ? WHERE email = ? ";

    const values = [
        req.body.username,
        req.body.email,
        req.body.password
    ];

    db.query(q, [...values, bookId], (err, data) => {
        if (err) return res.send(err);
        return res.json(data);
    });
});


app.get('/', (req, res) => {
    res.send('My Server is Running')
})

app.listen(port, () => {
    console.log("My Server is Running on port: ", port);
})