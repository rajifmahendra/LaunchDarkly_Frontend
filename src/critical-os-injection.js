// CRITICAL: OS Command Injection - Checkmarx should catch this!
const express = require('express');
const app = express();
const { exec } = require('child_process');

app.get('/ping', function (req, res) {
    const ip = req.query.ip;
    exec(ping -c 4 ${ip}, (err, stdout, stderr) => {
        if (err) {
            return res.status(500).send(stderr);
        }
        res.send(stdout);
    });
});

app.listen(3000, () => {
    console.log('App listening on port 3000');
});