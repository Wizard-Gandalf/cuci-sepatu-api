export function validateItemCreate(payload) {
    const { nama, status, tanggalMasuk, tanggalSelesai } = payload || {};
    if (!nama || typeof nama !== "string") return { error: "nama wajib string" };
    if (!["Sedang Dicuci", "Selesai"].includes(status)) return { error: "status tidak valid" };
    if (!isValidDate(tanggalMasuk)) return { error: "tanggalMasuk harus YYYY-MM-DD" };
    if (tanggalSelesai && !isValidDate(tanggalSelesai))
        return { error: "tanggalSelesai harus YYYY-MM-DD" };
    return {};
}

export function validateItemUpdate(payload) {
    const { status, tanggalSelesai } = payload || {};
    if (status && !["Sedang Dicuci", "Selesai"].includes(status)) return { error: "status tidak valid" };
    if (tanggalSelesai && !isValidDate(tanggalSelesai))
        return { error: "tanggalSelesai harus YYYY-MM-DD" };
    return {};
}

function isValidDate(s) {
    return /^\d{4}-\d{2}-\d{2}$/.test(s);
}