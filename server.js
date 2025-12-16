const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

// Serve static files (CSS, JS, images) from public folder
app.use(express.static(path.join(__dirname, "public")));

// Parse JSON and URL-encoded data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve the login page at root
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Login endpoint
app.post("/login", (req, res) => {
    const { username, password } = req.body;

    let users;
    try {
        users = JSON.parse(fs.readFileSync(path.join(__dirname, "users.json")));
    } catch (err) {
        return res.status(500).json({ success: false, message: "Server error reading users file." });
    }

    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        res.json({ success: true, message: "Login successful" });
    } else {
        res.json({ success: false, message: "Invalid username or password" });
    }
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
