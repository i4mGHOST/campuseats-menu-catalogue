const express = require('express');
const app = express();

app.use(express.json());          // Read JSON request bodies
app.use(express.static('public')); // Serve static frontend files from 'public' folder

// The menu in-memory array with vegetarian flags
let items = [
  { id: 1, name: 'Veg Thali', price: 90, veg: true },
  { id: 2, name: 'Paneer Roll', price: 70, veg: true },
  { id: 3, name: 'Chicken Biryani', price: 120, veg: false }
];

let nextId = 4;

// GET /items -- List the whole menu with optional ?veg=true/false query filter[cite: 2, 5]
app.get('/items', (req, res) => {
  let result = items;
  if (req.query.veg !== undefined) {
    const isVeg = req.query.veg === 'true';
    result = result.filter(i => i.veg === isVeg);
  }
  res.json(result);
});

// GET /items/:id -- One dish, or 404 Not Found
app.get('/items/:id', (req, res) => {
  const item = items.find(i => i.id === Number(req.params.id));
  if (!item) return res.status(404).json({ error: 'not found' });
  res.json(item);
});

// POST /items -- Add a new dish
app.post('/items', (req, res) => {
  const { name, price, veg } = req.body;
  if (!name) return res.status(422).json({ error: 'name required' });

  const item = { 
    id: nextId++, 
    name, 
    price: Number(price) || 0,
    veg: veg === true || veg === 'true'
  };
  
  items.push(item);
  res.status(201).json(item); // 201 Created
});

// DELETE /items/:id -- Find, remove, and reply 204 No Content
app.delete('/items/:id', (req, res) => {
  const id = Number(req.params.id);
  const index = items.findIndex(i => i.id === id);
  if (index === -1) return res.status(404).json({ error: 'not found' });
  
  items.splice(index, 1);
  res.status(204).send(); // 204 No Content success with no body
});

app.listen(3000, () => console.log('Catalogue on http://localhost:3000'));