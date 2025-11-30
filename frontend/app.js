// Minimal frontend using ethers.js v6
const CONTRACT_ADDRESS = "0x1831b95cC3e3fCaAb2939f14f4Eab224e03Dce15"; // will be replaced by user after deploy
const ABI = [
  // Minimal ABI for functions used: mint, tokenCount, balanceOf, tokenOfOwnerByIndex not available in ERC721URIStorage by default
  // We'll use ownerOf and tokenURI and iterate token ids from 1..tokenCount
  "function mint(string _tokenURI) returns (uint256)",
  "function tokenCount() view returns (uint256)",
  "function ownerOf(uint256 tokenId) view returns (address)",
  "function tokenURI(uint256 tokenId) view returns (string)"
];

let provider, signer, contract;

async function connectWallet() {
  if (!window.ethereum) {
    alert("MetaMask not detected. Please install MetaMask.");
    return;
  }
  provider = new ethers.BrowserProvider(window.ethereum);
  await provider.send("eth_requestAccounts", []);
  signer = await provider.getSigner();
  const account = await signer.getAddress();
  document.getElementById("account").textContent = account;
  document.getElementById("connectButton").textContent = "Connected";
  initContract();
}

function initContract() {
  if (!CONTRACT_ADDRESS || CONTRACT_ADDRESS.includes("PUT_DEPLOYED_ADDRESS_HERE")) {
    document.getElementById("mintResult").textContent = "Please deploy contract and paste address into app.js -> CONTRACT_ADDRESS";
    return;
  }
  contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
}

async function mint() {
  const uri = document.getElementById("tokenURI").value.trim();
  if (!uri) { alert("Enter token URI"); return; }
  try {
    const tx = await contract.mint(uri);
    document.getElementById("mintResult").textContent = "Mint transaction sent. Waiting for confirmation...";
    const receipt = await tx.wait();
    document.getElementById("mintResult").textContent = "Minted! Transaction: " + receipt.transactionHash;
  } catch (e) {
    console.error(e);
    alert("Mint failed: " + (e.message || e));
  }
}

async function refreshNFTs() {
  if (!contract) { initContract(); if (!contract) return; }
  const count = await contract.tokenCount();
  const n = Number(count);
  const list = document.getElementById("nftList");
  list.innerHTML = "";
  for (let i=1;i<=n;i++) {
    try {
      const owner = await contract.ownerOf(i);
      const uri = await contract.tokenURI(i);
      const li = document.createElement("li");
      li.textContent = `#${i} — owner: ${owner} — uri: ${uri}`;
      list.appendChild(li);
    } catch (e) {
      // token might not exist
    }
  }
}

document.getElementById("connectButton").addEventListener("click", connectWallet);
document.getElementById("mintButton").addEventListener("click", mint);
document.getElementById("refreshButton").addEventListener("click", refreshNFTs);
