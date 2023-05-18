const axios = require("axios");
const niceList = require("../utils/niceList.json");
const MerkleTree = require("../utils/MerkleTree");

const serverUrl = "http://localhost:1225";

/**
 * Main function that takes a name as a command line argument and sends a gift request to a server
 */
async function main() {
  // Get command line arguments
  const args = process.argv.slice(2);

  // Check if name argument is provided
  if (args.length < 1) {
    console.error("Usage: node index.js [name]");
    process.exit(1);
  }

  // Get name argument and trim any whitespace
  const name = args[0].trim();

  // Create a Merkle tree from a pre-defined list
  const merkleTree = new MerkleTree(niceList);

  // Get the Merkle tree root
  const root = merkleTree.getRoot();

  // Find the index of the provided name in the pre-defined list
  const index = niceList.findIndex((n) => n === name);

  // Get the Merkle tree proof for the provided name
  const proof = merkleTree.getProof(index);

  // Send a gift request to the server with the provided name, Merkle tree proof, and root
  const { data: gift } = await axios.post(`${serverUrl}/gift`, {
    name,
    proof,
    root,
  });

  console.log({ gift });
}

main();
