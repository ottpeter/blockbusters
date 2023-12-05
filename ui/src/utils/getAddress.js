import { ethers } from "ethers";

export async function getAddress() {
    try {
        if (window.ethereum) {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const ownAddress = await signer.getAddress();

            console.log("Ethereum address: ", ownAddress);

            return ownAddress;

        } else {
            console.error('MetaMask is not installed or not detected.');
            return null;
        }
    } catch (error) {
        console.error("There was an error while trying to get the address: ", error);
    }
}