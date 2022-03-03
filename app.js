const express = require('express');
const { partsController, partController } = require('./controllers');

const app = express();

const PORT = process.env.PORT || 4000;

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, PATCH, DELETE, OPTIONS'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
  next();
});

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
