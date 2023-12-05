import Head from "next/head";
import {
  Box,
  Button,
  Grid,
  LinearProgress,
  Typography,
  Container,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  TextField,
  Stack,
} from "@mui/material";
import * as Yup from "yup";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getProposal, vote } from "src/utils/proposalTools";
import Loading from "src/components/Loading";

const now = new Date();

const Page = () => {
  const router = useRouter();
  const { proposalId } = router.query;
  const [proposal, setProposal] = useState(null);
  const [percentage, setPercentage] = useState(null);
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    fetchProposal(proposalId);
  }, [proposalId, refresh]);

  async function fetchProposal(proposalId) {
    const result = await getProposal(proposalId);
    console.log("result: ", result);
    setProposal(result);
    const perc = result.totalVotes === 0 ? 0 : (result.support / result.totalVotes) * 100;
    setPercentage(perc);
  }

  async function voteOnOption(optionIndex) {
    console.log("option index: ", optionIndex);
    await vote(proposalId, optionIndex);
    setRefresh(refresh + 1);
  }

  if (!proposal) return <Loading />;

  return (
    <>
      <Container maxWidth="lg">
        <Stack spacing={3}>
          <div>
            <Grid container spacing={3}>
              <Grid xs={12} md={6} lg={8}>
                <Head>
                  <title>Create New Proposal</title>
                </Head>
                <Box
                  sx={{
                    flex: "1 1 auto",
                    alignItems: "center",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <Box
                    sx={{
                      maxWidth: "80vw",
                      px: 3,
                      py: "100px",
                      width: "100%",
                    }}
                  >
                    <div>
                      <Stack spacing={1} sx={{ mb: 3 }}>
                        <Typography variant="h4">{proposal.title}</Typography>
                      </Stack>
                      <Stack spacing={3} marginBottom={2}>
                        <Typography variant="body1" align="center">
                          {`${proposal.support} Yes / ${proposal.totalVotes} Total Votes`}
                        </Typography>

                        <LinearProgress variant="determinate" value={percentage} />
                      </Stack>
                      <Stack spacing={3}>
                        <Button
                          color="success"
                          variant="contained"
                          onClick={() => voteOnOption(true)}
                        >
                          {"Yes"}
                        </Button>

                        <Button
                          color="error"
                          variant="contained"
                          onClick={() => voteOnOption(false)}
                        >
                          {"No"}
                        </Button>
                      </Stack>
                    </div>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </div>
        </Stack>
      </Container>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
