import express from "express";
import fs from "fs";
import path from "path";

const app = express();
app.use(express.json());

// Path absolut ke file JSON
const dataPath = path.join(process.cwd(), "items.json");

// Fungsi baca file JSON
function getItems() {
  try {
    const raw = fs.readFileSync(dataPath, "utf8");
    return JSON.parse(raw);
  } catch (err) {
    console.error("Gagal membaca file:", err);
    return [];
  }
}

// Fungsi tulis file JSON
function saveItems(items) {
  try {
    fs.writeFileSync(dataPath, JSON.stringify(items, null, 2), "utf8");
  } catch (err) {
    console.error("Gagal menulis file:", err);
  }
}

// Endpoint utama
app.get("/", (req, res) => {
  res.json({ message: "Cuci Sepatu API aktif di Vercel!" });
});

// -------------------------------
//         ROUTE CRUD /items
// -------------------------------

// GET semua item
app.get("/items", (req, res) => {
  const items = getItems();
  res.json(items);
});

// POST item baru
app.post("/items", (req, res) => {
  const items = getItems();
  const newItem = {
    id: items.length > 0 ? items[items.length - 1].id + 1 : 1,
    ...req.body,
  };
  items.push(newItem);
  saveItems(items);
  res.status(201).json(newItem);
});

// PUT update item berdasarkan id
app.put("/items/:id", (req, res) => {
  const items = getItems();
  const id = parseInt(req.params.id);
  const index = items.findIndex((item) => item.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Item tidak ditemukan" });
  }

  items[index] = { ...items[index], ...req.body };
  saveItems(items);
  res.json(items[index]);
});

// DELETE hapus item berdasarkan id
app.delete("/items/:id", (req, res) => {
  const items = getItems();
  const id = parseInt(req.params.id);
  const filtered = items.filter((item) => item.id !== id);

  if (filtered.length === items.length) {
    return res.status(404).json({ message: "Item tidak ditemukan" });
  }

  saveItems(filtered);
  res.json({ message: `Item dengan id ${id} telah dihapus` });
});

// -------------------------------
//        EXPORT UNTUK VERCEL
// -------------------------------
export default app;
