// CRITICAL: OS Command Injection - Checkmarx should catch this!

app.get('/ping', function (req, res) {
    const ip = req.query.ip;
    // No sanitization at all — user input is fully trusted and injected into the command
    exec(ip, (err, stdout, stderr) => {
        if (err) {
            return res.status(500).send(stderr);
        }
        res.send(stdout);
    });
});
