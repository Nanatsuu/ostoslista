const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 3000;

const db = mysql.createConnection({
  host: 'localhost', // osoite
  user: 'root', // Käyttäjätunnus
  password: '', // Salasana (ei ole asetettu)
  database: 'shoppinglist'
});

db.connect((err) => {
  if (err) {
    console.error('Tietokantayhteyden avaaminen epäonnistui: ' + err.message);
  } else {
    console.log('Tietokantayhteys avattu');
  }
});

app.get('/items', (req, res) => {
  const sql = 'SELECT id, description, amount FROM item';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Tietokantakysely epäonnistui: ' + err.message);
      res.status(500).json({ error: 'Tietokantavirhe' });
      return;
    }
    res.json(results);
  });
});

app.listen(port, () => {
  console.log(`Palvelin käynnissä portissa ${port}`);
});
