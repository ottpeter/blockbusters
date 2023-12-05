import { useCallback, useEffect, useState } from "react";
import Head from "next/head";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import {
  Box,
  Button,
  Container,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  TextField,
  Stack,
  Unstable_Grid2 as Grid,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { checkStakeBalance, getMinimumStake, stake } from "src/utils/userTools";
import { getAddress } from "src/utils/getAddress";
import { formatEther } from "viem";

const Page = () => {
  const [address, setAddress] = useState("");

  const formik = useFormik({
    initialValues: {
      address: "0x000000000",
      stakeAmount: "0",
      submit: null,
    },
    validationSchema: Yup.object({
      address: Yup.string().max(255).required("Address is required"),
      stakeAmount: Yup.number(),
    }),
    onSubmit: async (values, helpers) => {
      console.log("submit");
      try {
        console.log(values, "vals");
        // await auth.signUp(values.address, values.stakeAmount);
        // router.push("/");
      } catch (err) {
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    },
  });

  useEffect(() => {
    addressGetter();
  }, []);

  async function addressGetter() {
    const res = await getAddress();
    setAddress(res);
  }

  async function startStaking() {
    checkStakeBalance(address);

    const result = await stake(address, formatEther(100000000000000000000n));
    // We can stake, we can check minimum stake, we can check the stake amount for a user
    const minimum = await getMinimumStake();
    console.log("Minimum: ", minimum)
  }


  return (
    <>
      <Head>
        <title>Add Citizen</title>
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
              <Grid container spacing={3}>
                <Grid xs={12} md={6} lg={8}>
                  <form autoComplete="off" noValidate onSubmit={formik.handleSubmit}>
                    <Card>
                      <CardHeader subheader="Register new citizen" title="Add citizen" />
                      <CardContent sx={{ pt: 0 }}>
                        <Box sx={{ m: -1.5 }}>
                          <Grid container spacing={3}>
                            <Grid xs={12} md={6}>
                              <TextField
                                fullWidth
                                error={!!(formik.touched.address && formik.errors.address)}
                                helperText={formik.touched.address && formik.errors.address}
                                label="Address"
                                name="address"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.address}
                              />
                            </Grid>
                            <Grid xs={12} md={6}>
                              <TextField
                                fullWidth
                                label="Stake amount"
                                name="stakeAmount"
                                type="number"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                value={formik.values.stakeAmount}
                              />
                            </Grid>
                          </Grid>
                        </Box>
                      </CardContent>
                      <CardActions sx={{ justifyContent: "flex-end" }}>
                        
                        <Button onClick={() => startStaking()}>
                          Stake
                        </Button>
                        
                        <Button type="submit" variant="contained">
                          Save citizen
                        </Button>
                      </CardActions>
                    </Card>
                  </form>
                </Grid>
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
