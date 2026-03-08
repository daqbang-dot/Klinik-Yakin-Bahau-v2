// Logik Pengurusan Stok Klinik Yakin
const inventory = {
    checkStock: function(productId, quantityRequested) {
        // Simulasi semak stok dari database.sql
        console.log(`Menyemak stok untuk Produk ID: ${productId}`);
        // Jika stok cukup, pulangkan true
        return true; 
    },

    deductStock: function(productId, quantity) {
        // Logik untuk tolak stok
        console.log(`STOK DIKEMASKINI: Produk ${productId} ditolak ${quantity} unit.`);
        
        // Amaran automatik (WhatsApp Alert Logic)
        if (quantity < 5) {
            console.warn("AMARAN: Stok kritikal! Sila buat pesanan baru.");
        }
    }
};

// Eksport untuk digunakan oleh POS
// module.exports = inventory; (Jika guna Node.js)

