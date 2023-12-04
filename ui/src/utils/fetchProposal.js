const mockProposals = {
    "22": {
      title: "The Proposal Title",
      description: "The proposal description"
    }
  }

  export async function getProposal(proposalId) {
    try {
        
        return mockProposals[proposalId];
    } catch (error) {
        console.error("There was an error while trying to fetch the proposal");
    }
  }