import Head from "next/head";
import {
  Box,
  Button,
  Checkbox,
  Container,
  Stack,
  FormControlLabel,
  TextField,
  Typography,
} from "@mui/material";
import * as Yup from "yup";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import CreateProposal from "src/components/CreateProposal";
import { createProposal } from "src/utils/proposalTools";

const now = new Date();

const Page = () => {
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      isFinancial: false,
      isFunctionCall: false,
      target: "",
      amount: "",
      functionName: "",
      args: "",
      submit: null,
    },
    validationSchema: Yup.object({
      title: Yup.string().max(80).required("Title is required."),
      description: Yup.string().max(500).required("Description is required"),
      isFinancial: Yup.bool(),
      target: Yup.string().length(42),
      amount: Yup.number(),
      isFunctionCall: Yup.bool(),
      functionName: Yup.string(),
      args: Yup.string(),
    }),
    onSubmit: async (values, helpers) => {
      try {
        console.log("Send button was pushed");
        // interact with contract
        router.push("/");
      } catch (err) {
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    },
  });

  async function createProposalStart() {
    await createProposal(
      formik.values.title,
      formik.values.isFinancial ? formik.values.target : "",
      formik.values.isFinancial ? Number(formik.values.amount) : 0,
      formik.values.isFunctionCall ? formik.values.functionName : "",
      formik.values.isFunctionCall ? formik.values.args : ""
    );
  }

  return (
    <>
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
              <Typography variant="h4">Create New Proposal</Typography>
              <Typography color="text.secondary" variant="body2">
                You can create a new proposal here &nbsp;
              </Typography>
            </Stack>
            <form noValidate onSubmit={formik.handleSubmit}>
              <Stack spacing={3}>
                <TextField
                  error={!!(formik.touched.name && formik.errors.name)}
                  fullWidth
                  helperText={formik.touched.name && formik.errors.name}
                  label="Title"
                  name="title"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.name}
                />

                <FormControlLabel
                  control={<Checkbox />}
                  // error={!!(formik.touched.isFinancial && formik.errors.isFinancial)}
                  label="Financial Proposal"
                  name="isFinancial"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.isFinancial}
                />

                {/* <Checkbox
                  error={!!(formik.touched.isFinancial && formik.errors.isFinancial)}
                  label="Financial Proposal"
                  name="isFinancial"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.isFinancial}
                /> */}
                {/* <p>Send money</p> */}

                {formik.values.isFinancial && (
                  <>
                    <TextField
                      error={!!formik.touched.target && formik.errors.target}
                      fullWidth
                      helperText={formik.touched.target && formik.errors.target}
                      label="Target Address"
                      name="target"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      value={formik.values.target}
                    />

                    <TextField
                      error={!!formik.touched.amount && formik.errors.amount}
                      fullWidth
                      helperText={formik.touched.amount && formik.errors.amount}
                      label="Amount"
                      name="amount"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      value={formik.values.amount}
                    />
                  </>
                )}
                <FormControlLabel
                  control={<Checkbox />}
                  // error={!!(formik.touched.isFinancial && formik.errors.isFinancial)}
                  helperText={formik.touched.isFunctionCall && formik.errors.isFunctionCall}
                  label="Function Call"
                  name="isFunctionCall"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.isFunctionCall}
                />
                {/* 
                <Checkbox
                // error={!!formik.values.isFunctionCall && formik.errors.isFunctionCall}
                // helperText={formik.touched.isFunctionCall && formik.errors.isFunctionCall}
                // label="Function Call"
                // name="isFunctionCall"
                // onBlur={formik.handleBlur}
                // onChange={formik.handleChange}
                // value={formik.values.isFunctionCall}
                />
                <p>Function Call</p> */}

                {formik.values.isFunctionCall && (
                  <>
                    <TextField
                      error={!!formik.touched.functionName && formik.touched.functionName}
                      fullWidth
                      helperText={formik.touched.functionName && formik.touched.functionName}
                      label="Function Name"
                      name="functionName"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      value={formik.values.functionName}
                    />

                    <TextField
                      error={!!formik.touched.args && formik.touched.args}
                      fullWidth
                      helperText={formik.touched.args && formik.touched.args}
                      label="Parameters"
                      name="args"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      value={formik.values.args}
                    />
                  </>
                )}
              </Stack>
              {formik.errors.submit && (
                <Typography color="error" sx={{ mt: 3 }} variant="body2">
                  {formik.errors.submit}
                </Typography>
              )}
              <Button onClick={() => createProposalStart()} variant="contained">
                Create
              </Button>
            </form>
          </div>
        </Box>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
