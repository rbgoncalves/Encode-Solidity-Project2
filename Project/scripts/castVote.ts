import { Contract, ethers } from "ethers";
import prompt from "prompt";
import customBallotJson from "../artifacts/contracts/CustomBallot.sol/CustomBallot.json";
import { CustomBallot } from "../typechain";
import { connectToBlockchain, getBallotContract } from "./utils";

const proposalPrompt: prompt.RevalidatorSchema = {
  name: "proposalPosition",
  description: "Insert the position of the proposal you want to vote",
  type: "integer",
  required: true,
};

const voteAmountPrompt: prompt.RevalidatorSchema = {
  name: "voteAmount",
  description: "Vote amount",
  type: "integer",
  required: true,
};

async function main() {
  const ballotContractAddress = getBallotContract();
  const signer = await connectToBlockchain();

  const ballotContract = new Contract(
    ballotContractAddress,
    customBallotJson.abi,
    signer
  ) as CustomBallot;

  // *** Prompt information ***
  prompt.start();

  const { proposalPosition, voteAmount } = (await prompt.get([
    proposalPrompt,
    voteAmountPrompt,
  ])) as {
    proposalPosition: number;
    voteAmount: number;
  };

  const proposal = await ballotContract.proposals(proposalPosition);

  console.log(
    `Voting on proposal "${ethers.utils.parseBytes32String(
      proposal.name
    )}" (Position: ${proposalPosition}) with ${voteAmount} voting power.`
  );

  const tx = await ballotContract.vote(proposalPosition, voteAmount);
  console.log("Awaiting confirmation...");
  await tx.wait();
  console.log(`Transaction completed. Hash: ${tx.hash}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
