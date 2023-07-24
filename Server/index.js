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
    const q = `select * from task`;
    db.query(q, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    })
});

app.post("/task", (req, res) => {
    const q = "INSERT INTO `task` ( `Task_name`, `user_email`) VALUES (?);"

    const values = [
        req.body.Task_name,
        req.body.email
    ];

    db.query(q, [values], (err, data) => {
        if (err) return res.send(err);
        return res.json(data);
    });
});

app.delete("/task/:id", (req, res) => {
    const taskId = req.params.id;
    const q = " DELETE FROM task WHERE task_id = ? ";

    db.query(q, [taskId], (err, data) => {
        if (err) return res.send(err);
        return res.json(data);
    });
});

app.put("/edit/:id", (req, res) => {
    const taskId = req.params.id;
    const q = "UPDATE task SET `Task_name`= ?, `task_status`= ?  WHERE task_id = ? ";

    const values = [
        req.body.task_name,
        req.body.task_status || 'NO',
    ];

    db.query(q, [...values, taskId], (err, data) => {
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