const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 8000;

// Database
let items = [
  { id: 1, name: 'the Seccret' },
  { id: 2, name: 'The Shikshya' },
  { id: 3, name: 'BhagawatGita' },
];

app.use(bodyParser.json());

// GET
app.get('/api/items', (req, res) => {
  res.json(items);
});

// GET with id 
app.get('/api/items/:id', (req, res) => {
  const itemId = parseInt(req.params.id);
  const item = items.find((item) => item.id === itemId);

  if (item) {
    res.json(item);
  } else {
    res.status(404).json({ error: 'Item not found' });
  }
});

// POST 
app.post('/api/items', (req, res) => {
  const newItem = req.body;
  newItem.id = items.length + 1;
  items.push(newItem);
  res.status(201).json(newItem);
});

// PUT with id 
app.put('/api/items/:id', (req, res) => {
  const itemId = parseInt(req.params.id);
  const updatedItem = req.body;

  const index = items.findIndex((item) => item.id === itemId);

  if (index !== -1) {
    items[index] = { id: itemId, ...updatedItem };
    res.json(items[index]);
  } else {
    res.status(404).json({ error: 'Item not found' });
  }
});

// DELETE 
app.delete('/api/items/:id', (req, res) => {
  const itemId = parseInt(req.params.id);
  const index = items.findIndex((item) => item.id === itemId);

  if (index !== -1) {
    const deletedItem = items[index];
    items.splice(index, 1);
    res.json(deletedItem);
  } else {
    res.status(404).json({ error: 'Item not found' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
