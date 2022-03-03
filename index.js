const express = require('express');
const cors = require('cors');
const { partsController, partController } = require('./controllers');

const app = express();

const PORT = process.env.PORT || 4000;

app.use(cors());

app.get('/', (req, res) => {
  res.json({
    message: 'Hello',
    availableRoutes: ['/api/parts', '/api/parts/:part'],
  });
});

app.get('/api', (req, res) => {
  res.json({
    message: 'Hello',
    availableRoutes: ['/api/parts', '/api/parts/:part'],
  });
});

app.get('/api/parts', partsController);
app.get('/api/parts/:part', partController);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
