export async function vote(proposalId, optionIndex) {
    try {
        
        // async smart contract call
        console.log("proposalId: ", proposalId);
        console.log("optionIndex: ", optionIndex);

        return true

    } catch (error) {
        console.error("There was an error while trying to vote on proposal: ", error);
    }
}