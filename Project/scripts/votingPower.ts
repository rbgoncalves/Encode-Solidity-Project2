import { Contract } from "ethers";
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

  const votingPower = await ballotContract.votingPower(signer.address);
  const spentVotePower = await ballotContract.spentVotePower(signer.address);
  console.log(
    `${signer.address} has ${votingPower} voting power remaining, already spent ${spentVotePower}.`
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
