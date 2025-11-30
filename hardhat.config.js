require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.20",
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545"
    },

    bnpi: {
      url: "http://10.6.6.11:6102",   // RPC BNPI
      chainId: 110261,                // Chain ID BNPI
      accounts: [
        "0xf8e55a7311b7939e1af66b4675f0a55053ef21420c3371e1292b462b8b1eae09"
      ],
      gas: "auto",
      gasPrice: "auto"
    },
    
    dchain: {
        url: "https://mainnet.dchain.id",   // RPC DChain
        chainId: 17845,                 // contoh — ganti sesuai chainId DChain
        accounts: [
            "0xf8e55a7311b7939e1af66b4675f0a55053ef21420c3371e1292b462b8b1eae09"
            ],
        gas: "auto",
        gasPrice: "auto"
    }
  }
};

