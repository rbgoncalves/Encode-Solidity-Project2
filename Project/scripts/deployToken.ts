import { ethers } from "ethers";
import { connectToBlockchain } from "./utils";
import MyTokenJson from "../artifacts/contracts/Token.sol/MyToken.json";
import prompt from "prompt";

const accountsPrompt: prompt.RevalidatorSchema = {
  name: "accountAddresses",
  description: "Account addresses",
  type: "array",
  required: true,
  minItems: 2,
  pattern: /^0x[a-fA-F0-9]{40}$/, // Sadly, this doesn't work with arrays
  message: "Address must be an ethereum address",
};

const votingPowerPrompt: prompt.RevalidatorSchema = {
  name: "votingPower",
  description: "Base voting power",
  type: "integer",
  required: true,
  minItems: 2,
};

async function main() {
  const signer = await connectToBlockchain();

  // *** Prompt information ***
  prompt.start();

  const { accountAddresses, votingPower } = (await prompt.get([
    accountsPrompt,
    votingPowerPrompt,
  ])) as {
    accountAddresses: string[];
    votingPower: number;
  };

  // *** Deploy Token contract ***
  const myTokenFactory = new ethers.ContractFactory(
    MyTokenJson.abi,
    MyTokenJson.bytecode,
    signer
  );

  const myTokenContract = await myTokenFactory.deploy();
  await myTokenContract.deployed();
  console.log(`Token contract deployed to ${myTokenContract.address}.`);

  // *** Mint tokens (vote power) for each of the accounts (voters)***
  await accountAddresses.forEach(async (address) => {
    const mintTx = await myTokenContract.mint(address, votingPower);
    await mintTx.wait();
  });

  console.log(
    `${accountAddresses.length} accounts successfully minted the base vote power of ${votingPower}.`
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
