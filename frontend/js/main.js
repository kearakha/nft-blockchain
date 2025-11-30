console.log("MAIN.JS LOADED v2");

let provider;
let signer;

const CONTRACT_ADDRESS = "0x1831b95cC3e3fCaAb2939f14f4Eab224e03Dce15";

const ABI = [
  "function mint(string memory _tokenURI) public returns (uint256)",
  "function tokenCount() public view returns (uint256)",
  "function ownerOf(uint256 tokenId) public view returns (address)",
  "function tokenURI(uint256 tokenId) public view returns (string)"
];

let contract;

// ---------------------- CONNECT WALLET ------------------------
async function connectWallet() {
  if (!window.ethereum) {
    alert("MetaMask tidak terdeteksi.");
    return;
  }

  await window.ethereum.request({ method: "eth_requestAccounts" });

  provider = new ethers.providers.Web3Provider(window.ethereum);
  signer = provider.getSigner();

  const address = await signer.getAddress();

  // Update UI
  document.getElementById("status").textContent = "🟢 Wallet connected";
  document.getElementById("account").textContent = address;

  contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
}

document.getElementById("connectButton").addEventListener("click", connectWallet);

// ---------------------- MINT NFT ------------------------
async function mintNFT() {
  if (!contract) return alert("Hubungkan wallet dulu.");

  const tokenURI = document.getElementById("tokenURI").value.trim();
  if (!tokenURI) return alert("Masukkan Token URI!");

  try {
    const tx = await contract.mint(tokenURI);
    document.getElementById("mintResult").textContent = "⏳ Menunggu konfirmasi transaksi...";
    await tx.wait();
    document.getElementById("mintResult").textContent = "✅ NFT berhasil dimint!";
  } catch (err) {
    console.error(err);
    alert("Mint gagal: " + err.message);
  }
}

document.getElementById("mintButton").addEventListener("click", mintNFT);

// ---------------------- REFRESH NFTs ------------------------
async function refreshNFTs() {
  if (!contract) return alert("Hubungkan wallet dulu.");

  const list = document.getElementById("nftList");
  list.innerHTML = "";

  const count = await contract.tokenCount();
  const total = Number(count);

  if (total === 0) {
    list.innerHTML = "<li>Belum ada NFT</li>";
    return;
  }

  for (let id = 1; id <= total; id++) {
    try {
      const owner = await contract.ownerOf(id);
      const uri = await contract.tokenURI(id);

      const li = document.createElement("li");
      li.textContent = `#${id} — owner: ${owner} — uri: ${uri}`;
      list.appendChild(li);

    } catch (e) {
      console.log("NFT tidak ditemukan:", id);
    }
  }
}

document.getElementById("refreshButton").addEventListener("click", refreshNFTs);

