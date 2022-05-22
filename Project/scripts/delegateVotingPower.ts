import { Contract } from "ethers";
import prompt from "prompt";
import myTokenJson from "../artifacts/contracts/Token.sol/MyToken.json";
import { MyToken } from "../typechain";
import { connectToBlockchain, getTokenContract } from "./utils";

const delegateAddressPrompt: prompt.RevalidatorSchema = {
  name: "delegateAddress",
  description: "Delegate address (defaults to signer's)",
  type: "string",
  required: false,
  pattern: /^0x[a-fA-F0-9]{40}$/,
  message: "Address must be an ethereum address",
};

async function main() {
  prompt.start();

  const tokenContractAddress = getTokenContract();
  const signer = await connectToBlockchain();

  const { delegateAddress } = (await prompt.get([delegateAddressPrompt])) as {
    delegateAddress: string;
  };

  const myTokenContract = new Contract(
    tokenContractAddress,
    myTokenJson.abi,
    signer
  ) as MyToken;

  const tx = await myTokenContract.delegate(delegateAddress || signer.address);
  console.log("Awaiting confirmation...");

  const receipt = await tx.wait();

  console.log(
    `Voting power delegated to ${signer.address}. Transaction hash: ${receipt.transactionHash}`
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
