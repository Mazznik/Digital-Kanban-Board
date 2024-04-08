const express = require('express');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const port = 3001;

// Povezivanje s bazom podataka
const db = new sqlite3.Database('./database.db', (err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
    } else {
        console.log('Connected to the database');
        // Stvaranje tablice ako ne postoji
        db.run(`CREATE TABLE IF NOT EXISTS tasks (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            task_name TEXT
        )`, (err) => {
            if (err) {
                console.error('Error creating table:', err);
            } else {
                console.log('Table created successfully');
            }
        });
    }
});

// Middleware za parsiranje JSON podataka
app.use(express.json());

// Definiranje rute za pohranu podataka
app.post('/addTask', (req, res) => {
    const { task } = req.body;

    db.run('INSERT INTO tasks (task_name) VALUES (?)', [task], function(err) {
        if (err) {
            console.error('Error inserting task into database:', err);
            res.status(500).send('Error inserting task into database');
        } else {
            console.log('Task inserted into database with ID:', this.lastID);
            res.status(200).send('Task inserted into database');
        }
    });
});

// Pokretanje servera
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
