import 'dotenv/config';
import { createClient } from "@supabase/supabase-js";

const url = process.env.SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
const table = process.env.SUPABASE_TABLE || "items";

if (!url || !key) {
    console.warn("[WARN] SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY belum diset (ENV).");
}
const sb = createClient(url, key);

export default {
    async getAll({ status }) {
        let q = sb.from(table).select("*").order("id", { ascending: true });
        if (status) q = q.eq("status", status);
        const { data, error } = await q;
        if (error) throw error;
        return data;
    },

    async create({ nama, status, tanggalMasuk, tanggalSelesai = null }) {
        const { data, error } = await sb
            .from(table)
            .insert([{ nama, status, tanggalMasuk, tanggalSelesai }])
            .select()
            .single();
        if (error) throw error;
        return data;
    },

    async update(id, { status, tanggalSelesai }) {
        const payload = {};
        if (status) payload.status = status;
        if (tanggalSelesai) payload.tanggalSelesai = tanggalSelesai;

        const { data, error } = await sb
            .from(table)
            .update(payload)
            .eq("id", id)
            .select()
            .single();

        // PGRST116: no rows found
        if (error && error.code === "PGRST116") return null;
        if (error) throw error;
        return data;
    },

    async remove(id) {
        // Gunakan select agar lebih kompatibel dengan formatter/editor
        const { data, error } = await sb
            .from(table)
            .delete()
            .eq("id", id)
            .select("id");

        if (error) throw error;
        return (count === null || count === undefined ? 0 : count) > 0;
    }
};