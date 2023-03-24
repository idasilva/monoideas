import PropTypes from 'prop-types';
import StarIcon from '@mui/icons-material/Star';
import InfoIcon from '@mui/icons-material/Info';
import ForkRightIcon from '@mui/icons-material/ForkRight';
import FolderIcon from '@mui/icons-material/Folder';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import ConstructionIcon from '@mui/icons-material/Construction';
import SmartToyOutlinedIcon from '@mui/icons-material/SmartToyOutlined';
import FolderOpenIcon from '@heroicons/react/24/solid/FolderOpenIcon';

import { Avatar, Box, Button, Card, CardContent, CardActions, Divider, Grid, Stack, SvgIcon, Typography } from '@mui/material';

import { useEffect, useState } from "react";
import ArrowRightIcon from '@heroicons/react/24/solid/ArrowRightIcon';

export const CompanyCard = (props) => {
  const { opensource, handleClickOpen } = props;
  const [projects, setProjects] = useState([]);
  const [totalProjects, setTotalProjects] = useState(0);
  const [stars, setStars] = useState(0);
  const [forks, setForks] = useState(0);
  const [issues, setIssues] = useState(0);
  const [commits, setCommits] = useState(0);
  const [prs, setPrs] = useState(0);
  const [bots, setBots] = useState(0);

  useEffect(() => {
    console.log("USE EFFECT")
    const data = async () => {
      const response = await fetch(`https://o7w9xzmw51.execute-api.us-east-1.amazonaws.com/staging/list/org/data/${opensource.id}`);
      const data = await response.json();
      return data
    };

    data().then((result) => {
      console.log("BACKEND RESULT1", result)
      setStars(result.stars);
      setForks(result.forks);
      setIssues(result.issues)
      setCommits(result.commits)
      setBots(result.bots)
      setPrs(result.prs)
      setTotalProjects(result.projects)

      const projects = async () => {
        const response = await fetch(`https://o7w9xzmw51.execute-api.us-east-1.amazonaws.com/staging/list/org/projects/${opensource.id}`);
        const data = await response.json();
        return data
      };

      projects().then((result) => {
        console.log("BACKEND RESULT2", result)
        setProjects(result.projects)

      });
    });
  }, []);



  console.log("STARS", stars)
  console.log("STARS", forks)
  console.log("BOTS", bots)

  console.log("PROJECTS", projects)
  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }}
    >
      <CardContent>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            pb: 3
          }}
        >
          <Avatar
            src={opensource.logo}
            variant="square"
          />
        </Box>
        <Typography
          align="center"
          gutterBottom
          variant="h6"
        >
          {opensource.title}
        </Typography>
        {/* <Typography
          align="center"
          variant="body2"
        >
          {opensource.description}
        </Typography> */}
      </CardContent>
      <Box sx={{ flexGrow: 1 }} />
      <Divider />
      <Stack
        alignItems="center"
        direction="row"
        display="block"
        justifyContent="left"
        // spacing={2}
        sx={{ p: 2 }}
      >

        <Stack
          alignItems="center"
          direction="row"
          spacing={1}
        >

          <Grid container >
            <Grid item md={12} xs={12}>

              <Grid container spacing={2} >
                <Grid item md={0.9} xs={12}>
                  <SvgIcon
                    color="action"
                    fontSize="medium"
                    display="flex"
                  >
                    <InfoIcon />
                  </SvgIcon>
                </Grid>

                <Grid item md={10.1} xs={12}>
                  <Typography
                    color="text.secondary"
                    display="flex"
                    variant="body2"

                  >
                    Issues
                  </Typography>
                </Grid>

                <Grid item md={1} xs={12}>
                  <Typography
                    color="text.secondary"
                    display="flex"
                    variant="body2"
                  >
                    {issues}
                  </Typography>

                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Stack>
        <Box sx={{ flexGrow: 1 }} />
        <Stack
          alignItems="center"
          direction="row"
          spacing={1}
        >

          <Grid container >
            <Grid item md={12} xs={12}>

              <Grid container spacing={2} >
                <Grid item md={0.9} xs={12}>
                  <SvgIcon
                    color="action"
                    fontSize="medium"
                  >
                    <ForkRightIcon />
                  </SvgIcon>
                </Grid>

                <Grid item md={10.1} xs={12}>
                  <Typography
                    color="text.secondary"
                    display="inline"
                    variant="body2"
                  >
                    Forks
                  </Typography>
                </Grid>

                <Grid item md={1} xs={12}>
                  <Typography
                    color="text.secondary"
                    display="flex"
                    variant="body2"
                  >
                    {forks}
                  </Typography>

                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Stack>
        <Stack
          alignItems="center"
          direction="row"
          spacing={1}
        >

          <Grid container >
            <Grid item md={12} xs={12}>

              <Grid container spacing={2} >
                <Grid item md={0.9} xs={12}>
                  <SvgIcon
                    color="action"
                    fontSize="medium"
                  >
                    <ConstructionIcon />
                  </SvgIcon>
                </Grid>

                <Grid item md={10.1} xs={12}>
                  <Typography
                    color="text.secondary"
                    display="inline"
                    variant="body2"
                  >
                    Pull requests
                  </Typography>
                </Grid>

                <Grid item md={1} xs={12}>
                  <Typography
                    color="text.secondary"
                    display="flex"
                    variant="body2"
                  >
                    {prs}
                  </Typography>

                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Stack>
        <Stack
          alignItems="center"
          direction="row"
          spacing={1}
        >

          <Grid container >
            <Grid item md={12} xs={12}>

              <Grid container spacing={2} >
                <Grid item md={0.9} xs={12}>
                  <SvgIcon
                    color="action"
                    fontSize="medium"
                  >
                    <StarIcon />
                  </SvgIcon>
                </Grid>

                <Grid item md={10.1} xs={12}>
                  <Typography
                    color="text.secondary"
                    display="inline"
                    variant="body2"
                  >
                    Stars
                  </Typography>
                </Grid>

                <Grid item md={1} xs={12}>
                  <Typography
                    color="text.secondary"
                    display="flex"
                    variant="body2"
                  >
                    {stars}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Stack>

        <Stack
          alignItems="center"
          direction="row"
          spacing={1}
        >

          <Grid container >
            <Grid item md={12} xs={12}>
              <Grid container spacing={2} paddingLeft={0.4} >
                <Grid item md={0.8} xs={12}>
                  <SvgIcon
                    color="action"
                    fontSize="medium"
                  >
                    <GroupAddIcon />
                  </SvgIcon>
                </Grid>

                <Grid item md={10.2} xs={12}>
                  <Typography
                    color="text.secondary"
                    display="inline"
                    variant="body2"
                  >
                    Commits
                  </Typography>
                </Grid>

                <Grid item md={1} xs={12}>
                  <Typography
                    color="text.secondary"
                    display="flex"
                    variant="body2"
                  >
                    {commits}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Stack>
        <Stack
          alignItems="center"
          direction="row"
          spacing={1}
        >

          <Grid container >
            <Grid item md={12} xs={12}>
              <Grid container spacing={2}>
                <Grid item md={0.9} xs={12}>
                  <SvgIcon
                    color="action"
                    fontSize="medium"
                  >
                    <SmartToyOutlinedIcon />
                  </SvgIcon>
                </Grid>

                <Grid item md={10.1} xs={12}>
                  <Typography
                    color="text.secondary"
                    display="inline"
                    variant="body2"
                  >
                    Bots
                  </Typography>
                </Grid>

                <Grid item md={1} xs={12}>
                  <Typography
                    color="text.secondary"
                    display="flex"
                    variant="body2"
                  >
                    {bots}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Stack>
        <Stack
          alignItems="center"
          direction="row"
          spacing={1}
        >

          <Grid container >
            <Grid item md={12} xs={12}>

              <Grid container spacing={2} >
                <Grid item md={0.9} xs={12}>
                  <SvgIcon
                    color="action"
                    fontSize="medium"
                  >
                    <FolderOpenIcon />
                  </SvgIcon>
                </Grid>

                <Grid item md={10.1} xs={12}>
                  <Typography
                    color="text.secondary"
                    display="inline"
                    variant="body2"
                  >
                    Projects
                  </Typography>
                </Grid>

                <Grid item md={1} xs={12}>
                  <Typography
                    color="text.secondary"
                    display="flex"
                    variant="body2"
                  >
                    {totalProjects}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Stack>
        <Divider />

        <Box sx={{ flexGrow: 1 }} />

        <Stack
          alignItems="center"
          direction="row"
          display="block"
          size="small"
          justifyContent="left"
        // sx={{ p: 1 }}
        >
          <Box
            sx={{
              mb: 2,
              display: "flex",
              flexDirection: "column",
              height: 280,
              overflow: "hidden",
              overflowY: "scroll",
              // justifyContent="flex-end" # DO NOT USE THIS WITH 'scroll'
            }}
          >
            {projects?.slice(0, 7).map((opsource, index) => (
              <Stack
                key={index}
                component={Box}
                alignItems="center"
                direction="row"
                spacing={1}
                // paddingLeft={1} ///espaço do icone dos projetos
                sx={{
                  '&:hover': {
                    // backgroundColor: 'primary.main',
                    opacity: [0.8, 0.8, 0.7],
                  },
                }}
              >
                <SvgIcon
                  color="action"
                  fontSize="medium"

                >
                  <FolderIcon />
                </SvgIcon>
                <Typography
                  component={Button}
                  onClick={() => {
                    handleClickOpen(
                      {
                        "project": opsource,
                        "projects": projects,
                        "org": opensource.id,
                        "owner": opensource.owner,
                      })
                  }}
                  color="text.secondary"
                  display="flex"
                  variant="body2"
                >
                  {opsource.name}
                </Typography>
              </Stack>
            ))}
          </Box>
        </Stack>

        <Divider />

        <Card>
          <CardActions sx={{ justifyContent: 'flex-end' }}>
            <Button
              onClick={() => {
                handleClickOpen({
                  "project": projects?.pop(),
                  "projects": projects,
                  "org": opensource.id,
                  "owner": opensource.owner,
                })
              }}
              color="inherit"
              endIcon={(
                <SvgIcon fontSize="small">
                  <ArrowRightIcon />
                </SvgIcon>
              )}
              size="small"
            >
              More Projects
            </Button>
          </CardActions>
        </Card>
      </Stack>
    </Card>
  );
};

CompanyCard.propTypes = {
  opensource: PropTypes.object.isRequired,
  handleClickOpen: PropTypes.func.isRequired
};
