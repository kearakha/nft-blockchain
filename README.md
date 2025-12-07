# 🎨 Simple NFT DApp — Hardhat, BNPI, DChain

Aplikasi web sederhana untuk minting dan menampilkan NFT menggunakan:

* 🧱 Blockchain lokal Hardhat
* 🌐 BNPI Network (UGM Private Chain)
* 🔵 DChain Mainnet

DApp ini menunjukkan alur lengkap:

* Deploy smart contract ERC-721
* Interaksi frontend + MetaMask
* Integrasi metadata NFT via IPFS
* Preview gambar NFT di browser

---

# 📥 Clone Repository

```
git clone https://github.com/kearakha/nft-blockchain
cd nft-blockchain
```

---

# 📦 Fitur Utama

* 🔗 Blockchain lokal Hardhat (127.0.0.1:8545)
* 🧱 Smart Contract NFT (ERC-721)
* 🦊 Integrasi MetaMask
* 📤 Upload metadata NFT via IPFS (Pinata)
* 🖼️ Preview gambar NFT (auto-fetch metadata)
* 🌍 Multi-network: Localhost, BNPI, DChain

---

# 🧰 Tech Stack

| Layer          | Teknologi             |
| -------------- | --------------------- |
| Smart Contract | Solidity, Hardhat     |
| Frontend       | HTML, CSS, JavaScript |
| Web3 Library   | ethers.js v5          |
| NFT Storage    | IPFS (Pinata)         |
| Wallet         | MetaMask              |
| Networks       | Hardhat, BNPI, DChain |

---

# 🟢 1. Menjalankan di Blockchain Lokal (Hardhat)

## 🔥 Jalankan Node Hardhat

```
npx hardhat node
```

Hardhat akan menampilkan daftar akun, private key, dan chain ID 31337.
Biarkan terminal ini tetap berjalan.

---

## 🚀 Deploy Smart Contract ke Localhost

```
npx hardhat run scripts/deploy.js --network localhost
```

Contoh output:

```
SimpleNFT deployed to: 0x5FbDB2...
```

Masukkan contract address ke frontend:

```js
const CONTRACT_ADDRESS = "0x5FbDB2...";
```

---

## 🦊 Tambahkan Hardhat Network ke MetaMask

| Field           | Value                                          |
| --------------- | ---------------------------------------------- |
| Network Name    | Hardhat Localhost                              |
| RPC URL         | [http://127.0.0.1:8545](http://127.0.0.1:8545) |
| Chain ID        | 31337                                          |
| Currency Symbol | ETH                                            |

Import salah satu private key dari Hardhat ke MetaMask.

---

## 🌐 Jalankan Frontend

```
cd frontend
npm install -g live-server
npm start
```

Buka browser: [http://localhost:3000](http://localhost:3000)

---

## 🖋️ Mint NFT

1. Klik **Connect Wallet**
2. Masukkan TokenURI metadata JSON (IPFS)
3. Klik **Mint NFT**
4. NFT muncul beserta gambar yang dibaca dari metadata

---

# 🌍 2. Deploy ke BNPI Network (UGM Private Chain)

BNPI adalah jaringan blockchain private UGM yang digunakan untuk testing.

---

## ⚙️ Konfigurasi Hardhat untuk BNPI

Tambahkan ke `hardhat.config.js`:

```js
bnpi: {
  url: "http://10.6.6.11:6102",
  chainId: 110261,
  accounts: ["PRIVATE_KEY_BNPI"]
}
```

---

## 🦊 Tambahkan Network BNPI ke MetaMask

| Field        | Value                                          |
| ------------ | ---------------------------------------------- |
| Network Name | BNPI Network                                   |
| RPC URL      | [http://10.6.6.11:6102](http://10.6.6.11:6102) |
| Chain ID     | 110261                                         |
| Symbol       | BPN                                            |

BNPI Faucet:

```
http://10.6.6.11:5000/claim
```

---

## 🚀 Deploy Kontrak ke BNPI

```
npx hardhat run scripts/deploy.js --network bnpi
```

Output:

```
SimpleNFT deployed to: 0xABC123...
```

Masukkan ke `main.js`:

```js
const CONTRACT_ADDRESS = "0xABC123...";
```

---

# 🔵 3. Deploy ke DChain Mainnet (Final Deployment)

DChain adalah mainnet publik yang digunakan untuk deployment final.

---

## ⚙️ Konfigurasi Hardhat untuk DChain

Tambahkan:

```js
dchain: {
  url: "https://mainnet.dchain.id",
  chainId: 17845,
  accounts: ["PRIVATE_KEY_DCHAIN"]
}
```

---

## 🦊 Tambahkan DChain ke MetaMask

| Field        | Value                                                  |
| ------------ | ------------------------------------------------------ |
| Network Name | DChain Mainnet                                         |
| RPC URL      | [https://mainnet.dchain.id](https://mainnet.dchain.id) |
| Chain ID     | 17845                                                  |
| Symbol       | DCH                                                    |

---

## 🚀 Deploy Kontrak ke DChain

```
npx hardhat run scripts/deploy.js --network dchain
```

Contoh output:

```
SimpleNFT deployed to: 0xC43baA...
```

Masukkan ke frontend:

```js
const CONTRACT_ADDRESS = "0xC43baA...";
```

Address akan **selalu berbeda setiap deploy**, jadi gunakan address final untuk presentasi.

---

# 🖼️ Preview NFT dari Metadata (IPFS)

Frontend melakukan:

1. `tokenURI(tokenId)` → ambil metadata JSON
2. Fetch JSON dari IPFS gateway
3. Ambil field `image`
4. Convert `ipfs://` → gateway HTTP
5. Render gambar + nama + deskripsi dalam card NFT

---

# 🏁 Kesimpulan

DApp ini mendukung:

* ✔ Localhost Hardhat (development)
* ✔ BNPI Network (testing)
* ✔ DChain Mainnet (final deployment)

Fitur utama:

* mint NFT
* upload metadata IPFS
* preview gambar NFT
* multi-network support

Aplikasi ini siap digunakan untuk demonstrasi dan laporan tugas blockchain.

```
```
