import Head from 'next/head';
import { Box, Button, Stack, Typography } from '@mui/material';
import * as Yup from 'yup';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getProposal, vote } from 'src/utils/proposalTools';
import Loading from 'src/components/Loading';

const now = new Date();


const Page = () => {
  const router = useRouter();
  const { proposalId } = router.query;
  const [proposal, setProposal] = useState(null);

  useEffect(() => {
    fetchProposal(proposalId);
  }, [proposalId]);

  async function fetchProposal(proposalId) {
    const result = await getProposal(proposalId);
    console.log("result: ", result)
    setProposal(result);
  }
  
  function voteOnOption(optionIndex) {
    console.log("option index: ", optionIndex)
    vote(proposalId, optionIndex);
  }

  if (!proposal) return <Loading />

  return (
    <>
      <Head>
        <title>
          Create New Proposal
        </title>
      </Head>
      <Box
        sx={{
          flex: '1 1 auto',
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        <Box
          sx={{
            maxWidth: '80vw',
            px: 3,
            py: '100px',
            width: '100%'
          }}
        >
          <div>
            <Stack
              spacing={1}
              sx={{ mb: 3 }}
            >
              <Typography variant="h4">
                {proposal.title}
              </Typography>
              <Typography
                color="text.secondary"
                variant="body2"
              >
                {proposal.description}
              </Typography>
            </Stack>
            <Stack>
              Vote Count: {proposal.totalVotes}
            </Stack>
            <Stack>
              Voted Yes: {proposal.support}
            </Stack>
            <Stack spacing={3}>
            
              <Button
                onClick={() => voteOnOption(true)}
              >
                {"Yes"}
              </Button>

              <Button
                onClick={() => voteOnOption(false)}
              >
                {"No"}
              </Button>

            </Stack>
          </div>
        </Box>
      </Box>
    </>
  );
};

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
