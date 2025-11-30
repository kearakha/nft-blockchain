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

  const grid = document.getElementById("nftGrid");
  grid.innerHTML = ""; // clear existing cards

  let countBN = await contract.tokenCount();
  const total = Number(countBN);

  if (total === 0) {
    grid.innerHTML = "<p style='color:#64748b;'>Belum ada NFT.</p>";
    return;
  }

  for (let id = 1; id <= total; id++) {
    // cek token exist
    try {
      await contract.callStatic.ownerOf(id);
    } catch {
      continue;
    }

    const owner = await contract.ownerOf(id);
    const rawURI = await contract.tokenURI(id);
    const metadataURL = ipfsToHttp(rawURI);

    let metadata;
    try {
      const res = await fetch(metadataURL);
      metadata = await res.json();
    } catch (err) {
      console.error("Gagal ambil metadata:", metadataURL);
      continue;
    }

    // image conversion
    const imageURL = ipfsToHttp(metadata.image);

    // create card
    const card = document.createElement("div");
    card.className = "nft-card";

    card.innerHTML = `
      <img src="${imageURL}" alt="NFT Image" onerror="this.src='https://via.placeholder.com/200?text=No+Image';">

      <div class="nft-card-content">
        <div class="nft-card-title">${metadata.name || "Untitled NFT"}</div>
        <div class="nft-card-desc">${metadata.description || ""}</div>
        <div class="nft-card-uri">URI:<br>${metadataURL}</div>
      </div>
    `;

    grid.appendChild(card);
  }
}


document.getElementById("refreshButton").addEventListener("click", refreshNFTs);

