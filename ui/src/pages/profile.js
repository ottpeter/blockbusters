import Head from "next/head";
import { useEffect, useState } from "react";
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Box,
  Container,
  Stack,
  Typography,
  Unstable_Grid2 as Grid,
} from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { AccountProfileDetails } from "src/sections/account/account-profile-details";
import { useAccount, useBalance } from "wagmi";
import { fetchBalance } from "@wagmi/core";

const user = {
  avatar: "/assets/avatars/avatar-fran-perez.png",
  city: "Los Angeles",
  country: "USA",
  name: "Anika Visser",
};

const Page = () => {
  const { address, isConnecting, isDisconnected } = useAccount();

  // const { data, isError, isLoading } = useBalance({
  //   address: "0x295cb76a5a54072d03b9aa9a3bd47c5175ce1047",
  // });

  // const balance = fetchBalance({
  //   address: "0x295cb76a5a54072d03b9aa9a3bd47c5175ce1047",
  // });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const result = await useBalanceApi({ address });
        console.log("balance");

        const balance = await fetchBalance({
          address: "0x295CB76a5A54072d03B9Aa9A3bd47c5175ce1047",
        });
        console.log(balance ? balance : "balance");

        // setData(result.data);
        // setIsError(result.isError);
        // setIsLoading(result.isLoading);
      } catch (error) {
        console.error("Error fetching balance:", error);
        setIsError(true);
      }
    };

    fetchData();
  }, [address]);

  // if (isLoading) {
  //   return (
  //     <Typography color="text.secondary" variant="body2">
  //       Fetching balance…
  //     </Typography>
  //   );
  // }
  // if (isError)
  //   return (
  //     <Typography color="text.secondary" variant="body2">
  //       Error fetching balance
  //     </Typography>
  //   );

  if (isConnecting)
    return (
      <Typography color="text.secondary" variant="body2">
        Connecting…
      </Typography>
    );
  if (isDisconnected)
    return (
      <Typography color="text.secondary" variant="body2">
        Disconnected
      </Typography>
    );

  return (
    <>
      <Head>
        <title>Profile</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="lg">
          <Stack spacing={3}>
            <div>
              <Typography variant="h4">My Profile</Typography>
            </div>
            <div>
              <Grid container spacing={3}>
                <Grid xs={12} md={6} lg={6}>
                  <Card>
                    <CardContent>
                      <Box
                        sx={{
                          alignItems: "center",
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <Avatar
                          src={user.avatar}
                          sx={{
                            height: 80,
                            mb: 2,
                            width: 80,
                          }}
                        />
                        <Typography gutterBottom variant="h5">
                          {user.name}
                        </Typography>
                        <Typography color="text.secondary" variant="body2">
                          {address}
                        </Typography>
                        {/* <Typography color="text.secondary" variant="body2">
                          Balance: {data?.formatted} {data?.symbol}
                        </Typography> */}
                        <Typography color="text.secondary" variant="body2">
                          {user.city} {user.country}
                        </Typography>
                      </Box>
                    </CardContent>
                    <Divider />
                    <CardActions>
                      <Button fullWidth variant="text">
                        Upload picture
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
                {/* <Grid xs={12} md={6} lg={8}>
                  <AccountProfileDetails />
                </Grid> */}
              </Grid>
            </div>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
