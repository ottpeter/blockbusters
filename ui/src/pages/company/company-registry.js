import Head from "next/head";
import { useState, useEffect } from "react";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import {
  Box,
  Button,
  Container,
  Pagination,
  Stack,
  SvgIcon,
  Typography,
  Unstable_Grid2 as Grid,
} from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { CompanyCard } from "src/sections/companies/company-card";
import { CompaniesSearch } from "src/sections/companies/companies-search";
import { getCompanies } from "src/utils/fetchCompanies";
import { useRouter } from "next/navigation";

const Page = () => {
  const [companies, setCompanies] = useState(null);
  const router = useRouter();

  useEffect(() => {
    fetchCompanies();
  }, []);

  async function fetchCompanies() {
    const result = await getCompanies();
    console.log("result: ", result);
    setCompanies(result);
  }

  const navigateToCreateCompany = () => {
    router.push("/company/create-company");
  };

  return (
    <>
      <Head>
        <title>Company Registry</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack direction="row" justifyContent="space-between" spacing={4}>
              <Stack spacing={1}>
                <Typography variant="h4">Companies</Typography>
              </Stack>
              <div>
                <Button
                  startIcon={
                    <SvgIcon fontSize="small">
                      <PlusIcon />
                    </SvgIcon>
                  }
                  onClick={navigateToCreateCompany}
                  variant="contained"
                >
                  Create Company
                </Button>
              </div>
            </Stack>
            <CompaniesSearch />
            <Grid container spacing={3}>
              {companies &&
                companies.map((company) => (
                  <Grid xs={12} md={6} lg={4} key={company.id}>
                    <CompanyCard company={company} />
                  </Grid>
                ))}
            </Grid>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Pagination count={3} size="small" />
            </Box>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
