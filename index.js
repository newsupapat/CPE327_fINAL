import path from 'path';
require('dotenv').config();
var express = require('express');
const app = express();

if (process.env.NODE_ENV === 'production') {
  // js and css files
  app.use(express.static('build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Connect on Port ${PORT}`);
});
