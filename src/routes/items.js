import { Router } from "express";
import { validateItemCreate, validateItemUpdate } from "../utils/validate.js";

const router = Router();

// langsung gunakan Supabase service
import service from "../services/itemsSupabase.js";

// GET /items?status=Selesai
router.get("/", async(req, res) => {
    try {
        const { status } = req.query;
        const items = await service.getAll({ status });
        res.json(items);
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: "internal server error" });
    }
});

// POST /items
router.post("/", async(req, res) => {
    const { error } = validateItemCreate(req.body);
    if (error) return res.status(400).json({ error });

    try {
        const created = await service.create(req.body);
        res.status(201).json(created);
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: "internal server error" });
    }
});

// PUT /items/:id
router.put("/:id", async(req, res) => {
    const { error } = validateItemUpdate(req.body);
    if (error) return res.status(400).json({ error });

    try {
        const { id } = req.params;
        const updated = await service.update(Number(id), req.body);
        if (!updated) return res.status(404).json({ error: "item tidak ditemukan" });
        res.json(updated);
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: "internal server error" });
    }
});

// DELETE /items/:id
router.delete("/:id", async(req, res) => {
    try {
        const { id } = req.params;
        const ok = await service.remove(Number(id));
        if (!ok) return res.status(404).json({ error: "item tidak ditemukan" });
        res.json({ message: "deleted" });
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: "internal server error" });
    }
});

export default router;