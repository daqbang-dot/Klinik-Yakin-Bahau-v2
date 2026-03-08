// 1. Firebase Imports (Versi Web SDK 10+)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAIg96DCq1mc0_ZVCmf5_Ye856ILxZ0wwM",
  authDomain: "klinik-yakin-system.firebaseapp.com",
  projectId: "klinik-yakin-system",
  storageBucket: "klinik-yakin-system.firebasestorage.app",
  messagingSenderId: "970760294149",
  appId: "1:970760294149:web:839bf4f0dcad68de70b16c"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

let cart = [];

// FUNGSI TAMBAH KE BAKUL
export function addToCart(pName, pPrice) {
    cart.push({ name: pName, price: pPrice });
    console.log("Tambah:", pName); // Untuk debug
    updateCartUI();
}

// FUNGSI UPDATE RUPA BAKUL
function updateCartUI() {
    const cartContainer = document.getElementById('cart-items');
    const totalDisplay = document.getElementById('grand-total');
    
    if (!cartContainer || !totalDisplay) return;

    let html = '';
    let total = 0;

    cart.forEach((item) => {
        html += `
            <div class="flex justify-between items-center text-sm border-b pb-2">
                <div><p class="font-bold text-gray-800">${item.name}</p></div>
                <p class="font-bold text-blue-600">RM ${item.price.toFixed(2)}</p>
            </div>`;
        total += item.price;
    });

    cartContainer.innerHTML = html;
    totalDisplay.innerText = `RM ${total.toFixed(2)}`;
}

// FUNGSI BAYAR
export async function processPayment() {
    if (cart.length === 0) return alert("Bakul masih kosong!");

    try {
        const grandTotal = cart.reduce((sum, item) => sum + item.price, 0);
        await addDoc(collection(db, "sales"), {
            item_list: cart,
            total_amount: grandTotal,
            created_at: serverTimestamp(),
            branch: "Bahau"
        });

        alert("✅ Bayaran Berjaya Disimpan ke Cloud!");
        cart = [];
        updateCartUI();
    } catch (e) {
        console.error("Ralat Firebase:", e);
        alert("Gagal simpan. Sila semak internet anda.");
    }
}
