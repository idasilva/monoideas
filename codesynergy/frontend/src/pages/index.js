import Head from 'next/head';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import {
  Box,
  Button,
  Container,
  Pagination,
  Stack,
  SvgIcon,
  Typography,
  Unstable_Grid2 as Grid
} from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { CompanyCard } from 'src/sections/projects/project-card';
import { CompaniesSearch } from 'src/sections/projects/project-search';

import { useRouter } from 'next/navigation';
import { useContext } from "react";
import { OpenSource } from 'src/contexts/context';

const openSourcesOrgs = [
  {
    id: '13455738.0',
    logo: '/assets/logos/cncf.png',
    title: 'Cloud Native Computing Foundation (CNCF)',
    owner: 'cncf'
  },
  {
    id: '21003710.0',
    logo: '/assets/logos/pytorch.png',
    title: 'pytorch',
    owner: 'pytorch'
  }
];

const Page = () => {
  // const [open, setOpen] = useState(false);
  const router = useRouter();
  const {setData } = useContext(OpenSource);

  const handleClickOpen = (props) => {
    const { project, projects, org, owner } = props;
    console.log("PROJECT NAMEEEEE", project)
    console.log("PROJECTS NAMEEEEES", projects)

    const data =  {
      project: project,
      projects: projects,
      org: org,
      owner: owner
    }
    setData(data)

    window.localStorage.setItem('data', JSON.stringify(data));
    
    router.push({
      pathname: '/analytics/[project]',
      query: { project: project.name }
    });
  };


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
                  Projects
              </Typography>
              </Stack>
              <div>
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
              </div>
            </Stack>
            <CompaniesSearch title={"Search Organizations"} />

            <Grid
              container
              spacing={3}
            >
              {openSourcesOrgs.map((opensource) => (
                <Grid
                  xs={12}
                  md={6}
                  lg={4}
                  key={opensource.id}
                >
                  <CompanyCard opensource={opensource} handleClickOpen={handleClickOpen} />
                </Grid>
              ))}
            </Grid>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center'
              }}
            >
              <Pagination
                count={3}
                size="small"
              />
            </Box>
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
