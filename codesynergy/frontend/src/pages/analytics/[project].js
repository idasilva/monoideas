import Head from 'next/head';
import {
  Box,
  Container,
  Stack,
  Typography,
  Unstable_Grid2 as Grid
} from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { Overview } from 'src/sections/projects/project-overview';
import { Charts } from 'src/sections/projects/project-charts';

import { Select } from 'src/sections/projects/project-select';
import { RepoDetails } from 'src/sections/projects/project-description';
import CircularProgress from '@mui/material/CircularProgress';
import LinearProgress from '@mui/material/LinearProgress';




import { OpenSource } from 'src/contexts/context';
import { useContext, useEffect } from "react";

const Page = () => {
  const { data, setData } = useContext(OpenSource);
  console.log("MENSAGEM DO PRIMEIRO COMPONENTE", data)

  console.log("PROJETO SELECIONADO", data?.project)
  console.log("PROJETOS DISPONÍVEIS", data?.projects)


  useEffect(() => {
    if (!data) {
      console.log("data from local storage", window.localStorage.getItem('data'))
      setData(JSON.parse(window.localStorage.getItem('data')));
      // setData(window.localStorage.getItem('data'))
    }
    window.localStorage.setItem('data', JSON.stringify(data));
  }, [data]);


  console.log("MENSAGEM DO PRIMEIRO COMPONENTE22", data?.project.name)
  return (

    <Box>

      <Head>
        <title>
          Code Synergy
        </title>
      </Head>


      {/* {data && */}
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
                  Analytics
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


            {data &&

              <Box>

                {/* <Select selected={data?.project.name} id={data?.project.id} projects={data?.projects} /> */}
                
             
                <Grid
                // container
                // spacing={1}
                >
                  <Grid container spacing={4}>
                    <Grid item xs={8}>
                        <Box>
                          <Container>
                          <Select selected={data?.project.name} id={data?.project.id} projects={data?.projects} />
                          </Container>
                        </Box>
                      </Grid>
                      <Grid item xs={4}></Grid>
                      <Grid item xs={8}>
                        <Box>
                          <Container>
                          <RepoDetails owner={data?.owner} project={data?.project.name}> </RepoDetails>
                          </Container>
                        </Box>
                      </Grid>
                      <Grid item xs={4}>
                      </Grid>
                  </Grid>
                   {/* <Grid container>
                      
                  </Grid> */}
                  <Grid container>

                    <Grid item xs={4}>
                      <Box>
                        <Container>
                          <Overview title={"Overview"} project={data?.project.id}></Overview>
                        </Container>
                      </Box>
                    </Grid>
                
                    <Grid item xs={8}>
                      <Box>
                        <Container>

                          <Charts project={data?.project.id} org={data?.org}></Charts>

                        </Container>
                      </Box>
                    </Grid>
                  
                  </Grid>
                </Grid>
              </Box>

            }

            { !data &&
              <LinearProgress />
            }
           

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
