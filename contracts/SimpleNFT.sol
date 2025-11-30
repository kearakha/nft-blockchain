// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract SimpleNFT is ERC721URIStorage, Ownable {
    uint256 public tokenCount;
    uint256 public mintPrice = 0; // for demo; set >0 if you want payable mints

    event Minted(address indexed owner, uint256 tokenId, string tokenURI);

    constructor() ERC721("SimpleNFT", "SNFT") {}

    function mint(string memory _tokenURI) public returns (uint256) {
        tokenCount += 1;
        uint256 newTokenId = tokenCount;
        _safeMint(msg.sender, newTokenId);
        _setTokenURI(newTokenId, _tokenURI);
        emit Minted(msg.sender, newTokenId, _tokenURI);
        return newTokenId;
    }
}
