
// 1. Masukkan Firebase Config anda di sini
const firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "klinik-yakin.firebaseapp.com",
  projectId: "klinik-yakin",
  storageBucket: "klinik-yakin.appspot.com",
  messagingSenderId: "...",
  appId: "..."
};

// 2. Initialize Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// 3. Kemaskini Fungsi Bayar (Process Payment)
async function processPayment() {
    if (cart.length === 0) return alert("Bakul kosong!");

    const grandTotal = cart.reduce((sum, item) => sum + item.price, 0);

    try {
        // SIMPAN JUALAN KE CLOUD DATABASE
        const docRef = await addDoc(collection(db, "sales"), {
            items: cart,
            total: grandTotal,
            timestamp: serverTimestamp(),
            staff: "Kaunter 1"
        });

        console.log("Jualan direkodkan dengan ID: ", docRef.id);
        alert(`Bayaran Berjaya: RM ${grandTotal.toFixed(2)}\nData telah disimpan ke Cloud!`);
        
        // Kosongkan bakul
        cart = [];
        updateCartUI();

    } catch (e) {
        console.error("Ralat simpan data: ", e);
        alert("Gagal menyimpan data ke Cloud. Sila cuba lagi.");
    }
}
