import { Contract, ethers } from "ethers";
import customBallotJson from "../artifacts/contracts/CustomBallot.sol/CustomBallot.json";
import { CustomBallot } from "../typechain";
import { connectToBlockchain, getBallotContract } from "./utils";

async function main() {
  const ballotContractAddress = getBallotContract();
  const signer = await connectToBlockchain();

  const ballotContract = new Contract(
    ballotContractAddress,
    customBallotJson.abi,
    signer
  ) as CustomBallot;

  let index = 0;
  while (index !== -1) {
    try {
      const proposal = await ballotContract.proposals(index);
      const proposalName = ethers.utils.parseBytes32String(proposal.name);

      console.log(
        `Proposal ${index} has name ${proposalName} and ${proposal.voteCount} votes`
      );
      index++;
    } catch (e) {
      index = -1;
      break;
    }
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
