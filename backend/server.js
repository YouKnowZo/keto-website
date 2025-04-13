const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Route to fetch recipes from a JSON file
app.get('/recipes', (req, res) => {
    const recipesFilePath = path.join(__dirname, 'recipes.json');
    fs.readFile(recipesFilePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to read recipes file' });
        }
        const recipes = JSON.parse(data);
        res.json(recipes);
    });
});

// Route to handle contact form submissions
app.post('/contact', (req, res) => {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    // Here you can add code to save the contact form data to a database or send an email

    res.json({ success: 'Contact form submitted successfully' });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
