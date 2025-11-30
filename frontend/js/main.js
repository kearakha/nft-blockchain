console.log("MAIN.JS LOADED v2");

let provider;
let signer;

const CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

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

function ipfsToHttp(url) {
  if (!url) return "";
  if (url.startsWith("ipfs://")) {
    return "https://gateway.pinata.cloud/ipfs/" + url.slice(7);
  }
  return url;
}


// ---------------------- REFRESH NFTs ------------------------
async function refreshNFTs() {
  if (!contract) {
    alert("Hubungkan wallet dulu.");
    return;
  }

  const list = document.getElementById("nftList");
  list.innerHTML = "";

  let countBN = await contract.tokenCount();
  const total = Number(countBN);

  if (total === 0) {
    list.innerHTML = "<li>Belum ada NFT</li>";
    return;
  }

  for (let id = 1; id <= total; id++) {
    try {
      // Cek token exist
      await contract.callStatic.ownerOf(id);
    } catch {
      continue;
    }

    const owner = await contract.ownerOf(id);
    const rawURI = await contract.tokenURI(id);
    const metadataURL = ipfsToHttp(rawURI);

    // --- Fetch metadata JSON ---
    let metadata;
    try {
      const res = await fetch(metadataURL);
      metadata = await res.json();
    } catch (err) {
      console.error("Gagal fetch metadata:", metadataURL);
      continue;
    }

    // --- Ambil image ---
    const imageURL = ipfsToHttp(metadata.image);

    // --- Render ke UI ---
    const item = document.createElement("li");
    item.style.marginBottom = "14px";
    item.innerHTML = `
      <div style="border:1px solid #ddd;padding:10px;border-radius:8px;">
        <strong>#${id}</strong><br>
        Owner: ${owner}<br>
        URI: ${metadataURL}<br><br>
        <img src="${imageURL}" style="max-width:200px;border-radius:8px;" />
      </div>
    `;

    list.appendChild(item);
  }
}

document.getElementById("refreshButton").addEventListener("click", refreshNFTs);

