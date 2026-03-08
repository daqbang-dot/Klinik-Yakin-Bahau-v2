// Logik Pengiraan POS Klinik Yakin
const posTransaction = {
    calculateTotal: function(items) {
        let subtotal = 0;
        items.forEach(item => {
            subtotal += item.price * item.quantity;
        });
        return subtotal;
    },

    generateReceiptNumber: function() {
        const date = new Date();
        const timestamp = date.getTime().toString().slice(-6);
        return `KY-${timestamp}`;
    },

    formatCurrency: function(amount) {
        return new Intl.NumberFormat('ms-MY', {
            style: 'currency',
            currency: 'MYR'
        }).format(amount);
    }
};
