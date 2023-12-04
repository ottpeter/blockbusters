import Head from 'next/head';
import { Box, Button, Container, Stack, SvgIcon, TextField, Typography } from '@mui/material';
import * as Yup from 'yup';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';

const now = new Date();


const Page = () => {
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      submit: null
    },
    validationSchema: Yup.object({
      title: Yup
        .string()
        .max(80)
        .required('Title is required.'),
      description: Yup
        .string()
        .max(500)
        .required('Description is required'),
    }),
    onSubmit: async (values, helpers) => {
      try {
        console.log("Send button was pushed");
        // interact with contract
        router.push('/');
      } catch (err) {
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    }
  });

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
                Create New Proposal
              </Typography>
              <Typography
                color="text.secondary"
                variant="body2"
              >
                You can create a new proposal here
                &nbsp;
              </Typography>
            </Stack>
            <form
              noValidate
              onSubmit={formik.handleSubmit}
            >
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
                <TextField
                  error={!!(formik.touched.email && formik.errors.email)}
                  fullWidth
                  multiline
                  minRows={12}
                  helperText={formik.touched.email && formik.errors.email}
                  label="Description"
                  name="description"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.email}
                />
              </Stack>
              {formik.errors.submit && (
                <Typography
                  color="error"
                  sx={{ mt: 3 }}
                  variant="body2"
                >
                  {formik.errors.submit}
                </Typography>
              )}
              <Button
                fullWidth
                size="large"
                sx={{ mt: 3 }}
                type="submit"
                variant="contained"
              >
                Continue
              </Button>
            </form>
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
