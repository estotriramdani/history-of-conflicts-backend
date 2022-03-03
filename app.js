const express = require('express');
const { partsController, partController } = require('./controllers');

const app = express();

const PORT = process.env.PORT || 4000;

app.get('/', (req, res) => {
  res.json({
    message: 'Hello World!',
  });
});

app.get('/api/parts', partsController);
app.get('/api/parts/:part', partController);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
