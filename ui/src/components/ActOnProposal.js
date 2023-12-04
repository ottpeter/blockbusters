import { Button } from '@mui/material';
import React from 'react';
import { useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi';
const abi = require('../../../abi/DaoContract.json');
const DAO_CONTRACT_ADDRESS = '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2';

export default function ActOnProposal({proposalAction}) {
    const label = proposalAction ? "Yes" : "No";

    const { config } = usePrepareContractWrite({
        address: DAO_CONTRACT_ADDRESS,
        abi: abi,
        functionName: 'getProposal',
    });
    const { data, write } = useContractWrite(config);
    
    const { isLoading, isSuccess } = useWaitForTransaction({
        hash: data?.hash,
    });


    return (
        <div>
        <Button disabled={!write || isLoading} onClick={() => write()}>
            {isLoading ? 'Processing...' : label}
        </Button>
        
        {isSuccess && (
            <div>
            Successfully minted your NFT!
                <div>
                    <a href={`https://etherscan.io/tx/${data?.hash}`}>Etherscan</a>
                </div>
            </div>
        )}
        </div>
    )
}
