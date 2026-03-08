// Sistem Double-Entry Accounting Klinik Yakin
const ledger = {
    recordTransaction: function(amount, description) {
        const date = new Date().toLocaleString();
        
        console.log("--- CATATAN JURNAL AUTOMATIK ---");
        console.log(`Tarikh: ${date}`);
        console.log(`Keterangan: ${description}`);
        
        // Format Double Entry
        console.log(`DEBIT: Akaun Tunai (1001) -> RM ${amount}`);
        console.log(`KREDIT: Akaun Jualan (4001) -> RM ${amount}`);
        console.log("--------------------------------");
    }
};

