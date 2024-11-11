// app.js
const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

// Route to render the main game page
app.get('/', (req, res) => {
  res.render('index');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
