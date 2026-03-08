// 1. Firebase Imports (Versi Web SDK 10+)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// 2. Konfigurasi Firebase Anda (Klinik Yakin System)
const firebaseConfig = {
  apiKey: "AIzaSyAIg96DCq1mc0_ZVCmf5_Ye856ILxZ0wwM",
  authDomain: "klinik-yakin-system.firebaseapp.com",
  projectId: "klinik-yakin-system",
  storageBucket: "klinik-yakin-system.firebasestorage.app",
  messagingSenderId: "970760294149",
  appId: "1:970760294149:web:839bf4f0dcad68de70b16c"
};

// 3. Initialize Firebase & Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// --- LOGIK POS (SAMA SEPERTI SEBELUM INI) ---
let cart = [];

export function addToCart(pName, pPrice) {
    const item = { name: pName, price: pPrice, qty: 1 };
    cart.push(item);
    updateCartUI();
}

function updateCartUI() {
    const cartContainer = document.querySelector('.flex-1.p-4.overflow-y-auto.space-y-4');
    const totalDisplay = document.querySelector('.text-xl.font-bold.text-blue-700 span:last-child');
    
    let html = '';
    let total = 0;

    cart.forEach((item) => {
        html += `
            <div class="flex justify-between items-center text-sm border-b pb-2">
                <div><p class="font-bold text-gray-800">${item.name}</p></div>
                <p class="font-bold">RM ${item.price.toFixed(2)}</p>
            </div>`;
        total += item.price;
    });

    if(cartContainer) cartContainer.innerHTML = html;
    if(totalDisplay) totalDisplay.innerText = `RM ${total.toFixed(2)}`;
}

// 4. FUNGSI BAYAR (SIMPAN KE FIREBASE)
export async function processPayment() {
    if (cart.length === 0) return alert("Bakul masih kosong!");

    const grandTotal = cart.reduce((sum, item) => sum + item.price, 0);

    try {
        // Rekod ke Cloud Firestore (Collection: sales)
        const docRef = await addDoc(collection(db, "sales"), {
            item_list: cart,
            total_amount: grandTotal,
            created_at: serverTimestamp(),
            branch: "Bahau"
        });

        alert(`✅ Bayaran Berjaya!\nID Transaksi: ${docRef.id}`);
        
        // Kosongkan bakul & UI
        cart = [];
        updateCartUI();

    } catch (e) {
        console.error("Ralat Firebase: ", e);
        alert("Gagal simpan ke Cloud. Pastikan 'Firestore' sudah diaktifkan di Firebase Console.");
    }
}
