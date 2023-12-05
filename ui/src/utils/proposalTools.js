const CONTRACT_ADDRESS = "0xd4d0B560C569Ae2a11F70ed396938DF605F2654B";
const abi = require("../../../contract/abi/contracts/DaoContract.sol/DaoContract.json");
import { ethers } from "ethers";


export async function getProposal(proposalId) {
  try {
      
    const provider = new ethers.BrowserProvider(window.ethereum);
    const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, provider);

    
    const rawResult = await contract.getProposal(proposalId);
    const uint8Array = new Uint8Array(rawResult[5].match(/.{1,2}/g).map(byte => parseInt(byte, 16)));
    const textDecoder = new TextDecoder();

    const resultObj = {
      description: textDecoder.decode(uint8Array),
      target: rawResult[2],
      amount: rawResult[3],
      support: Number(rawResult[6]),
      totalVotes: Number(rawResult[7]),
      executed: rawResult[8],
      title: rawResult[1],
      executionSuccess: rawResult[10],
      id: proposalId
    }

    return resultObj;
  } catch (error) {
      console.error("There was an error while trying to fetch the proposal", error);
  }
}

export async function getProposals(fromIndex, count) {
  try {

    const provider = new ethers.BrowserProvider(window.ethereum);
    const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, provider);


    // Always has to start with 0
    const result = await contract.getProposals(0, 1000)
      .then((proposalArray) => {
        console.log(proposalArray)
        const proposals = proposalArray.map((rawProposal, index) => {
          const uint8Array = new Uint8Array(rawProposal[5].match(/.{1,2}/g).map(byte => parseInt(byte, 16)));
          const textDecoder = new TextDecoder();

          return {
            description: textDecoder.decode(uint8Array),
            target: rawProposal[2],
            amount: rawProposal[3],
            support: rawProposal[6],
            totalVotes: rawProposal[7],
            executed: rawProposal[8],
            title: rawProposal[1],
            executionSuccess: rawProposal[10],
            id: index
          }
        });
        return proposals
      })
      
  console.log("r ",result)
  return result;
    
    
  } catch (error) {
    console.error(`There was an error while trying to fetch the proposals, fromIndex: ${fromIndex}, count: ${count}`, error);
  }
}

export async function createProposal(title, target, amount, functionName, functionArgs) {
  try {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, signer);
    const textEncoder = new TextEncoder();
console.log("target: ", target)

    const response = await contract.createProposal(
      (target || functionName) ? 2 : 1,               // Text proposal if neither target nor functionName
      title,
      target ? target : ethers.ZeroAddress,
      amount,
      functionName ? textEncoder.encode(functionName): "0x",               // Represents an empty bytes array
      functionArgs ? textEncoder.encode(functionArgs): "0x",
      21600
    );
    console.log(`TransactionResponse TX hash: ${response.hash}`);
    const receipt = await response.wait();
    if (receipt === null) {
      reject(new Error("ERROR! Transaction Receipt is null at createProposal"));
      return;
    }
    console.log("Receipt: ", receipt);

  } catch (error) {
    console.error("There was an error while trying to create proposal ", error);
  }
}

export async function vote(proposalId, option) {
  try {
      
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, signer);

    const response = await contract.voteOnProposal(proposalId, option);
    console.log(`TransactionResponse TX hash: ${response.hash}`);

    const receipt = await response.wait();
    if (receipt === null) {
      reject(new Error("ERROR! Transaction Receipt is null at createProposal"));
      return;
    }
    console.log("Receipt: ", receipt);

    return true;

  } catch (error) {
    console.error("There was an error while trying to vote on proposal: ", error);
    return false;
  }
}