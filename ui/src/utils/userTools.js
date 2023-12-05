const CONTRACT_ADDRESS = "0xd4d0B560C569Ae2a11F70ed396938DF605F2654B";
const IDENTITY_CONTRACT_ADDRESS = "0x92B3d9e5bF1F61dF991Ef12bb56Cf057863a69E1";
const abi = require("../../../contract/abi/contracts/DaoContract.sol/DaoContract.json");
const identityAbi = require("../../../contract/abi/contracts/IdentityHandler.sol/IdentityHandler.json");
import { ethers } from "ethers";


export async function registerCitizen(citizenAddress) {
    try {
        
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, signer);

        const response = await contract.createAssignManagedRoleProposal(
            CONTRACT_ADDRESS,
            1,
            citizenAddress,
            604800          // 1 week
        );

        console.log(`TransactionResponse TX hash: ${response.hash}`);
        const receipt = await response.wait();
        if (receipt === null) {
            reject(new Error("ERROR! Transaction Receipt is null at createProposal"));
            return false;
        }
        console.log("Receipt: ", receipt);

        return true;

    } catch (error) {
        console.error("There was an error while trying to register the new citizen: ", error);
        return false;
    }
}

export async function stake(citizenAddress, amount) {
    try {
        
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(IDENTITY_CONTRACT_ADDRESS, identityAbi, signer);

        const response = await contract.stake(citizenAddress, amount);

        console.log(`TransactionResponse TX hash: ${response.hash}`);
        const receipt = await response.wait();
        if (receipt === null) {
            reject(new Error("ERROR! Transaction Receipt is null at createProposal"));
            return false;
        }
        console.log("Receipt: ", receipt);

        return true;

    } catch (error) {
        console.error("There was an error while trying to start staking: ", error);
        return false;
    }
}

export async function checkStakeBalance(citizenAddress) {
    try {

        const provider = new ethers.BrowserProvider(window.ethereum);
        const contract = new ethers.Contract(IDENTITY_CONTRACT_ADDRESS, identityAbi, provider);

        const rawResult = await contract.stakes(citizenAddress);
        console.log("rawResult: ", rawResult)
        return Number(rawResult);

    } catch (error) {
        console.log("There was an error while trying to get the stake balance for the user: ", error);
        return -1;
    }
}

export async function getMinimumStake() {
    try {

        const provider = new ethers.BrowserProvider(window.ethereum);
        const contract = new ethers.Contract(IDENTITY_CONTRACT_ADDRESS, identityAbi, provider);

        const rawResult = await contract.requiredStakeAmount();
        return Number(rawResult);

    } catch (error) {
        console.error("There was an error while trying to get the minimum stake: ", error);
    }
}