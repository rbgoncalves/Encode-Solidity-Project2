import { ethers } from "ethers";
import "dotenv/config";

export async function connectToBlockchain() {
  const wallet = new ethers.Wallet(
    process.env.PRIVATE_KEY as ethers.utils.BytesLike
  );

  console.log(`Using address ${wallet.address}`);

  const provider = ethers.providers.getDefaultProvider("ropsten", {
    etherscan: process.env.ETHERSCAN_API_KEY,
  });

  const signer = await wallet.connect(provider);
  const balanceBN = await signer.getBalance();
  const balance = Number(ethers.utils.formatEther(balanceBN));

  console.log(`Wallet balance ${balance}`);

  if (balance < 0.01) {
    throw new Error("Not enough ether");
  }

  return signer;
}

export function convertStringArrayToBytes32(stringArray: string[]) {
  return stringArray.map(ethers.utils.formatBytes32String);
}

export function getArg(position: number, errorMsg: string) {
  if (process.argv.length < position + 1) throw new Error(errorMsg);
  return process.argv[position];
}

export function getBallotContract() {
  const ballotContractAddress =
    process.env.BALLOT_CONTRACT_ADDRESS ||
    getArg(2, "Ballot contract address is required");

  if (!ballotContractAddress.match(/^0x[a-fA-F0-9]{40}$/)) {
    throw new Error(
      `Address "${ballotContractAddress}" must be an ethereum address`
    );
  }

  console.log(`Using ballot contract: ${ballotContractAddress}`);

  return ballotContractAddress;
}

export function getTokenContract() {
  const tokenContractAddress =
    process.env.TOKEN_CONTRACT_ADDRESS ||
    getArg(2, "Token contract address is required");

  if (!tokenContractAddress.match(/^0x[a-fA-F0-9]{40}$/)) {
    throw new Error(
      `Address "${tokenContractAddress}" must be an ethereum address`
    );
  }
  console.log(`Using token contract: ${tokenContractAddress}`);

  return tokenContractAddress;
}
