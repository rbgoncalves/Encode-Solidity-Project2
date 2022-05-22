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

  const winnerNameBytes32 = await ballotContract.winnerName();
  const winnerName = ethers.utils.parseBytes32String(winnerNameBytes32);

  console.log(`The current winning proposal is "${winnerName}".`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
