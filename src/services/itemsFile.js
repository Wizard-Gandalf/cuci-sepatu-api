import fs from "fs/promises";
const DATA_PATH = "items.json";

async function readAll() {
    const raw = await fs.readFile(DATA_PATH, "utf8").catch(() => "[]");
    return JSON.parse(raw);
}

async function writeAll(data) {
    await fs.writeFile(DATA_PATH, JSON.stringify(data, null, 2), "utf8");
}

export default {
    async getAll({ status }) {
        const items = await readAll();
        if (status) return items.filter(i => i.status === status);
        return items;
    },

    async create({ nama, status, tanggalMasuk, tanggalSelesai = "-" }) {
        const items = await readAll();
        const id = items.length ? Math.max(...items.map(i => i.id)) + 1 : 1;
        const item = { id, nama, status, tanggalMasuk, tanggalSelesai };
        items.push(item);
        await writeAll(items);
        return item;
    },

    async update(id, { status, tanggalSelesai }) {
        const items = await readAll();
        const idx = items.findIndex(i => i.id === id);
        if (idx === -1) return null;
        const current = items[idx];
        const updated = {
            ...current,
            ...(status ? { status } : {}),
            ...(tanggalSelesai ? { tanggalSelesai } : {})
        };
        items[idx] = updated;
        await writeAll(items);
        return updated;
    },

    async remove(id) {
        const items = await readAll();
        const next = items.filter(i => i.id !== id);
        if (next.length === items.length) return false;
        await writeAll(next);
        return true;
    }
};