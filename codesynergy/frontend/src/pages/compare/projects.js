import Head from 'next/head';
import {
  Box,
  Container,
  Stack,
  Typography,
  TextField,
  Unstable_Grid2 as Grid
} from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { Overview } from 'src/sections/projects/project-overview';
import { ChartsGhaphs } from 'src/sections/projects/project-charts-graphs';

import { Select } from 'src/sections/projects/project-select';


import { OpenSource } from 'src/contexts/context';
import { useContext } from "react";

const Page = () => {
  const { data } = useContext(OpenSource);
  console.log("MENSAGEM DO PRIMEIRO COMPONENTE", data)

  console.log("PROJETO SELECIONADO", data?.project)
  console.log("PROJETOS DISPONÍVEIS", data?.projects)

  return (

    <Box>

      <Head>
        <title>
          Code Synergy
        </title>
      </Head>


      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth="xl">

          <Stack spacing={3}>
            <Stack
              direction="row"
              justifyContent="space-between"
              spacing={4}
            >
              <Stack spacing={1}>
                <Typography variant="h4">
                  Compare Projects
                </Typography>
              </Stack>
              {/* <div>
                <Button
                  startIcon={(
                    <SvgIcon fontSize="small">
                      <PlusIcon />
                    </SvgIcon>
                  )}
                  variant="contained"
                >
                  Add
              </Button>
              </div> */}
            </Stack>


            <Grid
              // container
              spacing={2}
            >
              <Grid container spacing={2}>

                <Grid item xs={4}>
                  <TextField
                    sx={{ maxWidth: 500 }}
                    fullWidth
                    label="Project One"
                    defaultValue="1"
                    // name="state"
                    required
                    select
                    SelectProps={{
                      native: true,
                    }}
                  >
                    <option
                      key={"CNCF"}
                      value={"CNCF"}
                    >
                      {"CNCF"}
                    </option>
                  </TextField>
                </Grid>

                <Grid item xs={8}>
                  <TextField
                    sx={{ maxWidth: 500 }}
                    fullWidth
                    label="Project Two"
                    // name="state"
                    required
                    select
                    SelectProps={{
                      native: true,
                    }}
                  >
                    <option
                      key={"PYTORCH"}
                      value={"PYTORCH"}
                    >
                      {"PYTORCH"}
                    </option>
                  </TextField>
                </Grid>

              </Grid>
            </Grid>



            {/* 
            <Typography>
              The Cloud Native Interactive Landscape filters and sorts hundreds of projects and products, and shows details including GitHub stars, funding or market cap, first and last commits, contributor counts, headquarters location, and recent tweets.
            </Typography> */}

            <Grid
            // container
            // spacing={1}
            >
              <Grid container>

                {/* <Grid item xs={4}>
                  <Box>
                    <Container>
                      <Overview title={"Overview"} project={data?.project.id}></Overview>
                    </Container>
                  </Box>
                </Grid> */}
                {/* <Grid item xs={4}>
                  <Box>
                    <Container>
                      <Issues title={"Issues"}></Issues>
                    </Container>
                  </Box>
                </Grid> */}
                {/* <Grid item xs={4}>
                  <Box>
                    <Container>
                      <PullRequets title={"Pull Requests"}></PullRequets>
                    </Container>
                  </Box>
                </Grid> */}
                <Grid item xs={8}>
                  <Box>
                    <Container>
                      <ChartsGhaphs></ChartsGhaphs>
                    </Container>
                  </Box>
                </Grid>
                <Grid item xs={1}></Grid>
              </Grid>
            </Grid>
            {/* <Box
              sx={{
                display: 'flex',
                justifyContent: 'center'
              }}
            >
              <Pagination
                count={3}
                size="small"
              />
            </Box> */}
          </Stack>

        </Container>
      </Box>

    </Box>
  )
};

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
