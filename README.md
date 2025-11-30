Simple NFT DApp (Blockchain Localhost)

Aplikasi web sederhana untuk pengelolaan aset digital (NFT) menggunakan blockchain lokal (Hardhat) dan frontend berbasis ethers.js.
Aplikasi ini mendemonstrasikan proses minting NFT, pembuktian kepemilikan, serta interaksi antara smart contract dan dompet digital (MetaMask).

⚙️ Fitur Utama:
🔗 Blockchain lokal via Hardhat (localhost:8545)
🧱 Smart Contract ERC-721 sederhana (NFT)
💼 Integrasi MetaMask
🖋️ Mint NFT baru dengan memasukkan URL metadata (IPFS)
💰 Royalti & kepemilikan transparan

📦 Persiapan Awal (Untuk Windows, mungkin akan berbeda jika pakai Linux)
1️⃣ Install Dependencies
Pastikan Node.js dan npm sudah terpasang.
Lalu jalankan: 
   npm install
Jika muncul warning seperti inflight@1.0.6 bisa diabaikan.

2️⃣ Jalankan Node Blockchain Lokal (Hardhat)
Buka terminal dan jalankan: 
   npx hardhat node
Tunggu sampai muncul:
   Started HTTP and WebSocket JSON-RPC server at http://127.0.0.1:8545/
   Accounts:
   0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 (10000 ETH)
   ...
   Chain ID: 31337
🟢 Biarkan terminal ini tetap terbuka — ini adalah blockchain lokal kamu.

3️⃣ Deploy Kontrak NFT
Buka terminal baru (biarkan node tetap aktif) dan jalankan:
   npx hardhat run scripts/deploy.js --network localhost
Output contoh:
   Deploying SimpleNFT...
   SimpleNFT deployed to: 0x5FbDB2315678afecb367f032d93F642f64180aa3
Salin alamat kontrak (0x5FbDB...) dan masukkan ke file frontend/js/app.js:
   const CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

🦊 Hubungkan MetaMask dengan Hardhat
4️⃣ Tambahkan Jaringan Baru
Buka MetaMask → Settings → Networks → Add Network Manually, isi seperti ini:
   Network Name = Hardhat Localhost
   New RPC URL	= http://127.0.0.1:8545
   Chain ID = 31337
   Currency Symbol = ETH
   Block Explorer URL = (kosongkan)
Klik Save dan pilih jaringan ini.

5️⃣ Impor Akun dari Hardhat
Setelah node aktif, Hardhat menampilkan daftar akun + private key.
Copy salah satu private key dan import ke MetaMask:
1. Klik profil di MetaMask → Import Account
2. Paste private key dari Hardhat, misalnya:
   0x59c6995e998f97a5a004497e5da... (tanpa tanda kutip)
3. Setelah itu akun kamu akan otomatis memiliki 10000 ETH (lokal) 💰

🌐 Jalankan Aplikasi Web
Masuk ke folder frontend:
   cd frontend
Install live-server (jika belum):
   npm install -g live-server
Jalankan:
   npm start
Buka browser ke:
   http://localhost:3000

🖋️ Proses Mint NFT
1. Klik “Connect Wallet”
→ izinkan MetaMask untuk menghubungkan dompet ke localhost:3000
2. Klik “Mint NFT”
→ masukkan URL metadata NFT (misalnya dari IPFS):
   https://ipfs.io/ipfs/QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco
3. Tunggu transaksi selesai, lalu lihat pesan sukses seperti:
   ✅ NFT berhasil dimint!

🔍 Verifikasi Blockchain
Kamu bisa melihat semua transaksi yang terjadi di terminal Hardhat Node, termasuk minting dan transfer NFT.
Ketika kamu menjalankan:
   npx hardhat node
Hardhat otomatis menjalankan JSON-RPC server lokal (localhost:8545) dan menampilkan semua transaksi yang lewat jaringan itu.

Contoh: ketika kamu menjalankan perintah mint dari frontend (Mint NFT), kamu akan melihat log seperti ini di terminal tempat node dijalankan:
   eth_sendRawTransaction
      Transaction: 0x2ca18912feb4ff6c0551abac32ff4047a14c9671ae0bfd07f5a423b9a9bd417a
      From:        0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
      To:          0x5fbdb2315678afecb367f032d93f642f64180aa3
      Value:       0 ETH
      Gas used:    25220 of 25220
      Block #1:    0x8c3e411dbbaaf5139c3ab0fb70692e6466cef98e067abc6561120af21b2f1806
👉 Ini menunjukkan bahwa kontrak NFT kamu berinteraksi di blockchain lokal.
Setiap eth_sendRawTransaction adalah satu transaksi baru di jaringan.

🧠 Penjelasan Singkat
Apa itu Blockchain?
Blockchain adalah database terdesentralisasi yang menyimpan catatan transaksi di banyak komputer.
Tidak bisa diubah, transparan, dan diverifikasi oleh siapa pun.

Apa itu Minting?
“Minting” berarti mencetak NFT baru ke dalam blockchain.
Setiap NFT yang di-mint memiliki:
- Alamat kontrak (contract address)
- ID unik (tokenId)
- Metadata (tokenURI yang mengarah ke IPFS)