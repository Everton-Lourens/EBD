const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080;
const rootDir = path.join(__dirname, 'src');

app.disable('x-powered-by');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(rootDir, { extensions: ['html'] }));

app.get('/', (_req, res) => {
  res.sendFile(path.join(rootDir, 'index.html'));
});

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.use((_req, res) => {
  res.status(404).sendFile(path.join(rootDir, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Login shell running on http://localhost:${PORT}`);
});
