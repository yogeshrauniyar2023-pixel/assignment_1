const express = require('express');
const cors = require('cors');
const fs = require('fs');

const app = express();

app.use(cors());
app.use(express.json());

app.post('/api', (req, res) => {

    const newData = req.body;

    // Read existing data
    fs.readFile('data.json', 'utf8', (err, data) => {

        let jsonData = [];

        if (!err && data) {
            jsonData = JSON.parse(data);
        }

        // Add new data
        jsonData.push(newData);

        // Save back to file
        fs.writeFile('data.json', JSON.stringify(jsonData, null, 2), (err) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ message: "Error saving data" });
            }

            console.log("Saved:", newData);
            res.json({ message: "Data saved successfully" });
        });
    });
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});