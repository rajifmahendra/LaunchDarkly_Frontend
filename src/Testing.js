// 🟧 HIGH: SQL Injection (CWE-89)
const express = require('express');
const app = express();

app.get('/user', function (req, res) {
    const userId = req.query.id;
    const query = "SELECT * FROM users WHERE id = '" + userId + "'";
    // Simulasi query, dalam real app ini akan jadi SQLi
    console.log("Running query: " + query);
    res.send("User data logged");
});

app.listen(3001, () => {
    console.log('High test running on port 3001');
});