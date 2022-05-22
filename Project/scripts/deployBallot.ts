import { ethers } from "ethers";
import {
  connectToBlockchain,
  convertStringArrayToBytes32,
  getTokenContract,
} from "./utils";
import CustomBallot from "../artifacts/contracts/CustomBallot.sol/CustomBallot.json";
import prompt from "prompt";

const proposalsPrompt: prompt.RevalidatorSchema = {
  name: "proposals",
  description: "Proposal name",
  type: "array",
  required: true,
};

async function main() {
  const tokenContractAddress = getTokenContract();
  const signer = await connectToBlockchain();

  // *** Prompt information ***
  prompt.start();

  console.log(
    "Before proceeding, please make sure that the token holders already have the votes minted and delegated."
  );

  const { proposals } = (await prompt.get([proposalsPrompt])) as {
    proposals: string[];
  };

  const ballotFactory = new ethers.ContractFactory(
    CustomBallot.abi,
    CustomBallot.bytecode,
    signer
  );

  const ballotContract = await ballotFactory.deploy(
    convertStringArrayToBytes32(proposals),
    tokenContractAddress
  );
  await ballotContract.deployed();

  console.log(
    `Ballot contract deployed to ${ballotContract.address} with the following proposals:`
  );
  proposals.forEach((proposal) => {
    console.log(`- ${proposal}`);
  });
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
