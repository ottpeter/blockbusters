import { Button } from '@mui/material';
import React from 'react'
import useDebounce from 'src/utils/useDebounce';
import { useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi';
const abi = require('../../../abi/DaoContract.json');
const DAO_CONTRACT_ADDRESS = '0xF8F6871ACa4529e7B6e1c5D3313070d48306A460';


export default function CreateProposal() {
    console.log("abi: ", abi)
    const debouncedTokenId = useDebounce("tokenId", 500);
    const { config } = usePrepareContractWrite({
        address: DAO_CONTRACT_ADDRESS,
        abi: abi,
        functionName: 'getProposal',
        args: [
            1,
            "First Proposal",
            "0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2",
            1,
            "",
            "",
            21600
            //parseInt(debouncedTokenId)
        ],
        enabled: Boolean(debouncedTokenId),
    });
    console.log("Config: ", config)
    const { data, write } = useContractWrite(config);
    
    const { isLoading, isSuccess } = useWaitForTransaction({
        hash: data?.hash,
    });

    return (
        <div>
            {write ? "yes": "no"}
            <Button
                disabled={!write || isLoading} onClick={() => write()}
                fullWidth
                size="large"
                sx={{ mt: 3 }}
                type="submit"
                variant="contained"
                >
                    Create
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
