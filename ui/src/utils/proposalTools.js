const mockProposals = {
    "22": {
      title: "The Proposal Title",
      description: "The proposal description"
    }
}

const mockProposalList = [
  {
    id: "22",
    title: "The Proposal Title",
    description: "The proposal description",
    options: [
      {
          name: "First Option",
          index: 1
      },{
          name: "Second Option",
          index: 2
      },{
          name: "Third Option",
          index: 3
      }
    ]
  },
  {
    id: "23",
    title: "Second Proposal",
    description: "This is the second proposal",
    options: [
      {
          name: "First Option",
          index: 1
      },{
          name: "Second Option",
          index: 2
      }
    ]
  },
  {
    id: "24",
    title: "Third Proposal",
    description: "The third proposal",
    options: [
      {
          name: "First Option",
          index: 1
      },{
          name: "Second Option",
          index: 2
      },{
          name: "Third Option",
          index: 3
      }
    ]
  },
]


export async function getProposal(proposalId) {
  try {
      
      return mockProposals[proposalId];
  } catch (error) {
      console.error("There was an error while trying to fetch the proposal");
  }
}

export async function getProposals(fromIndex, count) {
  try {
    
    // async
    return mockProposalList
    
  } catch (error) {
    console.error(`There was an error while trying to fetch the proposals, fromIndex: ${fromIndex}, count: ${count}`, error);
  }
}