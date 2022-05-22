# Custom Ballot project Report

## Deployed contracts

**Token Contract Address:** 0x68E4567Fc642Ac4BAAB9B2f2240bdBf29d3a6A01

**Token Contract Etherscan:** https://ropsten.etherscan.io/address/0x68E4567Fc642Ac4BAAB9B2f2240bdBf29d3a6A01

**Token Etherscan:** https://ropsten.etherscan.io/token/0x68E4567Fc642Ac4BAAB9B2f2240bdBf29d3a6A01

**Ballot Contract Address:** 0x403cCa677b662310ae83a19Cd4e4B6715227E46B

**Ballot Contract Etherscan:** https://ropsten.etherscan.io/address/0x403cCa677b662310ae83a19Cd4e4B6715227E46B


## Operations

### Deploy token

**Txn Hash:** 0x68E4567Fc642Ac4BAAB9B2f2240bdBf29d3a6A01

**Description:** Deploys token and mints base voting power to all the addresses

**Script:** 

`yarn ts-node scripts/deployToken.ts`

**Output:**

```
Using address 0x9DaB0ba7eC8630e01c6E26a4Df78DceEb20beac0
Wallet balance 14.956908470343784
prompt: Account addresses: 1:  0xd04cb6224dc6cbc58493228e1013029a7b568a10
prompt: Account addresses: 2:  0x9DaB0ba7eC8630e01c6E26a4Df78DceEb20beac0
prompt: Account addresses: 3:  (ctrl + c)
prompt: Base voting power:  10
Token contract deployed to 0x68E4567Fc642Ac4BAAB9B2f2240bdBf29d3a6A01.
Minting: 0xd04cb6224dc6cbc58493228e1013029a7b568a10
Minting: 0x9DaB0ba7eC8630e01c6E26a4Df78DceEb20beac0
2 accounts successfully minted the base vote power of 10.
```

------

### Delegate voting power

**Txn Hash:** 

**Description:** Delegates voting power to a giving address (defaults to signer's)

**Script:** 

`yarn ts-node scripts/delegateVotingPower.ts`

**Output:**

```
Using token contract: 0x68E4567Fc642Ac4BAAB9B2f2240bdBf29d3a6A01
Using address 0x9DaB0ba7eC8630e01c6E26a4Df78DceEb20beac0
Wallet balance 14.95047805577929
prompt: Delegate address (defaults to signer's):  (ENTER)
Awaiting confirmation...
Voting power delegated to 0x9DaB0ba7eC8630e01c6E26a4Df78DceEb20beac0. Transaction hash: 0x44f1b1850622ded1ff6f2caf8d26f8705dd8ac759b4dffa32a09ca0453723695
```

------

### Deploy ballot contract

**Txn Hash:** 0x403cCa677b662310ae83a19Cd4e4B6715227E46B

**Description:** Deploys a new ballot given a token contract and a set of proposals to be voted.

**Script:** 

`yarn ts-node scripts/deployBallot.ts`

**Output:**

```
Using token contract: 0x68E4567Fc642Ac4BAAB9B2f2240bdBf29d3a6A01
Using address 0x9DaB0ba7eC8630e01c6E26a4Df78DceEb20beac0
Wallet balance 14.950333341776973
Before proceeding, please make sure that the token holders already have the votes minted and delegated.
prompt: Proposal name: 1:  A
prompt: Proposal name: 2:  B
prompt: Proposal name: 3:  C
prompt: Proposal name: 4:  (ctrl + c)
Ballot contract deployed to 0x403cCa677b662310ae83a19Cd4e4B6715227E46B with the following proposals:
- A
- B
- C
```

------

### Cast vote

**Txn Hash:** 0x675b0bc2ebfc2ed320aca73900ca35aa2d8d3904046681c47489c9622851fe54

**Description:** Casts votes to a proposal, in the chosen amount (within available voting power).

**Script:** 

`yarn ts-node scripts/deployBallot.ts`

**Output:**

```
Using ballot contract: 0x403cCa677b662310ae83a19Cd4e4B6715227E46B
Using address 0x9DaB0ba7eC8630e01c6E26a4Df78DceEb20beac0
Wallet balance 14.949164397755933
prompt: Insert the position of the proposal you want to vote:  1
prompt: Vote amount:  3
Voting on proposal "B" (Position: 1) with 3 voting power.
Awaiting confirmation...
Transaction completed. Hash: 0x675b0bc2ebfc2ed320aca73900ca35aa2d8d3904046681c47489c9622851fe54
```

------

### Show voting power

**Txn Hash:** n/a

**Description:** Check the available and spent voting power

**Script:** 

`yarn ts-node scripts/votingPower.ts `

**Output:**

```
Using ballot contract: 0x403cCa677b662310ae83a19Cd4e4B6715227E46B
Using address 0x9DaB0ba7eC8630e01c6E26a4Df78DceEb20beac0
Wallet balance 14.949034776752736
0x9DaB0ba7eC8630e01c6E26a4Df78DceEb20beac0 has 7 voting power remaining, already spent 3.
```

------

### Show proposals

**Txn Hash:** n/a

**Description:** Show all proposals and its votes.

**Script:** 

`yarn ts-node scripts/getProposals.ts `

**Output:**

```
Using ballot contract: 0x403cCa677b662310ae83a19Cd4e4B6715227E46B
Using address 0x9DaB0ba7eC8630e01c6E26a4Df78DceEb20beac0
Wallet balance 14.948826852748647
Proposal 0 has name A and 5 votes
Proposal 1 has name B and 3 votes
Proposal 2 has name C and 1 votes
```

------

### Show winning proposal

**Txn Hash:** n/a

**Description:** Show current winning proposal.

**Script:** 

`yarn ts-node scripts/winningProposal.ts`

**Output:**

```
Using ballot contract: 0x403cCa677b662310ae83a19Cd4e4B6715227E46B
Using address 0x9DaB0ba7eC8630e01c6E26a4Df78DceEb20beac0
Wallet balance 14.948826852748647
The current winning proposal is "A".
```

